const handleProfile = (req, res, postgres) => {
    const {id} = req.params;

    postgres.select('*').from('users').where({id})
        .then(user => {
            if(user.length)
                res.json(user[0]);
            else
                res.status(400).json('User Not Found');
        })
        .catch(err => {
            res.status(400).json('Erro Finding User');
        });
}

module.exports = {
    handleProfile: handleProfile
}