const express = require("express");
const app = express();
const port = 3001;
const productsRouter = require("./routes/products.router");
const connect = require("./schemas");
connect();

app.use(express.json());
app.use("/api", [productsRouter]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
