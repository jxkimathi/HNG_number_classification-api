const express = require("express");
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 3000;

// Create an express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Helper Functions
// Check for prime number
function is_prime(number) {
  if (number <= 1) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
}

// Check if number is a perfect number
function is_perfect(number) {
  let sum = 0;
  for (let i = 1; i < number; i++) {
    if (number % i === 0) sum += i;
  }
  return sum === number;
}

// Check the digit sum of a number
function digit_sum(number) {
  return number.toString().split("").reduce((a, b) => a + parseInt(b), 0);
}

// Check if number is an Armstrong number
function isArmstrong(number) {
  const digits = number.toString().split('').map(Number);
  const power = digits.length;
  const total = digits.reduce((sum, digit) => sum + Math.pow(digit, power), 0);
  return total === number;
}

// Fetch fun fact for a number
async function fun_fact(number) {
  try {
    const response = await axios.get(`http://numbersapi.com/${number}/math?json`);
    return response.data.text || "No fun fact found!";
  } catch (error) {
    return "Unable to fetch data!";
  }
}

// Routes
// Add the API route
app.get("/api/classify-number", async (req, res) => {
  const { number } = req.query;

  // Validate input
  if (!number || isNaN(number)) {
    return res.status(400).json({
      error: "Invalid input. Please provide a valid number in the 'number' parameter."
    });
  }

  const num = parseInt(number, 10);

  // Calculate properties
  const properties = [];

  if (isArmstrong(num)) properties.push("armstrong");
  if (num % 2 === 0) properties.push("even");
  else properties.push("odd");

  const response = {
    number: num,
    is_prime: is_prime(num),
    is_perfect: is_perfect(num),
    digit_sum: digit_sum(num),
    properties: properties,
    fun_fact: await fun_fact(num)
  };

  res.json(response);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
