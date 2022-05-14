module.exports = {
  "id": 2,
  "gridPos": {
    "x": 0,
    "y": 0,
    "w": 12,
    "h": 9
  },
  "type": "timeseries",
  "title": "Panel Title",
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
        "drawStyle": "lines",
        "lineInterpolation": "linear",
        "barAlignment": 0,
        "lineWidth": 1,
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
        "mode": "fixed",
        "fixedColor": "yellow"
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