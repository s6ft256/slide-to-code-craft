-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table to store additional user profile data
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  position VARCHAR(255),
  phone VARCHAR(50),
  location VARCHAR(255),
  selected_project VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on auth_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON public.users(auth_id);

-- Create index on selected_project for filtering
CREATE INDEX IF NOT EXISTS idx_users_selected_project ON public.users(selected_project);

-- Add comment to table
COMMENT ON TABLE public.users IS 'User profile data linked to Supabase auth users';

-- Add comments to columns
COMMENT ON COLUMN public.users.id IS 'Unique identifier for the user profile';
COMMENT ON COLUMN public.users.auth_id IS 'Reference to Supabase auth user ID';
COMMENT ON COLUMN public.users.name IS 'Full name of the user';
COMMENT ON COLUMN public.users.company IS 'Company name the user belongs to';
COMMENT ON COLUMN public.users.position IS 'Job position/title of the user';
COMMENT ON COLUMN public.users.phone IS 'Phone number of the user';
COMMENT ON COLUMN public.users.location IS 'Location/address of the user';
COMMENT ON COLUMN public.users.selected_project IS 'Currently selected project code';
COMMENT ON COLUMN public.users.created_at IS 'Timestamp when the user profile was created';
COMMENT ON COLUMN public.users.updated_at IS 'Timestamp when the user profile was last updated';

-- Create a function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert user profile with RLS bypass using SECURITY DEFINER
  INSERT INTO public.users (auth_id, name, company, position, phone, location, selected_project)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'company', ''),
    COALESCE(NEW.raw_user_meta_data->>'position', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'location', ''),
    COALESCE(NEW.raw_user_meta_data->>'selected_project', 'TG000')
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- If profile already exists, just return without error
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on user profile changes
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
-- Allow users to read their own profile
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = auth_id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = auth_id);

-- Allow service role to insert new user profile
CREATE POLICY "Service role can insert profiles"
  ON public.users FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Allow service role to read all profiles
CREATE POLICY "Service role can view all profiles"
  ON public.users FOR SELECT
  USING (auth.role() = 'service_role');
