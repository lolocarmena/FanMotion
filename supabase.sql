-- Ejecutar completo en Supabase > SQL Editor
create table if not exists admins(email text primary key);
create table if not exists projects(id uuid primary key default gen_random_uuid(), title text not null, type text not null check (type in ('video','image')), url text not null, path text, poster text, created_at timestamptz default now());
create table if not exists orders(id uuid primary key default gen_random_uuid(), empresa text not null check (char_length(empresa)<=120), tel text not null check (char_length(tel)<=40), mail text not null check (char_length(mail)<=120), descr text not null check (char_length(descr)<=1500), files text[] default '{}', created_at timestamptz default now());

create or replace function is_admin() returns boolean language sql security definer stable set search_path=public as
$$ select exists(select 1 from admins where lower(email)=lower(auth.jwt()->>'email')) $$;

alter table admins enable row level security;
alter table projects enable row level security;
alter table orders enable row level security;

create policy "ver proyectos" on projects for select using (true);
create policy "admin gestiona proyectos" on projects for all using (is_admin()) with check (is_admin());
create policy "cualquiera envia pedido" on orders for insert to anon, authenticated with check (true);
create policy "admin ve pedidos" on orders for select using (is_admin());
create policy "admin borra pedidos" on orders for delete using (is_admin());

insert into storage.buckets(id,name,public) values ('media','media',true) on conflict do nothing;
insert into storage.buckets(id,name,public) values ('logos','logos',false) on conflict do nothing;
create policy "admin sube media" on storage.objects for insert with check (bucket_id='media' and is_admin());
create policy "admin borra media" on storage.objects for delete using (bucket_id='media' and is_admin());
create policy "cualquiera sube logos" on storage.objects for insert to anon, authenticated with check (bucket_id='logos');
create policy "admin lee logos" on storage.objects for select using (bucket_id='logos' and is_admin());
create policy "admin borra logos" on storage.objects for delete using (bucket_id='logos' and is_admin());

-- IMPORTANTE: reemplazá por TU correo (el mismo con el que te vas a registrar en la web)
insert into admins(email) values ('TU_CORREO@gmail.com') on conflict do nothing;


-- SI YA HABÍAS EJECUTADO EL SQL ANTERIOR, corré también esta línea (miniaturas de video para que carguen al instante):
alter table projects add column if not exists poster text;
