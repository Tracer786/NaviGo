# Backend API Documentation

## /users/register Endpoint

### Description
The `/users/register` endpoint allows clients to register a new user in the system. It validates the provided data, hashes the password, stores the user in the database, and returns a JWT token for authentication along with the created user details.

### Request Method & URL
- **Method:** POST  
- **URL:** `/users/register`

---

### Request Data
The endpoint accepts a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 characters, required)",
    "lastname": "string (min 3 characters, optional)"
  },
  "email": "string (valid email, required, min 5 characters)",
  "password": "string (min 6 characters, required)"
}
```

#### Field Details
- **fullname.firstname:** Required. Must be at least 3 characters long.
- **fullname.lastname:** Optional. If provided, must be at least 3 characters long.
- **email:** Required. Must be a valid email address and at least 5 characters long.
- **password:** Required. Must be at least 6 characters long. The password is hashed before storing in the database.

#### Validation
The request is validated using `express-validator`. Common validations include:
- Valid email format.
- Minimum length for `fullname.firstname`.
- Minimum length for `password`.

If validation fails, the endpoint returns a **400 Bad Request** status with details about the errors.

---

### Response

#### Success (User Created)
- **Status Code:** `201 Created`
- **Response Body:**

```json
{
  "token": "JWT token string",
  "user": {
    "_id": "user id",
    "fullname": {
      "firstname": "user first name",
      "lastname": "user last name"
    },
    "email": "user email"
  }
}
```

The returned JWT token is generated using `jsonwebtoken` and is intended for subsequent authenticated requests.

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "Validation error message",
      "param": "fieldName",
      "location": "body"
    }
  ]
}
```

#### Other Errors
- Unexpected errors will return a **500 Internal Server Error** status with a relevant error message.

---

### Example Request
You can test the registration endpoint using `cURL`:

```sh
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "secret123"
  }'
```

---

### Additional Information
- The password is hashed using `bcrypt` before being stored.
- A JWT token is generated using `jsonwebtoken` upon successful registration.
- Ensure your environment variables (e.g., `DB_CONNECT`, `JWT_SECRET`) are set correctly in your `.env` file.
- This endpoint is an integral part of the backend application built with `Express` and `Mongoose`.

