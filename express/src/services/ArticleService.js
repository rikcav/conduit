const articleRepository = require("../repositories/ArticleRepository");
const userRepository = require("../repositories/UserRepository");

module.exports = {
  createArticle: async (data, userId) => {
    try {
      return await articleRepository.createArticle({
        slug: titleToSlug(data.title),
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList,
        authorId: userId,
      });
    } catch (error) {
      if (error.code === "P2002") {
        const duplicateField = error.meta.target[0];
        throw new Error(
          `Duplicate ${duplicateField}: This ${duplicateField} is already taken.`
        );
      }

      throw error;
    }
  },

  findAll: async () => {
    try {
      return await articleRepository.findAll();
    } catch (error) {
      throw error;
    }
  },

  feedArticles: async (userId, limit, offset) => {
    try {
      return await articleRepository.getFeed(userId, limit, offset);
    } catch (error) {
      throw error;
    }
  },

  findBySlug: async (slug) => {
    try {
      return await articleRepository.findBySlug(slug);
    } catch (error) {
      throw error;
    }
  },

  updateArticle: async (slug, data, userId) => {
    try {
      return await articleRepository.updateArticle(slug, {
        slug: titleToSlug(data.title),
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList,
        authorId: userId,
      });
    } catch (error) {
      throw error;
    }
  },

  deleteArticle: async (slug, userId) => {
    const article = await articleRepository.findBySlug(slug);

    if (!article) {
      throw new Error("Article not found");
    }

    // Check if the current user is the author of the article
    if (article.authorId !== userId) {
      throw new Error("Unauthorized");
    }

    // Delete the article
    return await articleRepository.deleteArticle(slug);
  },
};

const titleToSlug = (title) => {
  if (title === null || title === undefined) {
    return "";
  }

  const normalized = title.normalize("NFD");

  return normalized
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
};
