/*
등록할 때 형식 
  {
    "title": "아이폰 11 MAX",
    "content": "얼마사용하지 않은 제품",
    "author": "판매자",
    "password": 1111
  }

수정할때 형식
  {
    "title": "아이폰 11 MAX",
    "content": "얼마사용하지 않은 제품",
    "password": 1111,
    "status": "SOLD_OUT"
  }

삭제할 때 형식
  {
    "password": 1111
  }
*/

const express = require("express");
const router = express.Router();

//상품 등록
const Products = require("../schemas/products.schema");
router.post("/products", async (req, res) => {
  const { title, content, author, password } = req.body;
  if (!title || !password) {
    return res
      .status(400)
      .json({ Message: "데이터 형식이 올바르지 않습니다." });
  }
  const createdProducts = await Products.create({
    title,
    content,
    author,
    password,
  });

  res.json(
    { products: createdProducts },
    { message: "판매 상품을 등록하였습니다." }
  );
});

//상품 목록 조회
router.get("/products", async (req, res) => {
  const products = await Products.find({});
  //최신순으로 정렬
  const sortedProducts = products.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const results = sortedProducts.map((product) => {
    return {
      id: product._id,
      title: product.title,
      author: product.author,
      status: product.status,
      createdAt: product.createdAt,
    };
  });
  res.status(200).json({ products: results });
});

//상품 상세 조회
router.get("/products/:productsId", async (req, res) => {
  const { productsId } = req.params;
  if (!productsId) {
    return res
      .status(400)
      .json({ Message: "데이터 형식이 올바르지 않습니다." });
  }
  const products = await Products.find({});
  const data = products.filter((product) => product._id == productsId);
  if (data.length === 0) {
    return res.status(404).json({ Message: "상품 조회에 실패하였습니다." });
  }
  const results = data.map((product) => {
    return {
      id: product._id,
      title: product.title,
      content: product.content,
      author: product.author,
      status: product.status,
      createdAt: product.createdAt,
    };
  });
  res.json({ results });
});

//상품 정보 수정
router.put("/products/:productsId", async (req, res) => {
  const { productsId } = req.params;
  const { title, content, password, status } = req.body;

  const updateProduct = await Products.find({ _id: productsId });

  if (updateProduct.length == 0) {
    return res.status(404).json({ Message: "상품 조회에 실패하였습니다." });
  }

  if (updateProduct.length > 0) {
    if (updateProduct[0].password !== req.body.password) {
      return res
        .status(401)
        .json({ Message: "상품을 수정할 권한이 존재하지 않습니다." });
    }
    await Products.updateOne(
      { _id: productsId },
      { $set: { title, content, password, status } }
    );
    res.status(200).json({ Message: "상품정보를 수정하였습니다." });
  }
});

//상품 제거
router.delete("/products/:productsId", async (req, res) => {
  const { productsId } = req.params;
  const { password } = req.body;

  const deleteProduct = await Products.find({ _id: productsId });
  if (!productsId || !password) {
    return res
      .status(400)
      .json({ Message: "데이터 형식이 올바르지 않습니다." });
  }
  if (deleteProduct.length == 0) {
    return res.status(404).json({ Message: "상품 조회에 실패하였습니다." });
  }

  if (deleteProduct.length > 0) {
    if (deleteProduct[0].password !== password) {
      return res
        .status(401)
        .json({ Message: "상품을 삭제할 권한이 존재하지 않습니다." });
    }
    await Products.deleteOne({ _id: productsId });
    res.status(200).json({ Message: "상품을 삭제하였습니다." });
  }
});

module.exports = router;
