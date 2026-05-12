import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 

const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3001;

// GET /health route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server and log port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});