-- This file is just here to help keep track of the database schema and for a quick reference to postgres syntax
DROP TABLE IF EXISTS project;

CREATE TABLE project
(
    id serial PRIMARY KEY,
    name VARCHAR ( 150 ),
    first_week_sales INT,
    riaa INT,
    release_date INT,
    streams INT,
    genre VARCHAR ( 50 ),
    artist VARCHAR ( 100 ),
    project_type VARCHAR ( 100 )
)

Select * from project;