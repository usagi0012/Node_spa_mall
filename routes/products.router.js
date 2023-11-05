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

const products = [
  {
    _id: 4,
    title: "아이폰14",
    content: "얼마사용하지 않은 제품",
    author: "판매자",
    password: "1234",
    status: "FOR_SALE",
    createdAt: "2023-10-19T04:09:42.059Z",
  },
  {
    _id: 3,
    title: "아이폰13 MINI",
    content: "얼마사용하지 않은 제품",
    author: "판매자",
    password: "1231",
    status: "FOR_SALE",
    createdAt: "2023-10-17T05:10:42.059Z",
  },
  {
    _id: 2,
    title: "아이폰14 MAX",
    content: "얼마사용하지 않은 제품",
    author: "판매자",
    password: "1212",
    status: "FOR_SALE",
    createdAt: "2023-10-17T04:09:42.059Z",
  },
  {
    _id: 1,
    title: "아이폰10 MAX",
    content: "얼마사용하지 않은 제품",
    author: "판매자",
    password: "1111",
    status: "FOR_SALE",
    createdAt: "2023-10-15T04:09:42.059Z",
  },
];

//상품 목록 조회
router.get("/products", (req, res) => {
  res.status(200).json({ products });
});

//상품 상세 조회
router.get("/products/:productsId", (req, res) => {
  const { productsId } = req.params;
  const [data] = products.filter(
    (products) => products._id === Number(productsId)
  );
  res.json({ data });
});

module.exports = router;
