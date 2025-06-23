# Notes API Documentation

This document describes the Notes API endpoints created using Sequelize with PostgreSQL.

## Base URL
```
http://localhost:5000/notes
```

## Endpoints

### 1. Get All Notes
**GET** `/notes`

Query Parameters:
- `search` (optional): Search in title and content
- `category` (optional): Filter by category
- `archived` (optional): Filter by archived status (true/false)

**Example:**
```bash
curl -X GET "http://localhost:5000/notes?search=meeting&category=work"
```

**Response:**
```json
{
  "message": "List of notes",
  "data": [...],
  "count": 5,
  "status": "success"
}
```

### 2. Get Note by ID
**GET** `/notes/:id`

**Example:**
```bash
curl -X GET http://localhost:5000/notes/1
```

**Response:**
```json
{
  "message": "Detail of note",
  "data": {
    "id": 1,
    "title": "My Note",
    "content": "Note content",
    "category": "personal",
    "isArchived": false,
    "createdAt": "2025-06-23T12:49:38.157Z",
    "updatedAt": "2025-06-23T12:49:38.157Z"
  },
  "status": "success"
}
```

### 3. Create Note
**POST** `/notes`

**Request Body:**
```json
{
  "title": "Note Title (required)",
  "content": "Note content (optional)",
  "category": "Category (optional, default: 'general')",
  "isArchived": false
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "My First Note", "content": "This is the content", "category": "personal"}'
```

### 4. Update Note
**PUT** `/notes/:id`

**Request Body:**
```json
{
  "title": "Updated title (optional)",
  "content": "Updated content (optional)",
  "category": "Updated category (optional)",
  "isArchived": true
}
```

**Example:**
```bash
curl -X PUT http://localhost:5000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Note Title", "content": "Updated content"}'
```

### 5. Delete Note
**DELETE** `/notes/:id`

**Example:**
```bash
curl -X DELETE http://localhost:5000/notes/1
```

### 6. Archive/Unarchive Note
**PATCH** `/notes/:id/archive`

**Request Body:**
```json
{
  "isArchived": true  // or false to unarchive
}
```

**Example:**
```bash
curl -X PATCH http://localhost:5000/notes/1/archive \
  -H "Content-Type: application/json" \
  -d '{"isArchived": true}'
```

## Database Schema

The Notes table has the following structure:

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| title | STRING(255) | Note title (required) |
| content | TEXT | Note content (optional) |
| category | STRING(100) | Note category (default: 'general') |
| isArchived | BOOLEAN | Archive status (default: false) |
| createdAt | DATETIME | Creation timestamp |
| updatedAt | DATETIME | Last update timestamp |

## Features

- **Full CRUD operations** (Create, Read, Update, Delete)
- **Search functionality** in title and content
- **Category filtering**
- **Archive/Unarchive functionality**
- **Sequelize ORM** with PostgreSQL
- **Data validation** using Joi
- **Error handling** with proper HTTP status codes

## Error Responses

All error responses follow this format:
```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "status": "error"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error 