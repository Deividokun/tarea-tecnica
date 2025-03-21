import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


app.post('/reverse-array', (req, res) => {
  const { array } = req.body;

  if (!Array.isArray(array)) {
    return res.status(400).json({ error: 'Input must be an array' });
  }

  const reversedArray = [...array].reverse();
  res.json({ reversedArray });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});