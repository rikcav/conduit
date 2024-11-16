const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createArticle: async (data) => {
    const article = await prisma.article.create({
      data,
    });

    return article;
  },

  findAll: async () => {
    const articles = await prisma.article.findMany();
    return articles;
  },

  findBySlug: async (slug) => {
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    return article;
  },

  updateArticle: async (id, data) => {
    const article = await prisma.article.update({
      where: { id },
      data,
    });

    return article;
  },

  deleteArticle: async (slug) => {
    const article = await prisma.article.delete({
      where: { slug },
    });

    return article;
  },
};
