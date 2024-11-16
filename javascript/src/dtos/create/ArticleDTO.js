class ArticleDTO {
  constructor(article) {
    this.title = article.title;
    this.description = article.description;
    this.body = article.body;
    this.tagList = article.tagList;
  }

  static validate(data) {
    const errors = [];

    if (typeof data.title !== "string") {
      errors.push({ field: "title", error: "Title must be a string" });
    }

    if (typeof data.description !== "string") {
      errors.push({
        field: "description",
        error: "Description must be a string",
      });
    }

    if (typeof data.body !== "string") {
      errors.push({ field: "body", error: "Body must be a string" });
    }

    if (!Array.isArray(data.tagList)) {
      errors.push({ field: "tagList", error: "TagList must be an array" });
    } else if (!data.tagList.every((tag) => typeof tag === "string")) {
      errors.push({
        field: "tagList",
        error: "All elements in TagList must be strings",
      });
    }

    return errors;
  }
}

module.exports = ArticleDTO;
