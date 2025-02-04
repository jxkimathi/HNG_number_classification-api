# Number Classification API Documentation

## Base URL

`http://localhost:3000/`

### Classify Number

Analyzes a number and returns its mathematical properties.

- **URL:** `/classify-number`
- **Method:** `GET`
- **URL Params:**
  - Required: `number=[integer]`

#### Success Response (200 OK)

```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

#### Error Response (400 OK)

```json
{
    "number": "alphabet",
    "error": true
}
```
