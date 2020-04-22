const handleRegister = (req, res, postgres, bcrypt) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password)
        return res.status(400).json('Invalid Credentials Entered')

    const hash = bcrypt.hashSync(password);
    
    postgres.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        }).into('login').returning('email')
        .then(retEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email: retEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        res.status(400).json('Unable to Register');
    });
}

module.exports = {
    handleRegister: handleRegister
}