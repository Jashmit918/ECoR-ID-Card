📇 ECoR ID Card Generator
A full-stack web application developed as an internship project at East Coast Railways (ECoR), Bhubaneswar, for generating ID cards for Gazetted and Non-Gazetted railway employees.

🔧 Tech Stack
Frontend:
React.js

Tailwind CSS

Vite

Backend:
Node.js

Express.js

MongoDB (Mongoose ODM)

🚀 Features
🔐 User Authentication

JWT-based login for Admin and Employees

🆔 ID Card Generation

Auto-generates ID cards for Gazetted and Non-Gazetted staff

📁 File Upload

Upload profile pictures and documents

📊 Application Status

Track card status: Pending, Approved, or Printed

🧾 Print-Ready View

Custom-designed front and back ID card layouts

🛡️ Protected Routes

Admin-only and user-only dashboard components

🧩 Modular Architecture

Clean separation of backend logic, middleware, routes, and services

🗂️ Project Structure
css
Copy
Edit
ecor-id-card-project-main/
├── Backend/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── app.js
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── main.jsx
│   └── index.html
🛠️ How to Run Locally
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/Jashmit918/ECoR-ID-Card.git
cd ECoR-ID-Card
2. Setup Backend
bash
Copy
Edit
cd Backend
npm install
# Create a .env file with the following variables:
# MONGO_URI=<your_mongodb_connection_string>
# PORT=3000
# JWT_SECRET=<your_jwt_secret>
npm start
3. Setup Frontend
bash
Copy
Edit
cd ../Frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173
Backend runs on: http://localhost:3000

📸 Screenshots
(Add screenshots here showing the login page, dashboard, and ID card previews)

📌 Deployment
Frontend: Deployed on Vercel

Backend: Can be deployed on Render, Railway, or any Node.js hosting

🏢 About the Internship
This project was developed as part of a summer internship at East Coast Railways (ECoR), Bhubaneswar, with the aim of digitizing the ID card generation process for internal staff management.

👨‍💻 Developed By
Jashmit Kumar
B.Tech CSE – Internship Project 2025
GitHub: @Jashmit918
