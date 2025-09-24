import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dbFile = path.join(process.cwd(), "db.json");

if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(
    dbFile,
    JSON.stringify({ users: [], carts: {} }, null, 2)
  );
}

const readDB = () => JSON.parse(fs.readFileSync(dbFile, "utf-8"));
const writeDB = (data) => fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));

app.post("/signup", (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json({ message: "필수값 누락" });
  }

  const db = readDB();
  const exists = db.users.find((u) => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "이미 가입된 이메일입니다." });
  }

  const newUser = { id: Date.now().toString(), email, name, password };
  db.users.push(newUser);
  writeDB(db);

  res.json({ id: newUser.id, email: newUser.email, name: newUser.name });
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "이메일/비밀번호를 확인하세요." });
  }

  res.json({
    token: "dummy-token-" + Date.now(),
    user: { id: user.id, email: user.email, name: user.name },
  });
});


app.get("/carts/:userId", (req, res) => {
  const { userId } = req.params;
  const db = readDB();
  res.json(db.carts[userId] || []);
});

app.post("/carts/:userId", (req, res) => {
  const { userId } = req.params;
  const items = req.body;
  const db = readDB();
  db.carts[userId] = items;
  writeDB(db);
  res.json({ message: "장바구니 저장 완료" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
