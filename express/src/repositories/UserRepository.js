const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  findAllUsers: async () => {
    return await prisma.user.findMany();
  },

  createUser: async (data) => {
    const user = await prisma.user.create({
      data,
    });

    return user;
  },

  findUserById: async (id) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  updateUser: async (id, data) => {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  deleteUser: async (id) => {
    return await prisma.user.delete({
      where: { id },
    });
  },
};
