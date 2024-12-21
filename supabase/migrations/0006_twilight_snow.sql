/*
  # Fix Board Schema

  1. Changes
    - Add name column to profiles table
    - Add thumbnail column to boards table if not exists
    - Add last_accessed column to boards table
  
  2. Security
    - No changes to RLS policies
*/

-- Add name column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS name text;

-- Add thumbnail and last_accessed to boards if they don't exist
ALTER TABLE boards ADD COLUMN IF NOT EXISTS thumbnail text;
ALTER TABLE boards ADD COLUMN IF NOT EXISTS last_accessed timestamptz DEFAULT now();

-- Create function to update last_accessed
CREATE OR REPLACE FUNCTION update_last_accessed()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_accessed = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating last_accessed
DROP TRIGGER IF EXISTS update_boards_last_accessed ON boards;
CREATE TRIGGER update_boards_last_accessed
  BEFORE UPDATE ON boards
  FOR EACH ROW
  EXECUTE FUNCTION update_last_accessed();