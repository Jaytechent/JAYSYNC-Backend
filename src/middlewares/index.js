import cookieParser from "cookie-parser";
import cors from 'cors';
import express from 'express';
import "dotenv/config";

const applyMiddlewares = (app)=>{
    app.use(cors({
        origin: [process.env.CLIENT],
        credentials:true
    }))
    app.use(cookieParser())
    app.use(express.json())
}

export default applyMiddlewares


// import cookieParser from "cookie-parser";
// import cors from 'cors';
// import express from 'express';
// import session from 'express-session'; 
// import dotenv from 'dotenv';
// dotenv.config();

// const applyMiddlewares = (app) => {
//     app.use(cors({
//         origin: [process.env.CLIENT],
//         credentials: true
//     }));
//     app.use(cookieParser());
//     app.use(express.json());

    
//     app.use(
//         session({
//           secret: process.env.SESSION_SECRET, // Set a strong secret in your .env file
//           resave: false,                       // Avoid resaving session if unmodified
//           saveUninitialized: false,            // Don’t save uninitialized sessions
//           cookie: {
//             secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
//             httpOnly: true,                                // Prevent client-side JS from accessing cookies
//             maxAge: 1000 * 60 * 60,                        // Session expiry (1 hour)
//           },
//         })
//       );
// }

// export default applyMiddlewares;










// // import cookieParser from "cookie-parser";
// // import cors from 'cors';
// // import express from 'express';
// // import "dotenv/config";

// // const applyMiddlewares = (app)=>{
// //     app.use(cors({
// //         origin: [process.env.CLIENT],
// //         credentials:true
// //     }))
// //     app.use(cookieParser())
// //     app.use(express.json())
// // }

// // export default applyMiddlewares
