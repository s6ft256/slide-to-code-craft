-- Fix RLS for public.users so profile rows can be created correctly.
--
-- The user profile row is normally created by the `handle_new_user` trigger
-- (SECURITY DEFINER, runs as the table owner and bypasses RLS). Previously the
-- only INSERT policy granted access to `service_role`, which the frontend
-- (anon key) can never hold. Any direct client insert into `users` therefore
-- failed with 401 "permission denied" (and a 400 from PostgREST).
--
-- Add a policy letting an authenticated user insert (or select) their own
-- profile row. This is a safe, least-privilege policy and makes a client-side
-- fallback insert functional if one is ever re-introduced.

-- Allow authenticated users to insert their own profile row
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = auth_id);
