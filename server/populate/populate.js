/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const brands = require("./brands.json");

const EmployeeModel = require("../db/employee.model");
const FavoriteBrandModel = require("../db/favoriteBrand.model");
const EquipmentModel = require("../db/equipment.model");
const LocationModel = require("../db/location.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateLocations = async () => {
  await LocationModel.deleteMany({});
  const locations = [
    {
      city: "Budapest",
      country: "Hungary",
    },
    {
      city: "Debrecen",
      country: "Hungary",
    },
    {
      city: "Bratislava",
      country: "Slovakia",
    }, 
   ];
    await LocationModel.create(...locations);
    console.log("Loc created")

};

const populateBrands = async () => {
  await FavoriteBrandModel.deleteMany({});
  const favs = brands.map((brand) => ({
    name: brand,
  }));

  await FavoriteBrandModel.create(...favs);
  console.log(`Created favoritebrands`);
};

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const brands = await FavoriteBrandModel.find();
  const locations = await LocationModel.find()

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    present: 0,
    favoriteBrand: pick(brands),
    bonuses: [],
    location:pick(locations)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateLocations()
  await populateBrands();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
