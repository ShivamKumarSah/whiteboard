/*
  # Initial Schema Setup for Whiteboard Application

  1. New Tables
    - `boards`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (jsonb) - Stores board data
      - `thumbnail` (text) - URL to board thumbnail
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `owner_id` (uuid) - References auth.users
      - `is_template` (boolean)
      - `is_public` (boolean)
      - `last_accessed` (timestamptz)

    - `board_collaborators`
      - `board_id` (uuid) - References boards
      - `user_id` (uuid) - References auth.users
      - `role` (text) - Collaborator role (viewer/editor)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for board access and collaboration
*/

-- Create boards table
CREATE TABLE IF NOT EXISTS boards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content jsonb DEFAULT '{}',
  thumbnail text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_template boolean DEFAULT false,
  is_public boolean DEFAULT false,
  last_accessed timestamptz DEFAULT now()
);

-- Create board_collaborators table
CREATE TABLE IF NOT EXISTS board_collaborators (
  board_id uuid REFERENCES boards(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text CHECK (role IN ('viewer', 'editor')) DEFAULT 'viewer',
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (board_id, user_id)
);

-- Enable RLS
ALTER TABLE boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_collaborators ENABLE ROW LEVEL SECURITY;

-- Policies for boards table
CREATE POLICY "Users can create boards"
  ON boards
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can view their own boards"
  ON boards
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = owner_id OR
    is_public = true OR
    EXISTS (
      SELECT 1 FROM board_collaborators
      WHERE board_id = boards.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own boards"
  ON boards
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own boards"
  ON boards
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Policies for board_collaborators table
CREATE POLICY "Board owners can manage collaborators"
  ON board_collaborators
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM boards
      WHERE id = board_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Collaborators can view their collaborations"
  ON board_collaborators
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating updated_at
CREATE TRIGGER update_boards_updated_at
  BEFORE UPDATE ON boards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();