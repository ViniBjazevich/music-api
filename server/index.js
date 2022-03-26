const express = require("express");
const app = express();
const cors = require("cors");
const { response } = require("express");
const port = 5002;

app.use(cors());
app.use(express.json());

const {
  getAllProjects,
  getProjectsByArtist,
  getProjectsByGenre,
  getAllArtistsInGenre,
  searchProjectsByNameAndArtist,
  insertProject,
  updateProject,
  deleteProject,
} = require("./project");
const { addBlog, getAllBlogs, getBlogSections } = require("./blog");

// --------------------------  Projects Routes --------------------------

app.get("/allProjects", getAllProjects);

app.get("/projectByGenre/:genre", getProjectsByGenre);

app.get("/allArtistsInGenre/:genre", getAllArtistsInGenre);

app.get("/projectsByArtist/:artist", getProjectsByArtist);

app.get("/searchProjects/:name/:artist", searchProjectsByNameAndArtist);

app.post("/", insertProject);

app.put("/:id", updateProject);

app.delete("/:id", deleteProject);

// --------------------------  Blog Routes --------------------------

app.get("/blog", getAllBlogs);

app.post("/blog", addBlog);

app.get("/blogSections/:id", getBlogSections);

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
