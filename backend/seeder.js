const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/product");
const Cart = require("./models/Cart");

dotenv.config();

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

//Function to seed data 

const seedData = async ()=>{
    try{ 
        // clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // Create a default admin User
        const createdUser = await User.create({
            name:"Admin User",
            email: "admin@example.com",
            password: "123455",
            role: "admin",
        });

        // assign the default user ID to each product 
        const userID = createdUser._id;
        const sampleProducts = products.map((product) =>{
            return {...product, user: userID };
        });

        // Insert the products into the database
        await Product.insertMany(sampleProducts);
        console.log("Product data seeded successfully!");
        process.exit();
    }catch(error){
     console.log("error seeding the data : ", error);
     process.exit(1);
    }
};

seedData();