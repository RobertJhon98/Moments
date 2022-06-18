const Moment = require('../Models/Moment')
const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const path = require('path')
exports.createNewMoment = async(req,res) => {
    try {
        const {title,tags} = req.body
        const photoUrl = req.file.filename

        const newMoment = new Moment({title,photoUrl,tags:JSON.parse(tags),user_id : req.user._id})
        await newMoment.save()
        res.json({success : true, newMoment})
    } catch (error) {
        console.error({error})
        res.status(500).json({error})
    }
}

exports.getMomemts = async(req,res) => {
    try {
        const moments = await Moment.find({user_id : req.user._id});
        res.json({moments})
    } catch (error) {
        console.error({error})
        res.status(500).json({error})
    }
}

exports.deleteMoment = async(req,res) => {
    try {
        await Moment.deleteOne({_id : req.body._id});
        res.json({success : true})
    } catch (error) {
        console.error({error})
        res.status(500).json({error})
    }
}


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

exports.upload = multer({ storage, fileFilter });