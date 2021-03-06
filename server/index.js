const express = require("express");
const app = express();
const cors = require("cors");
const { response } = require("express");
const port = 8080;

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

const { addBlog, getAllBlogs, getBlogSections, deleteBlog } = require("./blog");

// --------------------------  Projects Routes --------------------------

app.get("/allProjects", getAllProjects);

app.get("/projectByGenre/:genre", getProjectsByGenre);

app.get("/allArtistsInGenre/:genre", getAllArtistsInGenre);

app.get("/artistInfo/:artist", getProjectsByArtist);

app.get("/searchProjects/:name/:artist", searchProjectsByNameAndArtist);

app.post("/projects", insertProject);

app.put("/projects/:id", updateProject);

app.delete("/projects/:id", deleteProject);

// --------------------------  Blog Routes --------------------------

app.get("/blog", getAllBlogs);

app.post("/blog", addBlog);

app.delete("/blog/:id", deleteBlog);

app.get("/blogSections/:id", getBlogSections);

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
