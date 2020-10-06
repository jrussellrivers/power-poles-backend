create table inspections(
    id VARCHAR UNIQUE not NULL,
    code VARCHAR UNIQUE not NULL,
    name VARCHAR not Null
);

create table users(
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE not null,
    password VARCHAR not null,
    inspection_id VARCHAR references inspections (id),
    admin boolean default false
);

create table s3_photos(
    photo_id VARCHAR not NULL,
    file_name VARCHAR not NULL,
    record_id VARCHAR references inspections (id),
    form_id VARCHAR references inspections (code)
);

insert into inspections (id, code, name)
values
    ('11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c','Test Inspection');

insert into s3_photos (photo_id, file_name, record_id, form_id)
VALUES  
    ('27a34663-0d05-4bae-9266-c0ebd6b156b21','23816','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c'),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b22','23816_2','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c'),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b23','23816','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c'),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b24','23816_2','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c'),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b25','23816','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c'),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b26','23816_2','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c'),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b27','23816','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c'),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b28','23816_2','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c'),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b29','23816','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c'),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b20','23816_2','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c');