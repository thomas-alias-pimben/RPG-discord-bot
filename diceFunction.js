
const DICE = 10;

module.exports.jetDe = () => {
    return Math.floor(Math.random()*DICE+1)
}

module.exports.jetCritique = ()=> {
    return Math.floor(Math.random()*6+1)
}

module.exports.DICE = DICE;