const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  findAllArticles: async () => {
    return await prisma.article.findMany({
      include: {
        tagList: true,
      },
    });
  },

  createArticle: async ({ tagList, ...articleData }) => {
    return await prisma.article.create({
      data: {
        ...articleData,
        tagList: {
          connectOrCreate: tagList.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        tagList: true,
      },
    });
  },

  findArticleBySlug: async (slug) => {
    return await prisma.article.findUnique({
      where: { slug },
      include: {
        tagList: true,
      },
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
