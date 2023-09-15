// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  var obj = { message: "Hello" };
  res.status(200).json(obj);
}
