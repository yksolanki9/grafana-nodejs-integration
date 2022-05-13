const express = require('express');
const axios = require('axios');

const app = express();
const { addToken } = require('./middlewares/auth');
const API_TOKEN = 'eyJrIjoiSmNMZ2d6dk9yVnIzRnhTdlkwbGhKSzJVNjMzM1g0UVMiLCJuIjoieWFzaHNvbCIsImlkIjoyfQ==';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/dashboards',
  timeout: 1000,
  
});

// app.get('/', (req, res) => {
//   res.send('Haha GOTTYA');

// });

app.get('/', async (req, res) => {
  try {
    const data = {
      "dashboard": {
        "id": null,
        "uid": null,
        "title": "Production Overview",
        "tags": [ "templated" ],
        "timezone": "browser",
        "schemaVersion": 16,
        "version": 0,
        "refresh": "25s"
      },
      "folderId": 0,
      "folderUid": "l3KqBxCMz",
      "message": "Made changes to xyz",
      "overwrite": false
    }
    const axiosRes = await axios.post('http://localhost:3000/api/dashboards/db', data, {
      headers: {'Authorization': `Bearer ${API_TOKEN}`}
    });
    res.send(axiosRes.data);
  } catch(err) {
    res.send(err);
  }
});


app.get('/db', async(req, res) => {
  try {
    const axiosRes = await axios.get('http://localhost:3000/api/dashboards/uid/2', {
      headers: {'Authorization': `Bearer ${API_TOKEN}`}
    });
    res.send(axiosRes.data);
  } catch(err) {
    console.log(err);
  }
})



app.listen(4000, () => console.log('Server running on port 4000'));