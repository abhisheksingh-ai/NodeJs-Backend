const sessionIdToUserMap = new Map();

function setUser(id, user) {
    return sessionIdToUserMap.set(id, user); //mapping done in diary
}

function getUser(id) {
    return sessionIdToUserMap.get(id); // we will get the user
}

module.exports = {
    setUser,
    getUser
}