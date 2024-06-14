import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const options = {
  method: 'GET',
  headers: {
    'x-apikey': 'ca86edbbcc936767fb08ff6b3f11144ec98a617783223f4bdef8c1b7cfa6276b', 
  },
};

app.get('/api/domain/:domain', async (req,  res) => {
  const domain = req.params.domain;
  try {
    const response = await fetch(`https://www.virustotal.com/api/v3/domains/${domain}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
