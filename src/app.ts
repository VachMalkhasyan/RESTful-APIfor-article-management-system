import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import articleRoutes from "./routes/articleRoutes";
import commentRoutes from "./routes/commentRoutes";

dotenv.config();
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);
app.use('/comments', commentRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
