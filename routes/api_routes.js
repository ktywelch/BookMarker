const router = require("express").Router();
const auth = require("../middleware/auth");
const { getBooks, getBook, updateBook, delBook, createBook } = require("../controllers/ApiController");

router.get('/books', auth, getBooks);
router.get('/books/:id', auth, getBook);
router.put('/books/:id', auth, updateBook);
router.delete('/books/:id',auth, delBook);
router.post('/books', auth, createBook);

module.exports = router;

