const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  findCommentsByArticle: async (slug) => {
    return await prisma.comment.findMany({
      where: {
        article: {
          slug: slug,
        },
      },
    });
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

  deleteComment: async (id) => {
    return await prisma.comment.delete({
      where: { id },
    });
  },
};
