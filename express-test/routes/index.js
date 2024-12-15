const express = require('express');
const router = express.Router();

const fakeDB = [
  {
    id: Math.floor(Math.random() * 100),
    email: "test@example.com",
  },
];

router.get("/", (req, res) => {
  return res.status(200).json({ data: fakeDB });
});

router.post("/send", (req, res) => {
  fakeDB.push({
    id: Math.floor(Math.random() * 100),
    email: req.body.email,
  });
  return res.status(201).json({ data: fakeDB });
});

router.put("/update/:id", (req, res) => {
  const obj = fakeDB.find((el) => el.id === Number(req.params.id));
  obj.email = req.body.email;
  return res.status(200).json({ data: fakeDB });
});

router.delete("/destroy/:id", (req, res) => {
  const i = fakeDB.findIndex((el) => el.id === Number(req.params.id));
  fakeDB.splice(i, 1);
  return res.status(200).json({ data: fakeDB });
});

router.post("/reset", (req, res) => {
  fakeDB.splice(0, fakeDB.length);
  return res.status(200).json({ data: fakeDB });
});

router.put("/update/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { email } = req.body;

  const user = fakeDB.find((u) => u.id === id);
  if (user) {
    user.email = email;
    return res.status(200).json({ data: fakeDB });
  }
  return res.status(404).json({ error: "User not found" });
});

module.exports = router;
