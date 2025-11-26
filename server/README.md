# E-commerce Backend API

## Overview
RESTful API for managing products with image upload functionality using Multer.

## Features
- ✅ Product CRUD operations
- ✅ Image upload with Multer (local storage)
- ✅ File validation (type, size)
- ✅ Automatic file cleanup on delete/update
- ✅ Pagination support
- ✅ Search functionality
- ✅ Sorting options
- ✅ Error handling and validation
- ✅ MongoDB with Mongoose
- ✅ JWT Authentication

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

3. The `uploads/` directory will be created automatically on first upload.

4. Start the server:
```bash
npm start
```

## API Endpoints

### Products

#### GET `/api/products`
Get all products with optional query parameters:
- `?page=1` - Page number (default: 1)
- `?limit=10` - Items per page (default: 100)
- `?search=query` - Search in name and description
- `?sortBy=price` - Sort field (default: createdAt)
- `?sortOrder=asc` - Sort order: asc or desc (default: desc)

**Response:**
```json
{
  "products": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### GET `/api/products/:id`
Get single product by ID.

#### POST `/api/products`
Create a new product.

**Request:** `multipart/form-data`
- `name` (string, required)
- `shortDescription` (string, required)
- `price` (number, required)
- `image` (file, required) - Max 5MB, formats: JPEG, JPG, PNG, GIF, WEBP

**Response:**
```json
{
  "message": "Product created successfully",
  "product": {...}
}
```

#### PUT `/api/products/:id`
Update a product.

**Request:** `multipart/form-data`
- `name` (string, optional)
- `shortDescription` (string, optional)
- `price` (number, optional)
- `image` (file, optional) - If provided, old image will be deleted

**Response:**
```json
{
  "message": "Product updated successfully",
  "product": {...}
}
```

#### DELETE `/api/products/:id`
Delete a product and its associated image file.

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

## Image Storage

- Images are stored in the `uploads/` directory
- Filenames are unique: `originalname-timestamp-random.ext`
- Images are accessible at: `http://localhost:5000/uploads/filename.ext`
- Old images are automatically deleted when:
  - Product is deleted
  - Product image is updated

## Error Handling

All endpoints return consistent error responses:

```json
{
  "message": "Error message",
  "errors": {
    "field": "Field-specific error"
  }
}
```

## Performance Optimizations

- MongoDB indexes on name, description, price, and createdAt
- Connection pooling (max 10 connections)
- Lean queries for read operations
- Pagination support
- File size limits (5MB max)

## Security

- File type validation
- File size limits
- Input validation and sanitization
- Error messages don't expose sensitive information in production

