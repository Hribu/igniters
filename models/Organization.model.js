const {
  Schema,
  model
} = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, //required
  country: {
    type: String,
    required: true,
  }, //required
  city: {
    type: String,
    required: true,
  }, //required
  street: {
    type: String,
    required: false,
  }, //not required
  email: {
    type: String,
    required: true,
  }, //required
  categories: {
    type: [String],
    required: false,
  }, //not required
  language: {
    type: String,
    required: false,
  }, //not required
  description: {
    type: String,
    required: false,
  }, //required
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review",
    default: [],
  }, ],
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },

});

const Organization = model("Organization", organizationSchema);

module.exports = Organization;