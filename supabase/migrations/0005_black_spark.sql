/*
  # Add Missing Columns

  1. Changes
    - Add `thumbnail` column to boards table
    - Add `display_name` column to profiles table
  
  2. Security
    - No changes to RLS policies
*/

-- Add thumbnail column to boards table
ALTER TABLE boards ADD COLUMN IF NOT EXISTS thumbnail text;

-- Add display_name column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS display_name text;