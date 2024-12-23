import 'dotenv/config';
import express from "express";
import applyMiddlewares from "./middlewares/index.js";
import debugRouter from "./middlewares/vercel-debug.js";
// import eventRouter from './routes/events.js';
import userRoute from './routes/users.js';
import postRouter from './routes/post.js';
// import shopRouter from './routes/products.js'
import requestRouter from './routes/organizerRequest/index.js'
// import paymentRouter from './routes/sslcommerz/payment.js';
import globalErrorHandler from "./utils/globalErrorHandler.js";
// import ordersRouter from './routes/productOrders/index.js'
// import contactRouter from './routes/Contact.js'
// import reviewRouter from './routes/Review.js'

import dashboardRouter from './routes/dashboard.js'
// import newsletter from './routes/Newsletter.js'

const app = express();

applyMiddlewares(app)

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
app.use((req, res, next) => {
  console.log("Session data on request:", req.session);
  next();
});

// Routing Handling
app.use(userRoute)
app.use(debugRouter)
// app.use(eventRouter)
app.use(postRouter)
// app.use(shopRouter)
app.use(requestRouter)
// app.use(paymentRouter)
// app.use(ordersRouter)
// app.use(contactRouter) //contact
// app.use(reviewRouter)

app.use(dashboardRouter)
// app.use(newsletter)


app.get("/", (req, res) => {
  res.status(200).send({ massage: "Server is running" });
});


app.all("*", (req, res, next) => {
  const error = new Error(`Can't find requested ${req.originalUrl} in our server`)
  error.status = 404;
  next(error)
})

app.use(globalErrorHandler)

export default app;