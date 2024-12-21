/*
  # Fix database schema issues
  
  1. Changes
    - Add display_name to profiles
    - Update boards table structure
    - Fix recent_boards references
*/

-- Update profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS name text;

-- Update boards table
ALTER TABLE boards DROP COLUMN IF EXISTS is_template;
ALTER TABLE boards DROP COLUMN IF EXISTS is_public;
ALTER TABLE boards ALTER COLUMN id SET DATA TYPE uuid USING gen_random_uuid();
ALTER TABLE boards ALTER COLUMN owner_id SET NOT NULL;

-- Fix recent_boards references
ALTER TABLE recent_boards DROP CONSTRAINT IF EXISTS recent_boards_board_id_fkey;
ALTER TABLE recent_boards ALTER COLUMN board_id SET DATA TYPE uuid;
ALTER TABLE recent_boards ADD CONSTRAINT recent_boards_board_id_fkey 
  FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE;