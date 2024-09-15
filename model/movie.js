const actors = require('./actors');
const fs = require('fs');

module.exports = {

    message: '',

    getAddPage: (req, res) => {

        // actors.getActorsList((err,result) => {

        //     if (err) {
        //         return res.status(500).send(err.message);
        //     }

            res.render('add-movie.ejs', {
                title: 'Add | Movies',
                message: module.exports.message,

            })

    },

    addMovie: (req, res) => {

        console.log(req.body)

        // Check if there was smth wrong while uploading the file
        // If it was, change the "message" property of the current module
        // and show the "add movie" page again (with the message)
        if (!req.files) {

            module.exports.message = 'No file was uploaded';
            return res.redirect('/add');

        }

        let movieId = req.params.id;
        let movieName = req.body.movieName;
        let genere = req.body.genere;
        let year = +req.body.year;
        let country = req.body.country || null;
        let movieImage = req.body.image;
        let movie_time = req.body.movie_time ? req.body.movie_time + 'min' : null;
        // let actors_id = +req.body.actors_id 
        // let actors_name = +req.body.actors_name || null;


        let image = req.files.movie_img;
        let extension = image.mimetype.split('/')[1];

        if (!/^(gif|heic|jpeg|jpg|png|svg|webp)$/.test(extension)) {

            module.exports.message = `Wrong file extension: ${extension}`;
            return res.redirect('/add');

        }

        let imageName = `${movieName}.${extension}`;

        let querySQL = `SELECT * FROM movies WHERE name = '${movieName}'`;

        db.query(querySQL,(err,result) => {

            if (err) {
                return res.status(500).send(`<h1>ERROR ${err.message}\n
                while performing\n
                ${querySQL}</h1>`);
            }

    
            if (result.length > 0) {

                module.exports.message = `movie named ${movieName} is already exist`;
                return res.redirect('/add');

            }

            querySQL = `INSERT INTO movies (name, genere, year, country, image, movie_time)
            VALUES ('${movieName}','${genere}',${year},'${country}',
            '${imageName}','${movie_time} ')`;

            db.query(querySQL,(err) => {

                if (err) {
                    return res.status(500).send(`<h1>ERROR ${err.message}\n
                    while performing\n
                    ${querySQL}</h1>`);
                }
                // mv() - puts the file to some place in the disk
                image.mv(`static/assets/img/${imageName}`,(err) => {

                    if (err) {
                        // t.b.d. - delete the row from the database
                        // `DELETE FROM movie WHERE name = ${movieName}`
                        return res.status(500).send(`<h1>ERROR ${err.message}\n
                                while performing mv() of \n
                                static/assets/img/${imageName}</h1>`);
                    }

                    res.redirect('/');

                }) // end of image.mv()

            }) // end of db.query('INSERT ...')

            
        }) // end of db.query('SELECT ...')
        

    }, // end of addMovie()

    getEditPage: (req, res) => {

        let movieId = req.params.id;

        // actors.getActorsList((err,actors) => {

        //     if (err) {
        //         return res.status(500).send(err.message);
        //     }

            let querySQL = `SELECT * FROM movies
                   WHERE id = ${movieId}`;

            db.query(querySQL, (err,movies) => {

                if (err) {
                    return res.status(500).send(`<h1>ERROR ${err.message}\n
                    while on purpose to edit movie performing\n
                    ${querySQL}</h1>`);
                }

                res.render('edit-movie.ejs', {
                    title: 'Edit | Movies',
                    message: module.exports.message,
                    // actors: actors,
                    movie: movies.length > 0 ? movies[0] : null
                })
            })

        // })

    },
    editMovie: (req, res) => {
        let movieId = req.params.id;
        let movieName = req.body.movieName;
        let genere = req.body.genere;
        let year = +req.body.year;
        let country = req.body.country || null;
        let movie_time = req.body.movie_time ? req.body.movie_time + 'min' : null;
        
        let image = req.files ? req.files.movie_img : null;
        let imageName = null;
    
        if (image) {
            let extension = image.mimetype.split('/')[1];
    
            if (!/^(gif|heic|jpeg|jpg|png|svg|webp)$/.test(extension)) {
                module.exports.message = `Wrong file extension: ${extension}`;
                return res.redirect('/edit');
            }
    
            imageName = `${movieName}.${extension}`;
        } else {
            imageName = req.body.image; 
        }
    
        // SQL query to update the movie
        let querySQL = `UPDATE movies SET name = ?, genere = ?, year = ?, country = ?, image = ?, movie_time = ? WHERE id = ?`;
        let inputSQL = [movieName, genere, year, country, imageName, movie_time, movieId];
    
        db.query(querySQL, inputSQL, (err) => {
            if (err) {
                return res.status(500).send(`<h1>ERROR ${err.message}\n while performing\n ${querySQL}</h1>`);
            }
    
            if (image) {
                image.mv(`static/assets/img/${imageName}`, (err) => {
                    if (err) {
                        return res.status(500).send(`<h1>ERROR ${err.message}\n while moving file\n static/assets/img/${imageName}</h1>`);
                    }
    
                    res.redirect('/');
                });
            } else {
                res.redirect('/');
            }
        });
    },

    deleteMovie: (req, res) => {


        // if (!req.files) {

        //     module.exports.message = 'No file was uploaded';
        //     return res.redirect('/');

        // }

        // let image = req.files.movie_img;
        // let extension = image.mimetype.split('/')[1];
        // let movieName = req.body.movieName;
        

        // if (!/^(gif|heic|jpeg|jpg|png|svg|webp)$/.test(extension)) {

        //     module.exports.message = `Wrong file extension: ${extension}`;
        //     return res.redirect('/add');

        // }

        // let imageName = `${movieName}.${extension}`;
        let movieId = req.params.id;

        let querySQL = `SELECT * FROM movies WHERE id = ${movieId}`;

        db.query(querySQL,(err,movies) => {

            if (err) {
                return res.status(500).send(`<h1>ERROR ${err.message}\n
                while getting image name for DELETE and performing\n
                ${querySQL}</h1>`);
            }

            let imageName = movies[0].image;

            querySQL = `DELETE FROM movies WHERE id = ${movieId}`;
            
            db.query(querySQL,(err) => {
                
                if (err) {
                    return res.status(500).send(`<h1>ERROR ${err.message}\n
                    while performing\n
                    ${querySQL}</h1>`);
                }

                fs.unlink(`static/assets/img/${imageName}`,(err) => {

                    if (err) {
                        return res.status(500).send(`<h1>ERROR ${err.message}\n
                        while succeeded to perform\n
                        ${querySQL}\n
                        and failed to remove static/assets/img/${imageName}</h1>`);
                    }

                    res.redirect('/');

                }) // end of deleting the image
                
            }) // end of db.query('DELETE ...')
            
        }) // end of db.query('SELECT IMAGE NAME ...')
    }

}