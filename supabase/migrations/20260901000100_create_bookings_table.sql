create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  booking_date date not null,
  booking_time time not null,
  service text not null,
  barber text not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  notes text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed'))
);

create index if not exists bookings_date_time_idx
  on public.bookings (booking_date, booking_time);

create index if not exists bookings_status_idx
  on public.bookings (status);

alter table public.bookings enable row level security;

drop policy if exists "bookings_insert_public" on public.bookings;
create policy "bookings_insert_public"
on public.bookings
for insert
to anon, authenticated
with check (true);

drop policy if exists "bookings_select_authenticated" on public.bookings;
create policy "bookings_select_authenticated"
on public.bookings
for select
to authenticated
using (true);

drop policy if exists "bookings_update_authenticated" on public.bookings;
create policy "bookings_update_authenticated"
on public.bookings
for update
to authenticated
using (true)
with check (true);
