const express = require('express');
const axios = require('axios');
const panelConfig = require('./data/panel.config');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');

app.get('/', async(req, res) => {
  return res.render('index', {IFRAME_URL: process.env.IFRAME_URL});
})

app.get('/edit', async (req, res) => {
  try {
    const dbData = await axios.get(`http://localhost:3000/api/dashboards/uid/${process.env.DB_UID}`, {
      headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`
      }
    });

    const { id, folderId, title, uid, version } = dbData.data.dashboard;
    const data = {
      'dashboard':  {
        id,
        folderId,
        title,
        uid,
        version,
        'panels': [
            panelConfig
        ]
      }
    }

    await axios.post('http://localhost:3000/api/dashboards/db', data, {
      headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`
      }
    });
    res.render('index', {IFRAME_URL: process.env.IFRAME_URL});
  } catch(err) {
    res.send(err);
  }
});

app.listen(4000, () => console.log('Server running on port 4000'));