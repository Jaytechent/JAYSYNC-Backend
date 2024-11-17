# JaySync

**JaySync** is an open-source social media posting tool that enables users to simultaneously post across multiple social platforms like Twitter, Instagram, Facebook, and TikTok.

## Features
1. Post a single message across multiple platforms.
2. Supports Twitter, Facebook, Instagram, and TikTok.
3. API-driven for integration with other systems.
4. Open-source, with community-driven development.
5. **Additional Expected Features**:
   - Improved User Interface (UI)
   - Post Scheduling
   - Integration with other social media platforms as suggested by the community.

## Getting Started

### Prerequisites
- Node.js >= 16.x
- MongoDB
- API keys for Twitter, Facebook, Instagram, and TikTok

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/JaySync.git
   cd JaySync
   npm install
   npm run dev

2. Create a .env file and add your Backend URL:
  
       BACKEND_URL=localhost:5000

3. cd to the backend part of the app and install dependencies:
   ```bash
   cd backend
   npm install
   node server.js

4. Create a .env file and add your API keys and MongoDB URL:
   ```bash
   TWITTER_API_KEY=<your-twitter-api-key>
   FACEBOOK_API_KEY=<your-facebook-api-key>
   INSTAGRAM_API_KEY=<your-instagram-api-key>
   TIKTOK_API_KEY=<your-tiktok-api-key>
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET= Add secret token


5. **API Endpoints**
   
   Endpoint	Method	Description
   
   /api/post	POST	Create a post across platforms

7. **HOW TO CONTRIBUTE**

   **Decide any feature to add or improvement of any part of the app**
   
   Fork the repo
   
   Create a feature branch (git checkout -b feature/AmazingFeature)
   
   Commit your changes (git commit -m 'Add AmazingFeature')
   
   Push to the branch (git push origin feature/AmazingFeature)
   
   Open a Pull Request


9. ## Technologies Used
  - **Node.js**: JavaScript runtime for building server-side applications.
  - **Express.js**: Web application framework for Node.js, used to build APIs.
  - **MongoDB**: NoSQL database for storing user data and posts.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **React**: Frontend library for building user interfaces.
- **Vite**: Next-generation frontend build tool for faster development and optimized builds.
- **JWT (JSON Web Tokens)**: For secure user authentication and authorization.
- **CORS (Cross-Origin Resource Sharing)**: Middleware to enable cross-origin requests.
- **dotenv**: For managing environment variables in a `.env` file.
- **Axios / Fetch API**: For making HTTP requests from the client to the server.

