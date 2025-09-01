const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "data.json";

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

app.get("/api/absen", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

app.post("/api/absen", (req, res) => {
  const { nis, nama, status } = req.body;
  if (!nis || !nama || !status)
    return res.status(400).json({ error: "NIS, Nama, dan Status wajib diisi" });

  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const newAbsen = {
    id: data.length + 1,
    nis,
    nama,
    status,
    waktu: new Date().toISOString(),
  };
  data.push(newAbsen);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json(newAbsen);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
