const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const dbData = await axios.get(`http://localhost:3000/api/dashboards/uid/${process.env.DB_UID}`, {
      headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`
      }
    });

    const data = {
      "dashboard":  {
        "id": dbData.data.dashboard.id,
        "folderId": dbData.data.dashboard.folderId,
        "panels": [
            {
              "id": 2,
              "gridPos": {
                "x": 0,
                "y": 0,
                "w": 12,
                "h": 50
              },
              "type": "timeseries",
              "title": "Testing this",
              "options": {
                "tooltip": {
                  "mode": "single",
                  "sort": "none"
                },
                "legend": {
                  "displayMode": "list",
                  "placement": "bottom",
                  "calcs": []
                }
              },
              "fieldConfig": {
                "defaults": {
                  "custom": {
                    "drawStyle": "line",
                    "lineInterpolation": "linear",
                    "barAlignment": 0,
                    "lineWidth": 10,
                    "fillOpacity": 0,
                    "gradientMode": "none",
                    "spanNulls": false,
                    "showPoints": "auto",
                    "pointSize": 5,
                    "stacking": {
                      "mode": "none",
                      "group": "A"
                    },
                    "axisPlacement": "auto",
                    "axisLabel": "",
                    "scaleDistribution": {
                      "type": "linear"
                    },
                    "hideFrom": {
                      "tooltip": false,
                      "viz": false,
                      "legend": false
                    },
                    "thresholdsStyle": {
                      "mode": "off"
                    }
                  },
                  "color": {
                    "mode": "palette-classic"
                  },
                  "mappings": [],
                  "thresholds": {
                    "mode": "absolute",
                    "steps": [
                      {
                        "value": null,
                        "color": "green"
                      },
                      {
                        "value": 80,
                        "color": "red"
                      }
                    ]
                  }
                },
                "overrides": []
              },
              "datasource": {
                "uid": "grafana",
                "type": "datasource"
              }
            }
          ],
        "title": dbData.data.dashboard.title,
        "uid": dbData.data.dashboard.uid,
        "version": dbData.data.dashboard.version
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

app.get('/db', async(req, res) => {
  try {
    const axiosRes = await axios.get('http://localhost:3000/api/dashboards/uid/vf0C6gXnk', {
      headers: {'Authorization': `Bearer ${API_TOKEN}`}
    });
    res.send(axiosRes.data);
  } catch(err) {
    res.send(err);
  }
})

app.listen(4000, () => console.log('Server running on port 4000'));