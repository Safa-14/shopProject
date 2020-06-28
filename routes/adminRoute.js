const express = require('express');
const dataModule = require('../modules/dataModule');


const adminRouter = express.Router()


adminRouter.get('/addbook', (req, res) => {
    res.render('addBooks');

});

adminRouter.post('/addbook', (req, res) => {
    //console.log(req.body);
    //console.log(req.files);
    //console.log(Object.keys(req.files));

    if (req.files) {
        const bookTitle = req.body.bookTitle
        const bookDescription = req.body.bookDescription
        const bookPdf = req.files.bookPdf
        if (bookTitle && bookDescription && bookPdf && Object.keys(req.files).length > 1) {
            const imgs = []
            for (const key in req.files) {
                if (req.files[key].mimetype != 'application/pdf') {
                    imgs.push(req.files[key])

                }
            }
            dataModule.addBook(bookTitle, bookDescription, bookPdf, imgs).then(() => {
                res.json(1)
            }).catch (error => {
                if (error == 3) {
                    res.json(3)
                }
            })
        } else {
            res.json(2)
        }
    } else {
        res.json(2)
    }


});
module.exports = adminRouter