const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  return res.render("index", { IFRAME_URL: process.env.IFRAME_URL });
});

app.get("/edit", async (req, res) => {
  try {
    const IFRAME_URL = process.env.IFRAME_URL;
    const DB_UID = IFRAME_URL.split('/')[4];
    const dbData = await axios.get(
      `http://localhost:3000/api/dashboards/uid/${DB_UID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }
    );

    const defaultConfig = dbData.data.dashboard.panels[0].fieldConfig.defaults;

    if (!req.query.formData) {
      const formData = {
        drawStyle: defaultConfig.custom.drawStyle,
        lineWidth: defaultConfig.custom.lineWidth,
        graphColor: defaultConfig.color.fixedColor,
        title: dbData.data.dashboard.panels[0].title,
      };
      return res.render("edit", {
        IFRAME_URL,
        ...formData,
      });
    }

    const formData = JSON.parse(req.query.formData);
    defaultConfig.custom = Object.assign(defaultConfig.custom, {
      drawStyle: formData.drawStyle,
      lineWidth: formData.lineWidth,
    });
    defaultConfig.color = {
      mode: 'fixed',
      fixedColor: formData.graphColor
    };
    dbData.data.dashboard.panels[0].title = formData.title;

    await axios.post("http://localhost:3000/api/dashboards/db", dbData.data, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    res.render("edit", { IFRAME_URL, ...formData });
  } catch (err) {
    res.send(err);
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));
