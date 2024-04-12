const {PrismaClient} = require("@prisma/client");
const {faker} = require("@faker-js/faker");

const prisma = new PrismaClient();

async function seedUsers (){
	console.log(`Seeding users...`)
	const users  = await Promise.all(
		[...Array(6)].map(() => {
			return prisma.users.create({
				data: {
					username: faker.internet.userName(),
					password: faker.internet.password(),  
					first_name: faker.person.firstName(), 
					last_name: faker.person.lastName(),  
					email: faker.internet.email(),        
				}
			})
		})
	);
	console.log(`Seeding events...`)
	await Promise.all(
	users.map((user)=>{
			return prisma.events.create({
				data:{
					name: faker.word.words(2), 
					description: faker.lorem.sentence(), 
					start_date: faker.date.future(),
					end_date: faker.date.future(),
					event_image: faker.image.urlLoremFlickr(),
					location: faker.location.streetAddress(), 
					contact_info: faker.phone.number(), 
					user_id: user.user_id,
				}
			})
		})
	)
}

seedUsers().then(async() =>{
await prisma.$disconnect
}).catch(async (e) => {
	await prisma.$disconnect
});