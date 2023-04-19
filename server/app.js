const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;


app.post('/request', async (req, res) => {
  const { link } = req.body;
  console.log(link);

  if (!link || typeof link !== 'string') {
    return res.status(400).json({ error: 'Некорректный запрос' });
  }

  try {
    const { data } = await axios.get(link);
    const result = []
    result.push(data)

    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});



app.post('/requestAll', async (req, res) => {
    const { links } = req.body;
    console.log(links);
  
    if (!links || !Array.isArray(links)) {
      return res.status(400).json({ error: 'Некорректный запрос' });
    }
  
    try {
      const results = await Promise.all(links.map(async (url) => {
        const { data } = await axios.get(url);
        return data;
      }));
      let resulti = []
      resulti.push(results)
      const result = resulti.flat()
  
      res.json({ result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  });

app.listen(port, () => console.log(`Server listening on port ${port}`));