const handleSignIn = (req, res, postgres, bcrypt) => {
    const {email, password} = req.body;
    if(!email || !password)
        return res.status(400).json('Invalid Credentials Entered')

    postgres.select('email', 'hash').from('login')
    .where("email", "=", email)
        .then(user => {
            const isValid = bcrypt.compareSync(password, user[0].hash);

            if(isValid){
                return postgres.select('*').from('users')
                .where("email", "=", email)
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json('Unable to Retrive User'));
            }
            else
                res.status(400).json('Wrong Credentials');
        })
        .catch(err => res.status(400).json('An Error Occurred'));
}

module.exports = {
    handleSignIn: handleSignIn
}