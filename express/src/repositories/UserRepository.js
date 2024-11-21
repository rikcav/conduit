const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  registerUser: async (data) => {
    const user = await prisma.user.create({
      data,
    });

    return user;
  },

  findUserByEmail: async (email) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  findUserById: async (id) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },
};
