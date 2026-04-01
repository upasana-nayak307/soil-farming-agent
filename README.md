### 🌱 Soil Farming Agent – Smart Soil & Crop Recommendation System

A modular web-based system designed to help users understand soil types, recommended crops, and nearby crop/distributor details.<br>
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

Soil plays a crucial role in agriculture, and different crops require different soil types.<br>
This system helps users understand:

✔ Soil types and characteristics<br>
✔ Best-suited crops for each soil<br>
✔ Crop distributor & seed seller details<br>
✔ User-friendly soil and crop recommendation panel<br>

The Admin updates soil details and distributor details.<br>
The User views soil details, recommended crops, and distributor information.

---

### 🚀 Features
👨‍💼 **Admin Features** :<br>
• Admin Login<br>
• Add/update soil details<br>
• Add/update distributor details<br>
• Add crop recommendations<br>
• Access admin dashboard<br>

👩‍🌾 **User Features** :<br>
• User registration & login<br>
• View soil types & properties<br>
• View crop recommendations<br>
• View seed/distributor details<br>

🔒 **Security Features** :<br>
• Middleware-based route authentication<br>
• Password hashing<br>
• Secure login system<br>

---

### 🛠 Tech Stack
**Frontend :**<br>
• HTML<br>
• CSS<br>
• JavaScript<br>

**Backend :**<br>
• Node.js<br>
• Express.js<br>
• MongoDB (Mongoose ORM)<br>

**Additional Tools :**<br>
• JWT Authentication<br>
• bcrypt.js<br>
• Environment variables (.env)<br>
• Logging (console/winston support)<br>

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

**1️⃣ User Authentication**  
Register → Login → Redirect to correct dashboard  
JWT stored in browser → validated via middleware  

**2️⃣ Admin Panel**  
Post soil information<br>
Post distributor details<br>
Add crop recommendations<br>
Manage all data entries<br>

**3️⃣ User Panel**  
View soil details<br>
View recommended crops<br>
View distributors based on soil/crop<br>

**4️⃣ Database Flow**  
Model → Controller/Route → Frontend View/JS  

---

### 🧩 API Routes Overview

**Authentication Routes :**

| Method | Route          | Description    |
|--------|----------------|----------------|
| POST   | /auth/register | Register user  |
| POST   | /auth/login    | Login user     |

**Soil Routes :**

| Method | Route                 | Description        |
|--------|-----------------------|--------------------|
| POST   | /soil/addSoil         | Add soil details   |
| GET    | /soil/getSoil         | Get all soil types |
| PUT    | /soil/updateSoil/:id  | Update soil details|
| DELETE | /soil/removeSoil/:id  | Delete soil        |

**Crop Recommendation Routes :**

| Method | Route                    | Description              |
|--------|--------------------------|--------------------------|
| POST   | /crops/addCrops          | Add crop recommendation  |
| GET    | /crop/getCrops           | Get recommended crops    |
| PUT    | /crop/updateCrops/:id    | Update crop details      |
| DELETE | /crop/removeCrop/:id     | Delete crop              |

**Distributor Routes :**

| Method | Route                                  | Description          |
|--------|----------------------------------------|----------------------|
| POST   | /distributors/addDistributor           | Add distributor      |
| GET    | /distributors/getDistributors          | Get all distributors |
| PUT    | /distributors/updateDistributors/:id   | Update distributor   |
| DELETE | /distributors/deleteDistributor/:id    | Delete distributor   |

---

### 🖼 Views Overview
Admin Dashboard (post/update/delete soil, crop & distributor data)<br>
User Pages:<br>
• soil.html → Show soil details<br>
• crop.html → Recommended crops<br>
• distributer.html → Distributors list<br>

---

### 🔐 Environment Variables
Create a `.env` file in the root:

```
JWT_SECRET=your_secret_key
```

---

### 📥 Installation & Setup

**1️⃣ Clone Repository**
```bash
git clone https://github.com/upasana-nayak307/soil-farming-agent.git
```

**2️⃣ Install Dependencies**
```
npm install
```

**3️⃣ Setup Environment Variables**  
Create `.env` file

**4️⃣ Start Server**
```
node server.js
```

---

### 📝 Logging
Every key action (login, posting soil, posting distributor) can be logged.<br>
Supports console logging or can integrate Winston for production logs.

---

### 🔮 Future Enhancements
• Automated soil-to-crop AI recommendation<br>
• Location-based distributor search<br>
• Upload images for soil types<br>
• Admin analytics dashboard<br>
• Firebase hosting option<br>

---

### 👩🏻‍💻 Author
**Upasana Nayak**<br>
Full-Stack Developer