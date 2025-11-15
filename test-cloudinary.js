require("dotenv").config();
const cloudinary = require("cloudinary").v2;

console.log("Testing Cloudinary Configuration...\n");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log(
  "API Secret:",
  process.env.CLOUDINARY_API_SECRET
    ? "***" + process.env.CLOUDINARY_API_SECRET.slice(-4)
    : "undefined"
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Test the connection
cloudinary.api
  .ping()
  .then((result) => {
    console.log("\n✅ Cloudinary connection successful!");
    console.log("Result:", result);
  })
  .catch((error) => {
    console.log("\n❌ Cloudinary connection failed!");
    console.log("Error:", error.message);
    console.log("HTTP Code:", error.http_code);
  });
