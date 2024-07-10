const express = require("express");
const mongoose = require("mongoose");
const articlesRouter = require("./routes/articles");
const app = express();
const Article = require("./models/article");
const methodOverride = require("method-override");

mongoose.connect(
  "mongodb+srv://gaelvanbeveren98:Unkut59210@myfirstdatabase.otymanr.mongodb.net/blog"
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index.ejs", { articles: articles });
});
app.use("/articles", articlesRouter);
app.listen(3000);
