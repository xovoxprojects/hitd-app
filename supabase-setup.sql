-- Supabase SQL Editor Setup Script for HITD

-- 1. Create the `creatives` bucket (skip if it already exists)
insert into storage.buckets (id, name, public)
values ('creatives', 'creatives', true)
on conflict (id) do update set public = true;

-- 2. Allow Public Read Access (Anyone can see the images)
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'creatives' );

-- 3. Allow Public Insert Access
-- (Since we use NextAuth instead of Supabase Auth, client-side uploads are treated as anonymous.
-- Security checks for credits are enforced on the backend side of the Next.js API before processing).
create policy "Public Insert"
  on storage.objects for insert
  with check ( bucket_id = 'creatives' );

-- 4. Set the default plan for new users in the `User` table to `none` instead of `null`
-- This ensures the lock screen works immediately for new Google Logins
alter table "User" alter column "plan" set default 'none';
alter table "User" alter column "credits" set default 0;
