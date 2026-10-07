# Problem 5: A Crude Server

A modern Node.js backend RESTful API server built with Express and TypeScript. This project implements modern JavaScript features such as ES Modules, Dependency Injection (using `tsyringe`), validation (`express-validator`), an SQLite database (via `sequelize`), and is fully documented using Swagger.

## Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v18 or higher is recommended)
- **npm** (Node Package Manager)

## Setup & Configuration

1. **Install dependencies:**
   Navigate to the project directory and run the following command to install all the required packages:
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Ensure you have the necessary environment variables configured (like `PORT`, `NODE_ENV`, or database credentials). By default, the application is set up to listen on port `3000` via the `config/env.config.ts`.

## Running the Application

To start the server in development mode (which utilizes `tsx` for real-time TypeScript execution and live-reloading), run:

```bash
npm run dev
```

You should see an output in your terminal indicating that the server and database connection are established, for example:
```
🚀 my-app listening on port 3000 environment development
```

## API Documentation (Swagger)

The project includes built-in interactive API documentation powered by Swagger UI.

Once the application is running, open your web browser and navigate to:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

From the Swagger UI interface, you can explore the available schemas and test all the endpoints directly (using the "Try it out" feature).

### Available Endpoints

* **`GET /v1.0/products`** - Retrieve a list of all products
* **`POST /v1.0/products`** - Create a new product
* **`GET /v1.0/products/:id`** - Retrieve details of a specific product by ID
* **`PUT /v1.0/products/:id`** - Update an existing product by ID
* **`DELETE /v1.0/products/:id`** - Delete a product by ID

## Technology Stack
- **Express.js** v5
- **TypeScript** (Strict ESM Mode)
- **Sequelize** (SQLite)
- **tsyringe** (Dependency Injection)
- **express-validator**
- **Swagger UI**
