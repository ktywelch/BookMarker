const Portfolio = require("../models/book")



module.exports = function(app) {
  //verified code works
  app.get('/api/books', (req, res) => {
    console.log(req);
    Portfolio.find({})
    .sort({ createDate: -1 })//desending order should return the newest first
    .then(dbPortfolio => {
      console.log(res);
      res.json(dbPortfolio);
    })
    .catch(err => {
      res.status(400).json(err);
    })
   
  });
  

  app.put('/api/books', (req, res) => {
    console.log(req);
    Portfolio.find({})
    .sort({ createDate: -1 })//desending order should return the newest first
    .then(dbPortfolio => {
      console.log(res);
      res.json(dbPortfolio);
    })
    .catch(err => {
      res.status(400).json(err);
    })
   
  });
  

  app.put('/api/books/:id', (req, res) => {
        let rec_id = req.params.id;
        rec_id.trim(); //make sure no spaces
        //findOneAndUpdate(filter, update, options)
        Portfolio.findOneAndUpdate(
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
    Portfolio.deleteOne({_id: rec_id})
    .then(data => {
      res.json(data);
  })
  .catch(err => {
      res.status(400).json(err);
  });
});

  app.post("/api/books", (req, res) => {
    Portfolio.create(req.body)
    .then(dbPortfolio => {
      res.json(dbPortfolio);
    })
    .catch(err => {
      res.status(400).json(err);
    }); 
  });
  

}