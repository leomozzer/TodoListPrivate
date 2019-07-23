const {firebaseCredentials} = require('../credentials/credentials')
const uniqid = require('uniqid')

module.exports = {
    async newTodo(req, res){
        return await firebaseCredentials.database().ref(`leomozzer/open/${uniqid.time()}`).update()
    }
}