create table inspections(
    id VARCHAR UNIQUE not NULL,
    code VARCHAR not NULL,
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
    form_id VARCHAR,
    exif_gps_latitude VARCHAR,
    exif_gps_longitude VARCHAR
);

insert into inspections (id, code, name)
values
    ('11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c','Test Inspection');

insert into s3_photos (photo_id, file_name, record_id, form_id, exif_gps_latitude, exif_gps_longitude)
VALUES  
    ('27a34663-0d05-4bae-9266-c0ebd6b156b21','23816','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c', 33.8488, -84.3734),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b22','23816_2','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c', 33.8488, -84.3734),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b23','23816','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c', 33.8488, -84.3734),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b24','23816_2','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c', 33.8488, -84.3734),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b25','23816','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c', 33.8488, -84.3734),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b26','23816_2','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c', 33.8488, -84.3734),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b27','23816','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c',33.8488, -84.3734),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b28','23816_2','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c', 33.8488, -84.3734),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b29','23816','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c', 33.8488, -84.3734),
    ('27a34663-0d05-4bae-9266-c0ebd6b156b20','23816_2','11027820-dc4a-4859-82a1-4bbb51e9af49','1f1b01eb-1c64-4591-a8ef-0751b688551c', 33.8488, -84.3734);

insert into users (username, password, inspection_id, admin)
VALUES 
('priyanka', '$2b$10$U77zhbX4NMIYvOiGBkqznO28QBNExQb5fJsm7Nb5jD4aS/MKYLO/m', '11027820-dc4a-4859-82a1-4bbb51e9af49', true),
('jordan', '$2b$10$otbRZbCVsVoVjsluKkZxuOyLIYBRbYHPFe4/yOJbPAf6c4WexcExi', '11027820-dc4a-4859-82a1-4bbb51e9af49', false);