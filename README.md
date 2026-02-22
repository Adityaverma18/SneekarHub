# SneekarHub

SneekarHub is a **full-stack e-commerce web application** for buying and selling sneakers.  
It’s built with **React.js** on the frontend and **Node.js + Express** on the backend, offering a seamless shopping experience with user authentication, product management, and dynamic UI features. :contentReference[oaicite:1]{index=1}

---
***Link*** https://sneekar-hubfrontend.onrender.com/
---

## 🔥 Features

- 🛍️ Dynamic product browsing and sneaker listings  
- 🧑‍💻 Secure user authentication (signup/login)  
- 🔐 Backend APIs built with Node.js & Express  
- 🗃️ Inventory & order management capabilities  
- 💬 Notification support (e.g. toast messages)  
- 🛒 Frontend routing and interaction using React Router  
- 🚀 Smooth UI animations via Framer Motion :contentReference[oaicite:2]{index=2}

---

## 🧠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | Core UI and Components |
| Vite | Dev server & build tooling |
| Tailwind CSS | Utility-first styling |
| React Router | Navigation & routing |
| Axios | HTTP requests |
| Framer Motion | UI animation |
| React Icons | Icons |
| React Toastify | Alerts & Toast messages | :contentReference[oaicite:3]{index=3}

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Data storage & modeling |
| Bcrypt | Password hashing & security |
| JWT | Token authentication |
| CORS | Cross-origin sharing |
| Nodemailer | Email services |
| Axios | HTTP calls | :contentReference[oaicite:4]{index=4}

---

## 🛠️ Installation

### 🔹 Clone Repository

```bash
git clone https://github.com/Adityaverma18/SneekarHub.git
cd SneekarHub
```

## 🚀 Run Frontend

```bash
cd client
npm install
npm run dev
```

## 🚀 Run Backend

```bash
cd server
npm install
npm start
```

## 🧪 API Endpoints

Below are general examples — update based on your actual route definitions

Method|	Route	|Description
POST|	/api/auth/register	|Create new user
POST|	/api/auth/login	|User login
GET	|/api/products	|Get all products
GET	|/api/products/:id	|Get product details
POST	|/api/orders	|Place an order
PUT	|/api/users/:id	|Update user profile
DELETE	|/api/products/:id	|Remove product

## 🛡️ Security & Validation

Passwords are hashed with bcrypt

JWT used for protected routes & sessions

CORS enabled for cross-domain requests

## 🧩 Project Structure

```bash
SneekarHub/
├── client/             # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/             # Backend APIs
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── package.json
├── .gitignore
├── README.md
```
## 💡 Contribution

Contributions are welcome!
If you want to contribute, follow these steps:

Fork this repository

1. Create a new branch: git checkout -b feature/yourFeature

2. Commit your changes: git commit -m 'Add some feature'

3. Push to branch: git push origin feature/yourFeature

4. Open a Pull Request

## 📜 License

This project is open-source and available under the MIT License.

## ❤️ Thanks

Thanks for checking out this project!
Feel free to reach out if you have suggestions or questions.
