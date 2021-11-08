const http = require("http");
const path = require("path");
const express = require("express");
const axios = require("axios");
const app = express();
const port = 80;

const httpServer = http.createServer(app);
app.use(express.static(path.join(__dirname)));

app.get("/people/:id", (req, res) => {
  const query = req.query;
  const { id } = req.params;

  axios
    .get(`https://swapi.dev/api/people/${id}`)
    .then((ressponse) => {
      if (query.encoding === "ewok") {
        const wokeEncoded = ewoker(ressponse.data);
        return res.status(200).send(wokeEncoded);
      }
      return res.status(200).send(ressponse.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err.response.statusText);
    });
});

app.get("/planets/:id", (req, res) => {
  const query = req.query;
  const { id } = req.params;

  axios
    .get(`https://swapi.dev/api/planets/${id}`)
    .then((ressponse) => {
      if (query.encoding === "ewok") {
        const wokeEncoded = ewoker(ressponse.data);
        return res.status(200).send(wokeEncoded);
      }
      return res.status(200).send(ressponse.data);
    })
    .catch((err) => res.status(404).send(err.response.statusText));
});

function ewoker(obj) {
  const newObj = {};
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      newObj[key] = ewokHelper(obj[key]);
    }
    if (Array.isArray(obj[key])) {
      const newArr = obj[key].map((el) => ewokHelper(el));
      newObj[key] = newArr;
    }
  }
  return newObj;
}

function ewokHelper(string) {
  if (typeof string !== "string") {
    return string;
  }
  const withoutVowels = string.split(/[aeiou]/i).join("i");
  const withoutConsonants = withoutVowels
    .split(/[bcdfghjklmnpqrstvwxyz]/i)
    .join("b");
  return withoutConsonants;
}

httpServer.listen(port, () => {
  console.log(`Example  at:${port}`);
});
