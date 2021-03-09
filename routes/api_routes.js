const router = require("express").Router();
const auth = require("../middleware/auth");
const { getBooks, getBook,updateBook,delBook,createBook } = require("../controllers/ApiController");

router.get('/api/books', getBooks);
router.get('/api/books/:id', getBook);
router.put('/api/books/:id', updateBook);
router.delete('/api/books/:id', delBook);
router.post('/api/books', createBook)

module.exports = router;

