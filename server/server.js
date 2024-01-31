require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  // const employees = await EmployeeModel.find().sort({name: 1}); //ABC....név szerint rendezi

  return res.json(employees);
});
app.get("/api/employees/order/", async (req, res) => {
  console.log(req.query);
  try {
    if (req.query.sortedBy === "Level") {
      const levels = { Junior: 1, Medior: 2, Senior: 3, Expert: 4, Godlike: 5 };
      const employeesSortedByLevel = await EmployeeModel.find();

      employeesSortedByLevel.sort((a, b) =>
        req.query.order == "asc"
          ? levels[a.level] - levels[b.level]
          : levels[b.level] - levels[a.level]
      );
     return res.json(employeesSortedByLevel);
    } else if (req.query.sortedBy === "Name") {
      const employeesSortedByName = await EmployeeModel.find();

      employeesSortedByName.sort((a, b) =>
        req.query.order == "asc"
          ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          : b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
      return res.json(employeesSortedByName);
    } else if (req.query.sortedBy === "Position") {
      const employeesSortedByPosition = await EmployeeModel.find()

      employeesSortedByPosition.sort((a, b) =>
      req.query.order == "asc"
        ? a.position.toLowerCase().localeCompare(b.position.toLowerCase())
        : b.position.toLowerCase().localeCompare(a.position.toLowerCase())
    );
      return res.json(employeesSortedByPosition);
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json({ massage: "Server error" });
  }
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
