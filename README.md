# ID Card Generation System (ICGS)
An Web-based ID card generation system for **Gazetted** and **Non-Gazetted** employees of **East Coast Railways (ECoR), Bhubaneswar**.

This full-stack project was developed as part of an Summer Internship Programme 2025 and automates the creation, management, and printing of employee ID cards.

---

## Project Structure
```
ECoR-ID-Card/
├── Backend/ # Node.js + Express REST API
├── Frontend/ # React.js  + Tailwind CSS (Web Interface)
```
---
##  Features
-  Admin & User Authentication with JWT
-  Separate modules for Gazetted & Non-Gazetted employees
-  Auto-filled ID card preview and printable format
-  Searchable tables for employee application status
- ️ Photo upload and image preview support
-  Vercel-ready deployment (for frontend)
- ️ Authenticated routes and protected access
---
# Tech Stack

###  Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT (JSON Web Token)
- Multer (for file uploads)

###  Frontend
- React.js
- Tailwind CSS
- Vite (React Fast Build Tool)
- Axios (for API integration)
- Context API (for state management)
---


## Screenshots
### _Login Page_

<img src="Frontend/assets/Admin%20Login%20Page%20Filled.png" width="400" alt="Login Page">


###  _ID Card Registration (For Non Gazzeted)_

<img src="Frontend/assets/Emp Reg (NG).png" width="400" alt="Login Page">


###  _ID Card Registration (For Gazzeted)_

<img src="Frontend/assets/Emp Reg (Gaz).png" width="400" alt="ID Card Registration (For Gazzeted)">


###  _Status Page_

##### Where Employees can check their ID Card Status using their respective UserID & DOB

<img src="Frontend/assets/Status Page.png" width="400" alt="Status Page">



###  _Admin Login Success_

##### Admin can login though LoginID & Password

<img src="Frontend/assets/Admin Login Success Popup.png" width="400" alt="Admin Login Success">



###  _Employees List_

##### This page shows the number of employees who have applied for the ID Cards

##### Note: Only Admin can view this Page after sucessful Login

<img src="Frontend/assets/Applied List.png" width="400" alt="Employees List">



###  _Generated ID Card_

##### This shows the final Identity Card

##### Format: Printable PDF

<img src="Frontend/assets/Final ID Card.png" width="400" alt="Final ID Card">


---
## Setup Instructions

### Prerequisites
- Node.js
- MongoDB (local or cloud)
- Git

### 1. Clone the Repository
```
git clone https://github.com/Jashmit918/ECoR-ID-Card.git
cd ECoR-ID-Card
```
### 2. Setup Backend
```
cd Backend
npm install
```
##### Create a .env file in /Backend:
```
MONGO_URI=your_mongo_connection_string
PORT=3000
JWT_SECRET=your_secret_key
```
##### Then run the server:
```
npm start
```
### 3. Setup Frontend
```
cd Frontend
npm install
npm run dev
```

---
## Authentication Flow
- Login: Users authenticate using id/password.
- Token: JWT stored in localStorage.
- Protected Routes: Guards prevent access to sensitive areas unless authenticated.

---
## Internship Organization
- East Coast Railways, Bhubaneswar - Official government body under Indian Railways.
