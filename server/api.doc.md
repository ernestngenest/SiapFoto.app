# **API Documentation**

## **ImageController Endpoints**

### 1. **Upload an Image**

- **URL:** `/images/upload`
- **Method:** `POST`
- **Description:** Uploads an image, processes it using AI, stores the result in the database, and returns the image URL.
- **Request:**
  - **Headers:**
    - `Authorization`: Bearer token (JWT)
  - **Body (multipart/form-data):**
    - `photo` (file): The image to upload.
    - `imgtype` (string): Image type (e.g., "male", "female").
- **Response:**
  - **Status 201:**
    ```json
    {
      "userid": "{userId}",
      "imgBoxUrl": "{uploadedImageUrl}",
      "prompt": "{prompt}"
    }
    ```
  - **Error Response:**
    ```json
    {
      "message": "error message"
    }
    ```

---

### 2. **Delete an Image**

- **URL:** `/images/:id`
- **Method:** `DELETE`
- **Description:** Deletes an image by its ID.
- **Request:**
  - **Headers:**
    - `Authorization`: Bearer token (JWT)
  - **Params:**
    - `id` (integer): The ID of the image to delete.
- **Response:**
  - **Status 200:**
    ```json
    {
      "message": "Success Delete"
    }
    ```
  - **Error Response:**
    ```json
    {
      "message": "Image Not Found"
    }
    ```

---

### 3. **Get All Images by User**

- **URL:** `/images`
- **Method:** `GET`
- **Description:** Retrieves all images uploaded by the authenticated user.
- **Request:**
  - **Headers:**
    - `Authorization`: Bearer token (JWT)
- **Response:**
  - **Status 200:**
    ```json
    [
      {
        "id": "{imageId}",
        "imgUrl": "{imageUrl}",
        "prompt": "{prompt}"
      }
    ]
    ```
  - **Error Response:**
    ```json
    {
      "message": "error message"
    }
    ```

---

### 4. **Get Image by ID**

- **URL:** `/images/:id`
- **Method:** `GET`
- **Description:** Retrieves an image by its ID.
- **Request:**
  - **Headers:**
    - `Authorization`: Bearer token (JWT)
  - **Params:**
    - `id` (integer): The ID of the image to retrieve.
- **Response:**
  - **Status 200:**
    ```json
    {
      "id": "{imageId}",
      "imgUrl": "{imageUrl}",
      "prompt": "{prompt}"
    }
    ```
  - **Error Response:**
    ```json
    {
      "message": "not found"
    }
    ```

---

### 5. **Send Image via Email**

- **URL:** `/images/email/:id`
- **Method:** `POST`
- **Description:** Sends the image as an email attachment to the authenticated user's email.
- **Request:**
  - **Headers:**
    - `Authorization`: Bearer token (JWT)
  - **Params:**
    - `id` (integer): The ID of the image to send.
- **Response:**
  - **Status 200:**
    ```json
    {
      "message": "Email sent successfully with the image attachment."
    }
    ```
  - **Error Response:**
    ```json
    {
      "message": "Image Data Not Found!"
    }
    ```

---

## **UserController Endpoints**

### 1. **Register**

- **URL:** `/users/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request:**
  - **Body (JSON):**
    - `username` (string): The user's username.
    - `email` (string): The user's email.
    - `password` (string): The user's password.
- **Response:**
  - **Status 201:**
    ```json
    {
      "message": "account successfully created"
    }
    ```
  - **Error Response:**
    ```json
    {
      "message": "Email already taken!"
    }
    ```

---

### 2. **Login**

- **URL:** `/users/login`
- **Method:** `POST`
- **Description:** Logs in a user and returns a JWT token.
- **Request:**
  - **Body (JSON):**
    - `email` (string): The user's email.
    - `password` (string): The user's password.
- **Response:**
  - **Status 200:**
    ```json
    {
      "id": "{userId}",
      "username": "{username}",
      "access_token": "{token}"
    }
    ```
  - **Error Response:**
    ```json
    {
      "message": "Invalid email/password"
    }
    ```

---

### 3. **Google Login**

- **URL:** `/users/google-login`
- **Method:** `POST`
- **Description:** Logs in a user using a Google token.
- **Request:**
  - **Body (JSON):**
    - `googleToken` (string): Google authentication token.
- **Response:**
  - **Status 201:**
    ```json
    {
      "id": "{userId}",
      "username": "{username}",
      "access_token": "{token}"
    }
    ```
  - **Error Response:**
    ```json
    {
      "message": "invalid google token !"
    }
    ```

---

### 4. **Update Username**

- **URL:** `/users/:id`
- **Method:** `PUT`
- **Description:** Updates the username of a user.
- **Request:**
  - **Headers:**
    - `Authorization`: Bearer token (JWT)
  - **Params:**
    - `id` (integer): The ID of the user.
  - **Body (JSON):**
    - `username` (string): New username.
- **Response:**
  - **Status 201:**
    ```json
    {
      "message": "Username has been updated"
    }
    ```
  - **Error Response:**
    ```json
    {
      "message": "username required"
    }
    ```

---

## **Error Handler**

- The following errors are handled by the application:

  | Error Name                     | Status Code | Message                        |
  | -------------------------------|-------------|--------------------------------|
  | `SequelizeUniqueConstraintError`| 401         | Sequelize validation error     |
  | `SequelizeValidationError`      | 401         | Sequelize validation error     |
  | `Invalid username`              | 400         | Invalid username               |
  | `invalid email`                 | 400         | Invalid email                  |
  | `invalid password`              | 400         | Invalid password               |
  | `invalid token`                 | 400         | Invalid token                  |
  | `invalid google token !`        | 400         | Invalid Google token           |
  | `unknown file`                  | 400         | Unknown file                   |

- **Response Example:**
  ```json
  {
    "message": "Error message"
  }
```