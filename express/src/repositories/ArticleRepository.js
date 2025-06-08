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
    const { tagList, ...articleData } = data;

    return await prisma.article.update({
      where: { slug },
      data: {
        ...articleData,
        ...(tagList && {
          tagList: {
            set: [],
            connectOrCreate: tagList.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        }),
      },
      include: {
        tagList: true,
      },
    });
  },

  deleteArticle: async (slug) => {
    return await prisma.article.delete({
      where: { slug },
    });
  },

  favoriteArticle: async (slug) => {
    return await prisma.article.update({
      where: { slug },
      data: {
        favoritesCount: {
          increment: 1,
        },
        favorited: true,
      },
      include: {
        tagList: true,
      },
    });
  },

  // unfavoriteArticle: async (slug, userId) => {
  //   return await prisma.article.update({
  //     where: { slug },
  //     data: {
  //       favoritesCount: {
  //         decrement: 1,
  //       },
  //       favorited: false,
  //     },
  //     include: {
  //       tagList: true,
  //     },
  //   });
  // },
};
