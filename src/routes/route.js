const express = require("express")
const router = express.Router()
const urlController = require('../controller/urlController')


router.post('/url/shorten', urlController.createShortUrl)
router.get('/:urlCode', urlController.getUrl)
router.all('*', (req, res) => {res.status(404).send({status : false, message:"Page Not Found !!"})})





module.exports=router
