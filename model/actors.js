module.exports = {

    getActorsList: (callback) => {

        let querySQL = 'SELECT id, name FROM actors';

        db.query(querySQL,(err,result) => {

            if (err) {
                console.log(err.message);
                callback(err,[]);
                return;
            }

            callback(err,result);

        })

    }


}