-- Run this SQL in your Supabase SQL Editor to fix user signup RLS issues
-- This updates the trigger function to handle errors properly

-- Update the trigger function to handle RLS bypass and errors
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

-- Remove any user insert policies since we rely on the trigger
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert profile during signup" ON public.users;

-- Verify the trigger function is working
SELECT 
  proname as function_name,
  prosecdef as security_definer,
  prosrc as function_body
FROM pg_proc
WHERE proname = 'handle_new_user';
