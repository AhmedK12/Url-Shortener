const urlModel = require('../models/urlModel');
const validUrl = require('valid-url');
const shortId = require('shortid');
const validation = require('../validation/validate')

const createShortUrl = async function (req, res) {
    try {
        let url = req.body.longUrl
        if (!validation.isValid(url)) return res.status(400).send({ status: false, msg: 'url cannot be empty' })
        if (!validUrl.isUri(url.toString())) {
            return res.status(400).send({ status: false, msg: "enter valid url" })
        }
        
        

        let urlcheck = await urlModel.findOne({ longUrl: url }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0 })
        if (urlcheck) return res.status(200).send({ status: true, data: urlcheck })







        let urlCode = shortId.generate();


        // while(true){
        //     urlCode = shortId.generate();

        //     if(! await urlModel.findOne({urlCode:urlCode})){
        //         break;
        //     }
        // }

        













        req.body.urlCode = urlCode
        let shortUrl = "http://localhost:3000/" + urlCode

        req.body.shortUrl = shortUrl

        let createdShortUrl = await urlModel.create(req.body)
        let { createdAt, updatedAt, __v, _id, ...result } = createdShortUrl._doc

        return res.status(201).send({ status: true, data: result })

    }

    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

const getUrl = async function (req, res) {
    try {

        let reqParams = req.params.urlCode
        if(!validation.isValid(reqParams)) return res.status(400).send({ status: false, msg: 'Url code cannot be blank' }) 
        let findUrlCode = await urlModel.findOne({ urlCode: reqParams }).select({ longUrl: 1, _id: 0 })
        if(findUrlCode == null) return res.status(400).send({ status: false, msg: 'Url not found' })
        return res.status(302).redirect(findUrlCode.longUrl)
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }

}

module.exports = { createShortUrl, getUrl }