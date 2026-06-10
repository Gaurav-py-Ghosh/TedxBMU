create table if not exists public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  rating integer not null check (rating between 1 and 5),
  feedback text not null,
  recipient_name text not null,
  recipient_role text not null,
  match_type text not null check (match_type in ('email', 'name')),
  certificate_file text not null,
  certificate_sent boolean not null default false,
  certificate_email_id text,
  created_at timestamptz not null default now()
);

create index if not exists feedback_submissions_email_idx
  on public.feedback_submissions (lower(email));

create index if not exists feedback_submissions_created_at_idx
  on public.feedback_submissions (created_at desc);

insert into storage.buckets (id, name, public)
values ('certificates', 'certificates', false)
on conflict (id) do nothing;
