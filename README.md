# 🏨 Hotel Booking App

A full-stack Hotel Booking and Management Platform built using **Java, Spring Boot, React.js, MySQL, and JWT Authentication**. The application allows users to search hotels, view hotel and room details, make reservations, and manage their bookings through a responsive and interactive interface.

---

## 🚀 Technologies Used

### Backend

* **Java**
* **Spring Boot**
* **Spring Data JPA**
* **REST APIs**
* **JWT Authentication**
* **MySQL**
* **Maven**

### Frontend

* **React.js**
* **Vite**
* **JavaScript**
* **HTML5**
* **CSS3**
* **Axios**
* **Framer Motion**

### Testing & Tools

* **JUnit**
* **Mockito**
* **Postman**
* **Docker**
* **Git & GitHub**

---

## ✨ Features

### 🔐 User Authentication

* User registration and login
* JWT-based authentication
* Secure password handling
* Role-based access control
* Logout functionality
* Protected routes

### 🏨 Hotel Management

* Browse available hotels
* Search hotels by location
* View hotel details
* View room types and pricing
* Check room availability
* Manage hotel information

### 📅 Booking Management

* Search available rooms
* Select check-in and check-out dates
* Create hotel reservations
* View booking details
* Cancel reservations
* View booking history
* Prevent double booking through availability validation

### 👨‍💼 Admin Panel

Administrators can:

* Add hotels
* Update hotel details
* Delete hotels
* Add and manage rooms
* Update room prices
* View all bookings
* Manage users
* Monitor reservation information

---

# 🎨 New: Animations & Interactive UI

The frontend has been enhanced with **Framer Motion** to provide a smoother and more modern user experience.

### ✨ Implemented Animations

* Smooth page transitions
* Hotel card entrance animations
* Hover animations on hotel cards
* Button hover and tap animations
* Animated navigation menu
* Search bar entrance animation
* Room availability animations
* Booking confirmation animation
* Login and registration form animations
* Modal open/close animations
* Loading animations
* Skeleton loading effects
* Scroll-based reveal animations
* Admin dashboard animations
* Image hover effects
* Smooth list rendering animations

### 🎬 Animation Examples

#### Hotel Cards

Hotel cards animate when they appear on the screen.

```jsx
import { motion } from "framer-motion";

function HotelCard({ hotel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.03,
        y: -5
      }}
      className="hotel-card"
    >
      <img src={hotel.image} alt={hotel.name} />

      <h3>{hotel.name}</h3>
      <p>{hotel.location}</p>
      <p>₹{hotel.price} / night</p>
    </motion.div>
  );
}

export default HotelCard;
```

---

## 🖱️ Animated Buttons

Buttons provide visual feedback when users interact with them.

```jsx
import { motion } from "framer-motion";

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Book Now
</motion.button>
```

---

## 📄 Page Transitions

Smooth transitions are added when navigating between pages.

```jsx
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Find Your Perfect Hotel</h1>
    </motion.div>
  );
}

export default Home;
```

---

## 🔍 Animated Search Section

The hotel search section uses entrance animations to improve the user experience.

```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
  className="search-container"
>
  <input
    type="text"
    placeholder="Enter location"
  />

  <button>
    Search Hotels
  </button>
</motion.div>
```

---

## 🏨 Hotel Image Hover Effect

```jsx
<motion.img
  src={hotel.image}
  alt={hotel.name}
  whileHover={{ scale: 1.08 }}
  transition={{ duration: 0.3 }}
/>
```

---

## 📜 Scroll Reveal Animation

Hotel sections can appear smoothly as the user scrolls.

```jsx
import { motion } from "framer-motion";

<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  <h2>Popular Hotels</h2>
</motion.section>
```

---

## ⏳ Loading Animation

Loading states are displayed while hotel or booking data is being fetched.

```jsx
import { motion } from "framer-motion";

function Loader() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1
      }}
      className="loader"
    />
  );
}

export default Loader;
```

---

## 🎉 Booking Confirmation Animation

After a successful booking, the application displays an animated confirmation.

```jsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 200
  }}
>
  <h2>Booking Confirmed 🎉</h2>
  <p>Your hotel reservation has been successfully created.</p>
</motion.div>
```

---

# 🏗️ Architecture

The application follows a **client-server architecture**.

```text
                    ┌─────────────────────┐
                    │      React.js       │
                    │      Frontend       │
                    │   React + Vite      │
                    └──────────┬──────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Spring Boot     │
                    │       Backend       │
                    │                     │
                    │ Controllers         │
                    │ Services            │
                    │ Repositories        │
                    │ JWT Security        │
                    └──────────┬──────────┘
                               │
                         Spring Data JPA
                               │
                               ▼
                    ┌─────────────────────┐
                    │        MySQL        │
                    │      Database       │
                    └─────────────────────┘
```

---

# 📦 Application Modules

### 1. Authentication Module

Handles:

* Registration
* Login
* JWT generation
* JWT validation
* Authorization
* Role management

### 2. Hotel Module

Handles:

* Hotel creation
* Hotel search
* Hotel details
* Hotel updates
* Hotel deletion

### 3. Room Module

Handles:

* Room creation
* Room availability
* Room pricing
* Room management

### 4. Booking Module

Handles:

* Booking creation
* Availability validation
* Booking history
* Booking cancellation
* Reservation details

### 5. Admin Module

Handles:

* Hotel management
* Room management
* User management
* Booking management

---

# 👥 User Roles

### 👤 Guest

Guests can:

* Browse hotels
* Search hotels
* View hotel details
* View available rooms

Login is required before making a reservation.

### 👨‍💻 Registered User

Registered users can:

* Search hotels
* Book rooms
* View bookings
* Cancel bookings
* View booking history

### 👨‍💼 Administrator

Administrators can:

* Manage hotels
* Manage rooms
* Manage users
* Manage bookings
* Access the admin dashboard

---

# 🗄️ Database Design

Main database entities include:

```text
User
 │
 ├── Booking
 │      │
 │      └── Room
 │              │
 │              └── Hotel
 │
 └── Role
```

### Main Tables

```text
users
 ├── id
 ├── name
 ├── email
 ├── password
 └── role

hotels
 ├── id
 ├── name
 ├── location
 ├── description
 └── rating

rooms
 ├── id
 ├── hotel_id
 ├── room_type
 ├── price
 └── availability

bookings
 ├── id
 ├── user_id
 ├── room_id
 ├── check_in
 ├── check_out
 ├── total_price
 └── status
```

---

# 🔒 Security

The application implements:

* JWT authentication
* Role-based authorization
* Protected REST APIs
* Input validation
* Secure API communication
* Authentication filters
* Protected frontend routes

Example:

```text
User Login
    ↓
Spring Boot Authentication
    ↓
JWT Token Generated
    ↓
Frontend Stores Token
    ↓
Token Sent With API Requests
    ↓
JWT Filter Validates Token
    ↓
Authorized API Access
```

---

# 🧪 Testing

The project includes testing using:

* JUnit
* Mockito
* Spring Boot Test
* REST API testing with Postman

Testing covers:

* Authentication
* Hotel APIs
* Room APIs
* Booking APIs
* Validation
* Exception handling

---

# 📱 Responsive Design

The React frontend is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

The UI includes responsive hotel cards, navigation, search forms, booking forms, and admin dashboards.

---

# ⚡ Getting Started

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

```bash
cd hotel-booking-app
```

---

## 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Configure MySQL in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hotel_booking
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

---

# 3. Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Install Framer Motion:

```bash
npm install framer-motion
```

Start the React development server:

```bash
npm run dev
```

---

# 🌐 API Documentation

The backend exposes REST APIs for:

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/hotels
GET    /api/hotels/{id}
POST   /api/hotels
PUT    /api/hotels/{id}
DELETE /api/hotels/{id}

GET    /api/rooms
POST   /api/rooms
PUT    /api/rooms/{id}
DELETE /api/rooms/{id}

POST   /api/bookings
GET    /api/bookings/user/{userId}
GET    /api/bookings/{id}
PUT    /api/bookings/{id}/cancel
```

---

# 📁 Project Structure

```text
hotel-booking-app/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/hotelbooking/
│   │       │       ├── controller/
│   │       │       ├── service/
│   │       │       ├── repository/
│   │       │       ├── entity/
│   │       │       ├── dto/
│   │       │       ├── security/
│   │       │       ├── exception/
│   │       │       └── config/
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── animations/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🎯 Future Enhancements

* 💳 Online payment integration
* 📧 Email booking confirmation
* ⭐ Hotel and room reviews
* ❤️ Wishlist functionality
* 🔔 Booking notifications
* 🗺️ Google Maps integration
* 🤖 AI-based hotel recommendations
* 💬 AI hotel assistant
* 📊 Advanced admin analytics
* ☁️ Cloud deployment
* 🔄 Redis caching
* 📨 Kafka-based event processing

---

# 👨‍💻 Author

**Ravada Sanyasi Naidu**

B.Tech – Artificial Intelligence & Machine Learning

Mohan Babu University, Tirupati

---

## ⭐ Project Highlights

```text
Java
   ↓
Spring Boot
   ↓
REST APIs
   ↓
JWT Security
   ↓
Spring Data JPA
   ↓
MySQL
   ↓
React + Vite
   ↓
Framer Motion
   ↓
Responsive UI
```

This project demonstrates practical experience in **Java backend development, REST API design, authentication, database management, React development, testing, and modern UI animation**.
