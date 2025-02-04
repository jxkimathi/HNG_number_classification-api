// An API that takes a number and returns interesting mathematical properties about it, along with a fun fact.
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const PORT = process.env.PORT || 3000;

// Create an express app
const app = express();

// Middleware
// Implement CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Helper Functions
// Check for prime number
function is_prime (number) {
  if (number <= 1) return false;
  for (let i = 2; i < Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
}

// Check if number is a perfect number
function is_perfect (number) {
  let sum = 0;
  for (let i = 0; i < number; i++) {
    if (number % i === 0) sum += i;
  }
  return sum === number;
}

// Check the digit sum of a number
function digit_sum (number) {
  return number.toString().split("").reduce((a, b) => a + parseInt(b), 0);
}

// Check if number is an armstrong number
function isArmstrong (number) {
  const digits = number.toString().split('').map(Number);
  const power = digits.length;
  const total = digits.reduce((sum, digit) => sum + Math.pow(digit, power), 0);
  return total === number;
}

// Check the fun fact of a number
async function fun_fact (number) {
  try { 
    const response = await axios.get(`http://numbersapi.com/${number}/math?json`);
    return response.data.text || "No fun fact found!";

  } catch (error) { 
    return "Unable to fetch data!";
  }
};

// Routes
// Add the API route
app.get("/api/classify-number", async (req, res) => {
  const number = req.query.number;
  const properties = [];

  if (isArmstrong(number)) properties.push("armstrong");
  if (number % 2 === 0) properties.push("even");
  else properties.push("odd");

  const response = {
    number: number,
    is_prime: is_prime(number),
    is_perfect: is_perfect(number),
    digit_sum: digit_sum(number),
    properties: properties,
    fun_fact: await fun_fact(number)
  };

  res.json(response);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost/${PORT}`)
});
