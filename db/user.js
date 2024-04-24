const prisma = require("./index.js");

const checkUserDetails = async (username, email) => {
  const userName = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  const userEmail = await prisma.users.findUnique({
    where: {
      email,
    },
  });

return !!(userName || userEmail);
};

const createUser = (userData) => {
    return prisma.users.create({
        data: userData,
    })
};

const getUser = (username) => {
  try {
      return prisma.users.findUnique({
    where: {
      username,
    },
  });
  } catch (error) {
    console.log('here', error)
    return {};
  }

};

module.exports = {
  checkUserDetails,
  createUser,
  getUser,
};
