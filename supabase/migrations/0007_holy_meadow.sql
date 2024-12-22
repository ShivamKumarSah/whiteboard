/*
  # Fix Missing Columns

  1. Changes
    - Add missing 'name' column to profiles table
    - Add missing 'thumbnail' column to boards table
    - Add missing 'owner_id' column to boards table
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add missing columns to profiles table if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN name text;
  END IF;
END $$;

-- Add missing columns to boards table if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'boards' AND column_name = 'thumbnail'
  ) THEN
    ALTER TABLE boards ADD COLUMN thumbnail text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'boards' AND column_name = 'owner_id'
  ) THEN
    ALTER TABLE boards ADD COLUMN owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL DEFAULT auth.uid();
  END IF;
END $$;