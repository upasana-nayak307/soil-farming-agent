### 🌱 Soil Farming Agent – Smart Soil & Crop Recommendation System

A modular web-based system designed to help users understand soil types, recommended crops, and nearby crop/distributor details.
Admins can upload soil information and distributor details, while users can view soil properties, recommended crops, and distributors.
  
---

This project follows a clean MVC structure, ensuring scalability, maintainability, and modular development.

### 📌 Table of Contents
- About the Project
- Features
- Tech Stack
- Project Folder Structure
- System Workflow
- Installation & Setup
- API Routes Overview
- Views Overview
- Environment Variables
- Logging
- Future Enhancements
- Author

---

### 📖 About the Project

Soil plays a crucial role in agriculture, and different crops require different soil types.
This system helps users understand:

✔ Soil types and characteristics
✔ Best-suited crops for each soil
✔ Crop distributor & seed seller details
✔ User-friendly soil and crop recommendation panel

The Admin updates soil details and distributor details.
The User views soil details, recommended crops, and distributor information.

---

### 🚀 Features
👨‍💼 Admin Features :
    Admin Login
    Add/update soil details
    Add/update distributor details
    Add crop recommendations
    Access admin dashboard
👩‍🌾 User Features :
    User registration & login
    View soil types & properties
    View crop recommendations
    View seed/distributor details
🔒 Security Features :
    Middleware-based route authentication
    Password hashing
    Secure login system

---

### 🛠 Tech Stack
Frontend :
    HTML
    CSS
    JavaScript
Backend :
    Node.js
    Express.js
    Database
    MongoDB (Mongoose ORM)
Additional Tools :
    JWT Authentication
    bcrypt.js
    Environment variables (.env)
    Logging (console/winston support)


---


### 📂 Project Folder Structure
```
soil-farming-agent/
│
├── html/
│   ├── about.html
│   ├── login.html
│   └── register.html
│
├── config/
│   └── database.js
│
│
├── controller/
│   ├── authController.js
│   ├── cropRecommend.js
│   ├── distributorController.js
│   └── soilController.js
│
├── css/
│   ├── about.css
│   ├── crop.css
│   ├── dashboard.css
│   ├── distributor.css
│   ├── index.css
│   ├── register.css
│   └── soil.css
│
├── javascript/
│   ├── crop.js
│   ├── cropUser.js
│   ├── dist.js
│   ├── navbar.js
│   ├── register.js
│   └── soil.js
│
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── authModel.js
│   ├── cropRecommend.js
│   ├── distributorModel.js
│   └── soilModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── cropRoutes.js
│   ├── distRoutes.js
│   └── soilRoutes.js
│
├── views/
│   ├── admin/
│   │   └── dashboard.html
│   └── user/
│       ├── crop.html
│       ├── distributer.html
│       └── soil.html
│
├── .env
├── index.html
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---


### 🔄 System Workflow

1️⃣ User Authentication
Register → Login → Redirect to correct dashboard
JWT stored in browser → validated via middleware

2️⃣ Admin Panel
Post soil information
Post distributor details
Add crop recommendations
Manage all data entries

3️⃣ User Panel
View soil details
View recommended crops
View distributors based on soil/crop

4️⃣ Database Flow

Model → Controller/Route → Frontend View/JS


---

### 🧩 API Routes Overview
Authentication Routes :

| Method | Route          | Description    |
|--------|----------------|----------------|
| POST   | /auth/register | Register user  |
| POST   | /auth/login    | Login user     |

Soil Routes :

| Method | Route                 | Description        |
|--------|-----------------------|--------------------|
| POST   | /soil/addSoil         | Add soil details   |
| GET    | /soil/getSoil         | Get all soil types |
| PUT    | /soil/updateSoil/:id  | Update soil details|
| DELETE | /soil/removeSoil/:id  | Delete soil        |

Crop Recommendation Routes :

| Method | Route                    | Description              |
|--------|--------------------------|--------------------------|
| POST   | /crops/addCrops          | Add crop recommendation  |
| GET    | /crop/getCrops           | Get recommended crops    |
| PUT    | /crop/updateCrops/:id    | Update crop details      |
| DELETE | /crop/removeCrop/:id     | Delete crop              |

Distributor Routes :

| Method | Route                                  | Description          |
|--------|----------------------------------------|----------------------|
| POST   | /distributors/addDistributor           | Add distributor      |
| GET    | /distributors/getDistributors          | Get all distributors |
| PUT    | /distributors/updateDistributors/:id   | Update distributor   |
| DELETE | /distributors/deleteDistributor/:id    | Delete distributor   |

---

### 🖼 Views Overview
    AdminDashboard (post/update/delete soil, crop & distributor data)
    User Pages
    soil.html → Show soil details
    crop.html → Recommended crops
    distributer.html → Distributors list

---

### 🔐 Environment Variables
Create a .env file in the root:
JWT_SECRET=your_secret_key

---

### 📥 Installation & Setup
1️⃣ Clone Repository

```Bash
git clone https://github.com/upasana-nayak307/soil-farming-agent.git
```
2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables
Create .env file

4️⃣ Start Server
node server.js

---

### 📝 Logging
Every key action (login, posting soil, posting distributor) can be logged.
Supports console logging or can integrate Winston for production logs.

---

### 🔮 Future Enhancements
Automated soil-to-crop AI recommendation
Location-based distributor search
Upload images for soil types
Admin analytics dashboard
Firebase hosting option

---

### 👩🏻‍💻 Author
**Upasana Nayak**

Full-Stack Developer