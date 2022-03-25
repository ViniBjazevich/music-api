const createProjectsTable = `CREATE TABLE projects (
    id serial PRIMARY KEY,
    name VARCHAR ( 150 ),
    first_week_sales INT,
    riaa NUMERIC,
    release_date INT,
    streams INT,
    genre VARCHAR ( 50 ),
    artist VARCHAR ( 100 ),
    project_type VARCHAR ( 100 )
)`;

const insertProjects = `INSERT INTO projects (name, first_week_sales, riaa, release_date, streams, genre, artist, project_type)
    VALUES ('Boss', 1000000, 2, 2022, 12312312, 'Rap', 'Vini', 'Studio Album');`;

const selectProjects = `SELECT * FROM projects`;

const deleteProjects = `DELETE FROM projects WHERE artist = 'Vini';`;

const dropBlogsTable = `DROP TABLE IF EXISTS blogs`;

const createBlogsTable = `CREATE TABLE blogs (
	id serial PRIMARY KEY,
	body1 VARCHAR (7500) UNIQUE NOT NULL,
    body2 VARCHAR (7500) UNIQUE NOT NULL,
	date DATE NOT NULL DEFAULT CURRENT_DATE
)`;

module.exports = {
  createProjectsTable,
  insertProjects,
  selectProjects,
  deleteProjects,
  dropBlogsTable,
  createBlogsTable,
};
