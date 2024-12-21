/*
  # Update Schema for Whiteboard Application

  1. New Tables
    - `profiles`
      - User profile information
      - Linked to auth.users
    - `teams`
      - Team management
    - `team_members`
      - Team membership and roles
    - `projects`
      - Project organization
    - `templates`
      - Reusable board templates
    - `recent_boards`
      - Track recently accessed boards
    - `subscriptions`
      - User subscription management
    - `settings`
      - User preferences and settings

  2. Changes
    - Update boards table structure
    - Add necessary foreign key relationships
    - Add indexes for performance

  3. Security
    - Enable RLS on all tables
    - Add appropriate access policies
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name text,
    avatar_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    team_id bigint REFERENCES teams(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    role text CHECK (role IN ('owner', 'admin', 'member')) DEFAULT 'member',
    joined_at timestamptz DEFAULT now(),
    UNIQUE(team_id, user_id)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    team_id bigint REFERENCES teams(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    title text NOT NULL,
    content jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create recent_boards table
CREATE TABLE IF NOT EXISTS recent_boards (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    board_id bigint REFERENCES boards(id) ON DELETE CASCADE,
    accessed_at timestamptz DEFAULT now(),
    UNIQUE(user_id, board_id)
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    plan text CHECK (plan IN ('free', 'pro', 'team')) DEFAULT 'free',
    start_date timestamptz NOT NULL,
    end_date timestamptz,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id)
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    key text NOT NULL,
    value text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id, key)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE recent_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Profiles
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Teams
CREATE POLICY "Team members can view their teams"
    ON teams FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM team_members
            WHERE team_members.team_id = teams.id
            AND team_members.user_id = auth.uid()
        )
    );

-- Team Members
CREATE POLICY "Team members can view team membership"
    ON team_members FOR SELECT
    TO authenticated
    USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM team_members tm
            WHERE tm.team_id = team_members.team_id
            AND tm.user_id = auth.uid()
        )
    );

-- Projects
CREATE POLICY "Team members can view projects"
    ON projects FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM team_members
            WHERE team_members.team_id = projects.team_id
            AND team_members.user_id = auth.uid()
        )
    );

-- Templates
CREATE POLICY "Users can view public templates"
    ON templates FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can manage their own templates"
    ON templates FOR ALL
    TO authenticated
    USING (owner_id = auth.uid())
    WITH CHECK (owner_id = auth.uid());

-- Recent Boards
CREATE POLICY "Users can manage their recent boards"
    ON recent_boards FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Subscriptions
CREATE POLICY "Users can view their own subscription"
    ON subscriptions FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Settings
CREATE POLICY "Users can manage their own settings"
    ON settings FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_team_id ON projects(team_id);
CREATE INDEX IF NOT EXISTS idx_recent_boards_user_id ON recent_boards(user_id);
CREATE INDEX IF NOT EXISTS idx_recent_boards_board_id ON recent_boards(board_id);
CREATE INDEX IF NOT EXISTS idx_settings_user_key ON settings(user_id, key);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
    BEFORE UPDATE ON teams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at
    BEFORE UPDATE ON templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();