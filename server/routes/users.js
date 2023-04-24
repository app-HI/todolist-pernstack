const expres = require("express");
const router = expres.Router();

const {
	Login,
	Register,
	verifyToken,
} = require("../controller/userController");

router.post("/login", Login);
router.post("/register", Register);
router.get("/protected", verifyToken, (req, res) => {
	res.json({ message: "Protected route accessed!" });
});

module.exports = router;
