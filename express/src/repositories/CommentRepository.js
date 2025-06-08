const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  findAllComments: async () => {
    return await prisma.comment.findMany({
      include: {
        author: true,
        article: true,
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
      include: {
        author: true,
        article: true,
      },
    });
  },
};
