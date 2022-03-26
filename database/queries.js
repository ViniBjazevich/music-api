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

const insertProject = `INSERT INTO projects (name, first_week_sales, riaa, release_date, streams, genre, artist, project_type)
    VALUES ('Boss', 1000000, 2, 2022, 12312312, 'Rap', 'Vini', 'Studio Album');`;

const selectProjects = `SELECT * FROM projects`;

const deleteProjects = `DELETE FROM projects WHERE artist = 'Vini';`;

const dropBlogsTable = `DROP TABLE IF EXISTS blogs`;

const createBlogsTable = `CREATE TABLE blogs (
	id serial PRIMARY KEY,
    title VARCHAR (200) UNIQUE NOT NULL,
	date DATE NOT NULL DEFAULT CURRENT_DATE,
    image VARCHAR (300),
    description VARCHAR (400)
)`;

const insertBlog = `INSERT INTO blogs (title, date, image, description)
    VALUES ('Fourth Blog Post', '1997-07-23', 'image url goes here', 'A great read!')
    RETURNING id;`;

const selectBlogs = "SELECT * FROM blogs";

const dropBlogSectionsTable = `DROP TABLE IF EXISTS blog_sections`;

const createBlogSectionsTable = `CREATE TABLE blog_sections (
    id serial PRIMARY KEY,
    info VARCHAR (4000) NOT NULL,
    position INT NOT NULL,
    blog_id INT references blogs(id)
)`;

const insertBlogSection = `INSERT INTO blog_sections (info, position, blog_id)
    VALUES ('A bunch of text goes here', 1, BLOG_ID_GOES_HERE);`;

const selectBlogSections = "SELECT * FROM blog_sections";

const joinBlogAndBlogSections = `SELECT * FROM blogs
    JOIN blog_sections ON blog_sections.blog_id = blogs.id
    WHERE blogs.id = 747723237004083201;
`;

module.exports = {
  createProjectsTable,
  insertProject,
  selectProjects,
  deleteProjects,
  createBlogsTable,
  insertBlog,
  selectBlogs,
  dropBlogsTable,
  createBlogSectionsTable,
  insertBlogSection,
  selectBlogSections,
  joinBlogAndBlogSections,
  dropBlogSectionsTable,
};

// const AlmasData = {
//     blog: {
//         title: 'Blog title'
//         date: '1997-07-30',
//         img: 'urlToImage',
//         description: 'something'
//     },
//     sections: [
//         '<div>First paragraph HTML</div>',
//         'Eminem',
//         '<div>Second paragraph HTML</div>',
//         '<div>Third paragraph HTML</div>',
//     ]
// }