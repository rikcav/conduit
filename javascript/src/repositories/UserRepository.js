const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  registerUser: async (data) => {
    const user = await prisma.user.create({
      data,
    });

    return user;
  },
};
