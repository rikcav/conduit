const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  findAllTags: async () => {
    return await prisma.tag.findMany();
  },

  createTag: async (data) => {
    const tag = await prisma.tag.create({
      data,
    });

    return tag;
  },
};
