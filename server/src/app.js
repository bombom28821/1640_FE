import  express  from 'express'
import db from './config/db.js'
import path from 'path'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static('../../client'));
const run = async () => {
    await db.connect();
}
run();

app.listen(3000, ()=> console.log('Server is running !'))