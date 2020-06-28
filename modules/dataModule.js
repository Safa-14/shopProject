const fs = require('fs')

function registerUser(email, password) {
    //the code here
    //read users.json and convert it to object
    return new Promise((resolve, reject) => {
        const readData = fs.readFileSync('./users.json')
        console.log(readData);
        const data = JSON.parse(readData)

        //check user email is exist or not using es6 find array method
        const existUser = data.users.find(user => user.email == email)
        if (existUser) {
            reject('exist')
        } else {
            data.users.push({
                id: data.newId,
                email: email,
                password: password
            })
            //increase the newid property for data to be used for next regiestered user
            data.newId++
            //convert data to json and write it in users.json
            fs.writeFileSync('./users.json', JSON.stringify(data))
            resolve()
        }
    })
}

function addBook(bookTitle, bookDescription, bookPdf, bookImgs) {
    //image files name pattern
    //start with save images files

    return new Promise((resolve, reject) => {
        //check if book title is not exist for this user
        //read books.json
        const booksJson = fs.readFileSync('./books.json')
        //convert the read file to object
        const booksObj = JSON.parse(booksJson)

        const existBook = booksObj.books.find(book => book.title == bookTitle && book.userId == 1)


        if (existBook) {
            reject(3)


        } else {
            //array will contain the url of images to be saved in the books.json
            const imgsArr = []
            //save the images in uploadedfolder and set the new name pattern
            bookImgs.forEach((img, idx) => {
                // get image extenstion
                let ext = img.name.substr(img.name.lastIndexOf('.'))
                //set the new image name
                let newName = bookTitle.trim().replace(/ /g, '_') + '_' + 1 + "_" + idx + ext
                img.mv('./public/uploadedFiles/' + newName)
                imgsArr.push('/uploadedFiles/' + newName)
            });

            //set a new pdf file name
            let pdfName = bookTitle.trim().replace(/ /g, '_') + '_' + 1 + "_" + '.pdf'
            //move the pdf file with the new name to uploadedfiles folder
            bookPdf.mv('./public/uploadedFiles/' + pdfName)
            //set the pdf url that gonna be saved in the json file
            let pdfNewUrl = '/uploadedFiles/' + pdfName



            //add the new book to books.json
            booksObj.books.push({
                id: booksObj.newId,
                title: bookTitle.trim(),
                description: bookDescription,
                imgs: imgsArr,
                pdfUrl: pdfNewUrl,
                userId: 1
            })
            //increase the newId by one for the next book
            booksObj.newId++
            //save the booksObj to books.json
            fs.writeFileSync('./books.json', JSON.stringify(booksObj))
            resolve()
        }




    })

}

function getAllBooks() {
    return new Promise((resolve, reject) => {
        //read file to json
        const booksJson = fs.readFileSync('./books.json') //to write the meals.json file
        /* Just send the file */
        const booksObj = JSON.parse(booksJson);
        //export the object using resolve to be used on then hand
        resolve(booksObj.books)
    })
}


module.exports = {
    registerUser,
    addBook,
    getAllBooks
}