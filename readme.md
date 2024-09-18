# Dev Academy REST API

The repository for “Dev Academy REST API” is a backend API for a web application managing bootcamps and courses. It includes CRUD functionality for users, bootcamps, courses and reviews.

## Endpoints
Below is an overview of the available endpoints and their functionalities.
- ***To view the Swagger UI schema, navigate to `http://localhost:3000/api-docs` in your browser after running the server.***
- ***You can test these endpoints via this [Postman](https://martian-meteor-939359.postman.co/workspace/alitalhacoban-public-workspace~6633d43a-18bb-4f4d-84e1-94a76d318225/collection/18754010-9bb8f197-24dc-461e-ab56-d80c6a7f190f?action=share&creator=18754010) collection***

<img width="1255" alt="auth" src="https://github.com/user-attachments/assets/1be0b082-b258-48a1-9e92-2d087af32149">
<img width="1255" alt="bootcamps" src="https://github.com/user-attachments/assets/09b8bf7b-42a0-4083-83ea-26ea0151859c">
<img width="1255" alt="courses" src="https://github.com/user-attachments/assets/fdebf626-ce85-45d2-9653-335aa63f5e9d">
<img width="1255" alt="reviews" src="https://github.com/user-attachments/assets/063db466-ac7f-4bd0-8e49-d8eec0dcad11">
<img width="1255" alt="users" src="https://github.com/user-attachments/assets/7f167e17-0b2b-4322-87f3-13b38cf5a446">


## Technologies Used

- ***bcryptjs:*** A library to hash passwords, providing secure encryption to protect sensitive user data.
- ***express-validator:*** Middleware for server side input validation.
- ***cookie-parser:*** Middleware to parse cookies in incoming HTTP requests.
- ***dotenv:*** Loads environment variables from a .env file into process.env.
- ***express:*** A fast, minimal web framework for building APIs and web applications.
- ***express-fileupload:*** Middleware for handling file uploads in Express applications.
- ***express-rate-limit:*** Limits the number of requests to an API to prevent abuse.
- ***jsonwebtoken:*** Implements JWT for user authentication.
- ***mongoose:*** Provides a schema-based solution for MongoDB interactions.
- ***nodemailer:*** Allows sending emails from your Node.js application.
- ***slugify:*** Converts text into a URL-friendly slug format.

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




