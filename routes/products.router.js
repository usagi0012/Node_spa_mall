/*
1. 상품 작성 API
    - 상품명, 작성 내용, 작성자명, 비밀번호를 **request**에서 전달받기
    - 상품은 두 가지 상태, **판매 중(`FOR_SALE`)및 판매 완료(`SOLD_OUT`)** 를 가질 수 있습니다.
    - 상품 등록 시 기본 상태는 **판매 중(`FOR_SALE`)** 입니다.
2. 상품 목록 조회 API
    - 상품명, 작성자명, 상품 상태, 작성 날짜 조회하기
    - 상품 목록은 작성 날짜를 기준으로 **내림차순(최신순)** 정렬하기
3. 상품 상세 조회 API
    - 상품명, 작성 내용, 작성자명, 상품 상태, 작성 날짜 조회하기
4. 상품 정보 수정 API
    - 상품명, 작성 내용, 상품 상태, 비밀번호를 **request**에서 전달받기
    - 수정할 상품과 비밀번호 일치 여부를 확인한 후, 동일할 때만 글이 **수정**되게 하기
    - 선택한 상품이 존재하지 않을 경우, “상품 조회에 실패하였습니다." 메시지 반환하기
5. 상품 삭제 API
    - 비밀번호를 **request**에서 전달받기
    - 수정할 상품과 비밀번호 일치 여부를 확인한 후, 동일할 때만 글이 **삭제**되게 하기
    - 선택한 상품이 존재하지 않을 경우, “상품 조회에 실패하였습니다." 메시지 반환하기
*/

const express = require("express");
const router = express.Router();

//상품 등록
const Products = require("../schemas/products.schema");
router.post("/products", async (req, res) => {
  // if (req.body) {
  //   return res.status(400).json({
  //     errorMessage: "데이터 형식이 올바르지 않습니다.",
  //   });
  // }
  const { id, title, content, author, password } = req.body;
  const createdAt = Date.now();
  const { status } = "FOR_SALE";
  if (!id || !title || !password) {
    return res
      .status(400)
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }
  const createdProducts = await Products.create({
    id,
    title,
    content,
    author,
    password,
    status,
    createdAt,
  });

  res.json({ products: createdProducts });
  // res.json({ message: "판매 상품을 등록하였습니다." });
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
      .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }
  const products = await Products.find({});
  const data = products.filter((product) => product.id === Number(productsId));
  if (data.length === 0) {
    return res
      .status(404)
      .json({ errorMessage: "상품 조회에 실패하였습니다." });
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
  const { quantity } = req.body;

  const updateProduct = await Products.find({ id: Number(productsId) });
  if (updateProduct.length > 0) {
    await Products.updateOne(
      { id: Number(productsId) },
      { $set: { quantity } }
    );
  }

  res.status(200).json({ result: "success" });
});
module.exports = router;
