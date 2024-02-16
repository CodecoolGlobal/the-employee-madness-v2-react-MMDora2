/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const FavoriteBrandModel=require("../db/favoriteBrand.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateBrands = async () => {
  const brandsData = ['Acer', 'Razer', 'HP'];

  for (const brandName of brandsData) {
    const brand = await FavoriteBrandModel.create({ name: brandName });
    console.log(`Created brand: ${brand.name}`);
  }
};

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const brands = await FavoriteBrandModel.find(); 

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    present:0,
    favoriteBrand: pick(brands),
    bonuses:[]
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);
  
  await populateBrands();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
