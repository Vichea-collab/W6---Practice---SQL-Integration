import { Router } from "express";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleWithJournalist,
  getArticlesByJournalist
} from "../controllers/articleController.js";

const articleRouter = Router();
articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getArticleWithJournalist); // update to use new controller
articleRouter.post("/", createArticle);
articleRouter.put("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);

// New route for journalist's articles
articleRouter.get("/journalists/:id/articles", getArticlesByJournalist);

export default articleRouter;
