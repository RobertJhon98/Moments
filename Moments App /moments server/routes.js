const { authUser } = require("./Services/authUser")
const { createNewMoment, upload, getMomemts, deleteMoment } = require("./Services/moments.service")
const { signUpUser, signIn, getUser } = require("./Services/user.service")

module.exports = (app) => {
    app.post('/signup',signUpUser)
    app.post('/signin',signIn)
    app.post('/newMoment',authUser,upload.single('photo'),createNewMoment)
    app.get('/getMoments',authUser,getMomemts)
    app.post('/delete_moment',authUser,deleteMoment)
    app.get('/user',authUser,getUser)
}