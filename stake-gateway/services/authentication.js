const signUp = (req, res) => {
    console.log(req);
    res.send();
}

const signIn = (req, res) => {
    console.log(req.body);
    res.send();
}

module.exports = {
    signUp: signUp,
    signIn: signIn,
}
