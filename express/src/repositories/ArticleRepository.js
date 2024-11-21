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

  getFeed: async (userId, limit, offset) => {
    // Fetch IDs of followed users
    const followedUsers = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followedUserIds = followedUsers.map((f) => f.followingId);

    // Fetch articles created by followed users
    return await prisma.article.findMany({
      where: { authorId: { in: followedUserIds } },
      take: limit,
      skip: offset,
      orderBy: { createdAt: "desc" },
    });
  },

  findBySlug: async (slug) => {
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (article) {
      return article;
    }

    throw "Could not find article with slug: " + slug;
  },

  updateArticle: async (slug, data) => {
    const article = await prisma.article.update({
      where: { slug },
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
