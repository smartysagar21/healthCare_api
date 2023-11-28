import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
} from "../controllers/blog-controllers";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
