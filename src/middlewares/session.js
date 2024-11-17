
import session from 'express-session';
import dotenv from 'dotenv'
dotenv()
s
const session = express();


app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

