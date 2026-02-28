[Frontend Url](https://memories-frontend1.netlify.app/posts)
---

# ⚙️ BACKEND — README.md

```md
# 🧠 Memories App — Backend (Node.js + Express + MongoDB)

Backend API powering the Memories MERN application.  
Handles authentication, posts management, comments persistence, likes system, search, and pagination.

---

## 🌟 Features

### 📌 Posts API
- Create memory
- Update memory
- Delete memory
- Fetch all memories
- Fetch single memory

### 💬 Comments Feature
- Add comments to posts
- Persist comments in MongoDB
- Return updated post instantly

### ❤️ Likes System
- Like/Unlike posts
- User-based like tracking
- Optimized frontend updates

---

### 🔎 Search & Pagination
- Search by title (Regex search)
- Search by tags
- Pagination using MongoDB:
  - `.limit()`
  - `.skip()`

### 🔐 Authentication Support
- JWT Authentication
- User-based actions
- Protected routes

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST API Architecture
