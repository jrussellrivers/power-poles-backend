create table users(
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE not null,
    password VARCHAR not null,
    inspection_id VARCHAR references inspections (id),
    admin boolean default false
)

create table inspections(
    id VARCHAR not NULL,
    code VARCHAR not NULL,
    name VARCHAR not Null
)

create table photos(
    photo_id VARCHAR not NULL,
    file_name VARCHAR not NULL,
    record_id VARCHAR references inspections (id),
    form_id VARCHAR not NULL
)