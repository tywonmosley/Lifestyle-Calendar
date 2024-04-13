const prisma = require('./index.js')

const checkUserDetails = (username, email) => {
return prisma.users
};

module.exports = {
checkUserDetails

};