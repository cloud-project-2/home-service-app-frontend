# Service Booking Application (Cloud Computing Project)

This project is a cloud-native **Service Booking Application** developed using a **microservices architecture**.  
It consists of three main services:

1. **Frontend Service** (React)
2. **Authentication Service** (Node.js + Express + MongoDB)
3. **Booking Service** (Node.js + Express + MongoDB)

---

## Project Structure

```
.
├── auth-service-api-main          # Authentication microservice
│   ├── models
│   └── routes
│
├── booking-service-api-main       # Booking microservice
│   ├── middleware
│   ├── models
│   └── routes
│
└── home-service-app-frontend-main # Frontend (React/Next.js)
    ├── public
    └── src
```

---

## Prerequisites

Before running locally, make sure you have installed:

- [Node.js](https://nodejs.org/) (>= 16.x recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cluster)
- npm package manager

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/orgs/cloud-project-2/repositories
```

### 2. Setup Environment Variables

Create a `.env` file in each service (`auth-service-api-main`, `booking-service-api-main`, `home-service-app-frontend-main`) with the following variables:

#### Auth Service (`auth-service-api-main/.env`)

```
PORT=8080
MONGO_URI=mongodb://localhost:27017/authdb
JWT_SECRET=your_jwt_secret
```

#### Booking Service (`booking-service-api-main/.env`)

```
PORT=9090
MONGO_URI=mongodb://localhost:27017/bookingdb
JWT_SECRET=your_jwt_secret
```

### 3. Install Dependencies

Run the following in each service folder:

```bash
cd auth-service-api-main
npm install

cd ../booking-service-api-main
npm install

cd ../home-service-app-frontend-main
npm install
```

### 4. Run Services

Start each service in a new terminal:

```bash
# Start Auth Service
cd auth-service-api-main
npm start

# Start Booking Service
cd ../booking-service-api-main
npm start

# Start Frontend
cd ../home-service-app-frontend-main
npm start
```

### 5. Access Application

Once running:

- Frontend → `http://localhost:3000`
- Auth Service API → `http://localhost:8080`
- Booking Service API → `http://localhost:9090`

---

## Tech Stack

- **Frontend:** React
- **Backend Services:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT

---

## Notes

- Make sure MongoDB is running before starting services.
- Replace `MONGO_URI` with your own MongoDB Atlas URI if you want to run on the cloud.
- JWT secret should be kept safe and not shared publicly.

---

## License

This project is for educational purposes under Cloud Computing coursework.
