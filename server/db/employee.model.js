// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  present: {
    type: Boolean,
    default: false,
  },
  equipment: {
    type: Schema.Types.ObjectId,
    ref: "Equipment",
  },
  favoriteBrand: {
    type: Schema.Types.ObjectId,
    ref: "FavoriteBrand",
  },
  bonuses: [
    {
      value: Number,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Employee", EmployeeSchema);
