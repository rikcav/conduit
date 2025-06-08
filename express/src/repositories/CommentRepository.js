const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  findAllComments: async () => {
    return await prisma.comment.findMany();
  },

  createComment: async (data) => {
    return await prisma.comment.create({
      data: {
        body: data.body,
        articleId: data.articleId,
        authorId: data.authorId,
      },
    });
  },

  findCommentsByArticleSlug: async (slug) => {
    return await prisma.comment.findMany({
      where: {
        article: {
          slug: slug,
        },
      },
    });
  },
};
