create database week6Db;
use week6Db;

-- Create journalists table
create table journalists (
    id int auto_increment primary key,
    name varchar(100),
    email varchar(100),
    bio text
);

-- Update articles table: remove journalist column, add journalist_id as foreign key
drop table if exists articles;
create table articles (
    id int auto_increment primary key,
    title varchar(255),
    content text,
    category varchar(50),
    journalist_id int,
    foreign key (journalist_id) references journalists(id)
);
