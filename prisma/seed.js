// Import the PrismaClient class from the @prisma/client package
const { PrismaClient } = require("@prisma/client");

// Import the faker object from the @faker-js/faker package
const { faker } = require("@faker-js/faker");

// Create a new instance of the PrismaClient class to interact with the database
const prisma = new PrismaClient();

// Define an asynchronous function named seedUsers to seed the database with user data
async function seedUsers() {
    // Log a message indicating that the seeding process for users is starting
    console.log(`Seeding users...`);

    // Concurrently create user records using fake data
    const users = await Promise.all(
        // Generate an array of 6 elements and map over it to create user data
        [...Array(6)].map(() => {
            // Create a new user record in the database using fake data
            return prisma.users.create({
                data: {
                    username: faker.internet.userName(),
                    password: faker.internet.password(),
                    first_name: faker.person.firstName(),
                    last_name: faker.person.lastName(),
                    email: faker.internet.email(),
                }
            });
        })
    );

    // Log a message indicating that the seeding process for events is starting
    console.log(`Seeding events...`);

    // Concurrently create event records for each user
    await Promise.all(
        // Map over the array of users to create events for each user
        users.map((user) => {
            // Create a new event record in the database for the current user
            return prisma.events.create({
                data: {
                    name: faker.word.words(2),
                    description: faker.lorem.sentence(),
                    start_date: faker.date.future(),
                    end_date: faker.date.future(),
                    event_image: faker.image.urlLoremFlickr(),
                    location: faker.location.streetAddress(),
                    contact_info: faker.phone.number(),
                    user_id: user.user_id,
                }
            });
        })
    );
}

// Call the seedUsers function to start the seeding process
seedUsers()
    // Chain a .then() method to handle successful completion of the seeding process
    .then(async () => {
        // Disconnect the Prisma client from the database
        await prisma.$disconnect();
    })
    // Chain a .catch() method to handle any errors that occur during the seeding process
    .catch(async (e) => {
        // Log the error to the console
        console.error(e);
        // Disconnect the Prisma client from the database
        await prisma.$disconnect();
    });
