const router = require("express").Router();
const auth = require("../middleware/auth");
const {   tokenIsValid, register, login, getUser } = require("../controllers/UserController");

router.post("/register", register);

router.post("/login", login);

router.post("/tokenIsValid", tokenIsValid);

router.get("/", auth, getUser);

router.put("/", auth, getUser);

module.exports = router;
