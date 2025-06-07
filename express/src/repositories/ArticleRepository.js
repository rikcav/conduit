const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  findAllArticles: async () => {
    return await prisma.article.findMany();
  },

  createArticle: async (data) => {
    const article = await prisma.article.create({
      data,
    });

    return article;
  },

  findArticleBySlug: async (slug) => {
    return await prisma.article.findUnique({
      where: { slug },
    });
  },

  updateArticle: async (slug, data) => {
    return await prisma.article.update({
      where: { slug },
      data,
    });
  },

  deleteArticle: async (slug) => {
    return await prisma.article.delete({
      where: { slug },
    });
  },
};
