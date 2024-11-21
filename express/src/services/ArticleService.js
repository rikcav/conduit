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

  findBySlug: async (slug) => {
    try {
      return await articleRepository.findBySlug(slug);
    } catch (error) {
      throw error;
    }
  },

  updateArticle: async (id, data, userId) => {
    try {
      return await articleRepository.updateArticle(id, {
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

  deleteArticle: async (id) => {
    try {
      return await articleRepository.deleteArticle(id);
    } catch (error) {
      throw error;
    }
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
