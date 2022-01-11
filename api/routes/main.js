const router = require("express").Router();
const parser = require("../controllers/parser");

router.get("/start", parser.start_parser);

router.post("/auth", parser.continue_parser);

module.exports = router;
