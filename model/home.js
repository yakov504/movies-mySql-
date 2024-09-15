const movie = require("./movie");

module.exports = {

  getHomePage: (req,res) => {

     let querySQL=`SELECT * FROM movies `;

    db.query(querySQL,(err, movie) => {

      if (err) {

        console.log(err.message);
        return res.status(500).send(`<h1>ERROR: ${err.message} \n
             while performing \n
             ${querySQL}</h1>`);

      }

      // Controller (we've got it here close to the Model)
      res.render('index.ejs', {
        title: 'movies',
        movie
      })

    })

  },
  
  getSampleHomePage: (req,res) => {

    res.render('index.ejs',
      {title: 'Movie',
     movies: [
      {
    id:1,
    name:'Bad Boys 1',
    genere:'action',
    year:1995,
    country:'Use',
    image:'',
    movie_time:'126 min'
     },
     {
     id:2,
     name:'Big Mama',
     genere:'action/comedy',
     year:2006,
     country:'Use',
     image:'',
     movie_time:'126 min'
      },
     ]
    })
},

  getSmallHomePage: (req,res) => {

    res.render('small-index.ejs',
      {title: 'Movie'})

  }

}