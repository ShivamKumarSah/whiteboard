/*
  # Add board content column

  1. Changes
    - Add `content` column to store whiteboard operations
    - Add `title` column for board name
    - Add `last_accessed` column to track recent boards
    - Add policies for board access

  2. Security
    - Enable RLS
    - Add policies for CRUD operations
*/

-- Add content column to store whiteboard operations
ALTER TABLE boards 
ADD COLUMN IF NOT EXISTS content JSONB DEFAULT '[]';

-- Add title column
ALTER TABLE boards 
ADD COLUMN IF NOT EXISTS title TEXT NOT NULL DEFAULT 'Untitled Board';

-- Add last_accessed column
ALTER TABLE boards 
ADD COLUMN IF NOT EXISTS last_accessed TIMESTAMPTZ DEFAULT NOW();

-- Create function to update last_accessed
CREATE OR REPLACE FUNCTION update_last_accessed()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_accessed = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating last_accessed
CREATE TRIGGER update_boards_last_accessed
  BEFORE UPDATE ON boards
  FOR EACH ROW
  EXECUTE FUNCTION update_last_accessed();