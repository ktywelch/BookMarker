const Books = require("../models/books")


module.exports = function(app) {
  //verified code works
  app.get('/api/books', (req, res) => {
    console.log(req);
    Books.find({})
    .sort({ createDate: -1 })//desending order should return the newest first
    .then(dbBooks => {
      console.log(res);
      res.json(dbBooks);
    })
    .catch(err => {
      res.status(400).json(err);
    })
   
  });
  

  app.put('/api/books', (req, res) => {
    console.log(req);
    Books.find({})
    .sort({ createDate: -1 })//desending order should return the newest first
    .then(dbBooks => {
      console.log(res);
      res.json(dbBooks);
    })
    .catch(err => {
      res.status(400).json(err);
    })
   
  });
  

  app.put('/api/books/:id', (req, res) => {
        let rec_id = req.params.id;
        rec_id.trim(); //make sure no spaces
        //findOneAndUpdate(filter, update, options)
        Books.findOneAndUpdate(
            {_id: rec_id}, // filter
            {
              imgLoc: req.body.imgLoc,
              title:  req.body.title,
              description: req.body.description,
              author:  req.body.author,
              link:  req.body.link
            },//update
            {new: true}//options
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(400).json(err);
            });
  });
  
  app.delete('/api/books/:id', (req, res) => {
    let rec_id = req.params.id;
    rec_id.trim(); //make sure no spaces
    //findOneAndUpdate(filter, update, options)
    Books.deleteOne({_id: rec_id})
    .then(data => {
      res.json(data);
  })
  .catch(err => {
      res.status(400).json(err);
  });
});

  app.post("/api/books", (req, res) => {
    Books.create(req.body)
    .then(dbBooks => {
      res.json(dbBooks);
    })
    .catch(err => {
      res.status(400).json(err);
    }); 
  });


  app.get("/api/test", (req, res) => {
      res.json({msg: "Test Message"})
  })
  
}