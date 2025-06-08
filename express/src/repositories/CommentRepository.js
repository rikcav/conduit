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

  findCommentById: async (id) => {
    return await prisma.comment.findUnique({
      where: { id },
    });
  },

  updateComment: async (id, data) => {
    return await prisma.comment.update({
      where: { id },
      data: {
        body: data.body,
      },
    });
  },

  deleteComment: async (id) => {
    return await prisma.comment.delete({
      where: { id },
    });
  },
};
