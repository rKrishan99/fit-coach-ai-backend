# FitCoach AI - Full Stack Fitness Application

A comprehensive AI-powered fitness application built with a microservices architecture. FitCoach AI provides personalized workout plans, nutrition guidance, and an intelligent chatbot assistant to help users achieve their fitness goals.

## 🚀 Features

- **Personalized Workout Plans**: AI-generated workout routines based on user profile and fitness goals
- **Smart Chatbot**: Context-aware fitness assistant that provides guidance on workouts, nutrition, and health
- **User Authentication**: Secure registration/login with Google OAuth integration
- **Health Data Management**: Comprehensive user profile with fitness metrics and goals
- **Responsive Design**: Modern React frontend with Tailwind CSS
- **Microservices Architecture**: Scalable backend with dedicated services

## 🏗️ Architecture

### Backend Services
- **API Gateway** (Port 4000): Central GraphQL endpoint for all frontend requests
- **Auth Service** (Port 4001): User authentication and authorization
- **UserData Service** (Port 4002): User profile and health data management
- **Workout Service** (Port 4003): AI-powered workout plan generation
- **Chatbot Service** (Port 4004): Intelligent fitness assistant

### Frontend
- **React** with Vite for fast development
- **Apollo Client** for GraphQL data management
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express
- **Apollo Server** (GraphQL)
- **MongoDB** with Mongoose
- **Google Gemini AI** for workout plans and chatbot
- **JWT** authentication
- **Nodemailer** for email services
- **bcryptjs** for password hashing

### Frontend
- **React 18** with Vite
- **Apollo Client** for GraphQL
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React OAuth Google** for authentication
- **React Router DOM** for routing
- **React Toastify** for notifications

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Google Gemini API key
- Gmail account for email services (optional)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/rkrishan99/fitcoach-ai.git](https://github.com/rKrishan99/fit-coach-ai-backend.git)
cd fitcoach-ai
```

### 2. Backend Setup

#### Install Dependencies for All Services
```bash
# API Gateway
cd backend/api-gateway
npm install

# Auth Service
cd ../auth-service
npm install

# UserData Service
cd ../userData-service
npm install

# Workout Service
cd ../workout-service
npm install

# Chatbot Service
cd ../chatbot-service
npm install
```

#### Environment Variables
Create `.env` files in each service directory:

**api-gateway/.env**
```
PORT=4000
AUTH_SERVICE_URL=http://localhost:4001/graphql
USER_DATA_SERVICE_URL=http://localhost:4002/graphql
WORKOUT_SERVICE_URL=http://localhost:4003/graphql
CHATBOT_SERVICE_URL=http://localhost:4004/graphql
```

**auth-service/.env**
```
PORT=4001
MONGO_URI=mongodb://127.0.0.1:27017/fit-coach-ai-user
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:5173/
EMAIL=your_gmail@gmail.com
PASSWORD=your_app_password
```

**userData-service/.env**
```
PORT=4002
MONGO_URI=mongodb://127.0.0.1:27017/fit-coach-ai-userdata
```

**workout-service/.env**
```
PORT=4003
MONGO_URI=mongodb://127.0.0.1:27017/fit-coach-ai-workoutPlan
GEMINI_API_KEY=your_gemini_api_key
USER_SERVICE_URL=http://localhost:4002/graphql
```

**chatbot-service/.env**
```
PORT=4004
GEMINI_API_KEY=your_gemini_api_key
MONGO_URI=mongodb://127.0.0.1:27017/fit-coach-ai-chatbot
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```
VITE_API_URL=http://localhost:4000/graphql
```

### 4. Start MongoDB
Make sure MongoDB is running on your system.

### 5. Start All Services

#### Backend Services (run each in separate terminal)
```bash
# Terminal 1 - API Gateway
cd backend/api-gateway
npm run dev

# Terminal 2 - Auth Service
cd backend/auth-service
npm run dev

# Terminal 3 - UserData Service
cd backend/userData-service
npm run dev

# Terminal 4 - Workout Service
cd backend/workout-service
npm run dev

# Terminal 5 - Chatbot Service
cd backend/chatbot-service
npm run dev
```

#### Frontend
```bash
git clone https://github.com/rKrishan99/fitcoarch-ai-frontend.git
```

## 🔑 API Keys Setup

### Google Gemini AI
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` files as `GEMINI_API_KEY`

### Gmail App Password (for email features)
1. Enable 2-factor authentication on your Gmail
2. Generate an app password
3. Use it in the `PASSWORD` field in auth-service `.env`

## 🚀 Usage

1. **Register/Login**: Create an account or login with Google OAuth
2. **Complete Profile**: Fill in your fitness goals and health information
3. **Generate Workout Plan**: Get AI-powered personalized workout routines
4. **Chat with FitCoach**: Ask questions about fitness, nutrition, and health
5. **Track Progress**: Monitor your fitness journey

## 📱 Application Flow

1. **Authentication**: User registers/logs in
2. **Profile Setup**: Complete health and fitness information
3. **Dashboard**: Access workout plans and chat features
4. **Workout Generation**: AI creates personalized plans based on user data
5. **Chatbot Interaction**: Get fitness advice and motivation

## 🤖 Chatbot Features

The FitCoach AI chatbot is specialized for fitness and health topics:
- Workout routine suggestions
- Nutrition and diet advice
- Exercise form guidance
- Motivation and goal setting
- Health and wellness tips
- Automatic topic filtering (only responds to fitness-related queries)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation and sanitization
- Environment variable protection
- CORS configuration
- Secure password reset functionality

## 📊 Database Structure

### Users Collection (Auth Service)
- User credentials and profile information

### UserData Collection (UserData Service)
- Detailed health and fitness information

### WorkoutPlans Collection (Workout Service)
- AI-generated workout plans

### ChatMessages Collection (Chatbot Service)
- Chat history and conversations

## 🧪 Testing

Access GraphQL Playground for each service:
- API Gateway: http://localhost:4000/graphql
- Auth Service: http://localhost:4001/graphql
- UserData Service: http://localhost:4002/graphql
- Workout Service: http://localhost:4003/graphql
- Chatbot Service: http://localhost:4004/graphql

## 🚀 Deployment

### Backend Deployment
Each microservice can be deployed independently using platforms like:
- Heroku
- Railway
- DigitalOcean
- AWS ECS

### Frontend Deployment
Deploy the React app using:
- Vercel
- Netlify
- Firebase Hosting

### Database
Use MongoDB Atlas for cloud database hosting.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React, Apollo Client, Redux
- **Backend Development**: Node.js, GraphQL, MongoDB
- **AI Integration**: Google Gemini AI
- **DevOps**: Microservices Architecture

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

## 🔮 Future Enhancements

- Mobile app development (React Native)
- Advanced analytics and progress tracking
- Social features and community
- Integration with fitness trackers
- Meal planning and recipe suggestions
- Video workout tutorials
- Personal trainer booking system

---

**Built with ❤️ by the FitCoach AI Team**
