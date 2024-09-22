# Dev Academy REST API

Node.js RESTful API project for managing educational resources in an academy. It offers full CRUD functionality for users , courses , bootcamps and reviews with Express.js for routing and MongoDB for storage.

## Endpoints
Below is an overview of the available endpoints and their functionalities.
- ***To explore the Swagger UI schema and view available endpoints, navigate to `http://localhost:3000/api-docs` after running the server.***
- ***You can also test these endpoints via this [Postman](https://martian-meteor-939359.postman.co/workspace/alitalhacoban-public-workspace~6633d43a-18bb-4f4d-84e1-94a76d318225/collection/18754010-9bb8f197-24dc-461e-ab56-d80c6a7f190f?action=share&creator=18754010) collection***

<img width="1255" alt="auth" src="https://github.com/user-attachments/assets/1be0b082-b258-48a1-9e92-2d087af32149">
<img width="1255" alt="bootcamps" src="https://github.com/user-attachments/assets/09b8bf7b-42a0-4083-83ea-26ea0151859c">
<img width="1255" alt="courses" src="https://github.com/user-attachments/assets/fdebf626-ce85-45d2-9653-335aa63f5e9d">
<img width="1255" alt="reviews" src="https://github.com/user-attachments/assets/063db466-ac7f-4bd0-8e49-d8eec0dcad11">
<img width="1255" alt="users" src="https://github.com/user-attachments/assets/7f167e17-0b2b-4322-87f3-13b38cf5a446">


## Key Features

 This project implements the following key features to ensure a robust, secure, and scalable web application:

- `JWT-Based Authentication:` Secure user authentication using JSON Web Tokens (JWT) to manage user sessions.
- `Password Hashing`: Secure password storage with hashing using the `bcryptjs` package.
- `Role-Based Access Control (RBAC)`: Authorization system to manage access based on user roles, ensuring secure data handling.
- `Password Recovery`: Full password recovery system, including both "reset password" and "forgot password" functionalities.
- `Email Notifications`: Automated email notifications for password recovery using the `nodemailer` package.
- `Server-Side Validation`: Input validation using the `express-validator` package to ensure data integrity and security.
- `Advanced MongoDB Queries`: Efficient data retrieval and manipulation using the MongoDB Aggregation Framework.
- `Pagination`: Implemented pagination for efficient result retrieval in larger datasets.
- `Image Upload`: Secure image uploading functionality using the `express-fileupload` package.
- `SEO-Friendly URLs`: Convert text into URL-friendly slugs using the `slugify` package.
- `Rate Limiting`: Protect the application from abuse by implementing rate limiting using the `express-rate-limit` package.
- `Mongoose Hooks`: Utilized Mongoose `pre` and `post` hooks for automating tasks such as data validation and modifications before saving or retrieving documents.


 ## Installation
  1. Clone the repository
  
  ```bash
    git clone https://github.com/carpodok/dev-academy-rest-api.git
  ```
  
  2. Navigate to the project directory:
  
   ```bash
    cd dev-academy-rest-api
   ```

  3. Install required dependencies
  
  ```bash
   npm install
  ```
<br>

## Configuration

1. Creat a `.env` file on the root of the project and add the following environment variables. To set up email host informations visit [Mailtrap](https://mailtrap.io/home) and create your account.

```
NODE_ENV=development
PORT=3000
MONGO_URI=<your-mongo-uri>

FILE_UPLOAD_PATH= ./public/uploads
MAX_FILE_UPLOAD=1000000

JWT_SECRET=<your-jwt-secret>
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

// Set up with your own configurations
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=
SMTP_EMAIL=
SMTP_PASSWORD= 
FROM_EMAIL=noreply@devacademy.io
FROM_NAME=Dev Academy
```

<br>

2. To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```

## Running the Application

1. To start the server, run the following command on the root of the project path;

```
npm start
```

For the development purpose;
```
npm run dev
```

2. The application will be running on  `http://localhost:3000`

<br>



## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.


## License
This project is licensed under the MIT License.




