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

# /users/login Endpoint

This document describes the `/users/login` endpoint which is used for user authentication.

## Endpoint Overview

- **Method**: `POST`
- **URL**: `/users/login`

## Request Data

- Expects a JSON object with the following structure:
  - **email**: string (valid email, required, min 5 characters)
  - **password**: string (min 6 characters, required)

**Example Request JSON:**

```
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

## Field Details

- **email**:
  - Required.
  - Must be a valid email address.
- **password**:
  - Required.
  - Must be at least 6 characters long.

## Validation

- Data is validated using `express-validator` to ensure:
  - The email is in a valid format.
  - The password meets the minimum length requirement.
- **On validation failure:**
  - Returns a **400 Bad Request** status with error details.

## Response

### Success (User Authenticated)

- **Status Code**: `200 OK`
- **Response Body:**

```
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

### Error (Invalid Credentials)

- **Status Code**: `401 Unauthorized`
- **Response Body:**

```
{
  "message": "Invalid email or password"
}
```

### Validation Error

- **Status Code**: `400 Bad Request`
- **Response Body:**

```
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

## Additional Information

- The user's password is compared after being hashed.
- A JWT token is generated upon successful login for future authenticated requests.
- Handle error responses appropriately on the client side.

# /users/profile Endpoint

## Description

The `/users/profile` endpoint retrieves the authenticated user's profile details. The request must include a valid JWT token for authentication.

## Request Method & URL

- **Method:** GET
- **URL:** `/users/profile`

---

## Request Data

No request body is required. The endpoint expects the JWT token to be provided in the `Authorization` header or as a cookie.

### Example Request

```sh
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

## Response

### Success (Profile Retrieved)

- **Status Code:** `200 OK`
- **Response Body:**

```json
{
  "_id": "user id",
  "fullname": {
    "firstname": "user first name",
    "lastname": "user last name"
  },
  "email": "user email"
}
```

### Error (Unauthorized)

- **Status Code:** `401 Unauthorized`
- **Response Body:**

```json
{
  "message": "Unauthorized"
}
```

---

## Additional Information

- The endpoint uses middleware to validate the JWT token.
- If the token is invalid, expired, or blacklisted, the request will fail with a `401 Unauthorized` status.

---

# /users/logout Endpoint

## Description

The `/users/logout` endpoint logs out the authenticated user by invalidating their JWT token. The token is added to a blacklist to prevent further use.

## Request Method & URL

- **Method:** GET
- **URL:** `/users/logout`

---

## Request Data

No request body is required. The endpoint expects the JWT token to be provided in the `Authorization` header or as a cookie.

### Example Request

```sh
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

## Response

### Success (Logged Out)

- **Status Code:** `200 OK`
- **Response Body:**

```json
{
  "message": "Logged out successfully"
}
```

### Error (Unauthorized)

- **Status Code:** `401 Unauthorized`
- **Response Body:**

```json
{
  "message": "Unauthorized"
}
```

---

## Additional Information

- The endpoint clears the JWT token from cookies and adds it to a blacklist.
- Blacklisted tokens are stored in the database with a TTL of 24 hours.
- If the token is invalid, expired, or already blacklisted, the request will fail with a `401 Unauthorized` status.
