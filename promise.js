function getData() {
    const somePromise = new Promise((resolve, reject) => {

        setTimeout(() => {
            try {
                x = "I am a data"
                resolve(x)
            } catch (error) {
                reject(error)
            }

        }, 2000);
    })
    return somePromise
}

getData().then(data => {
    console.log(data);
    
}).catch(error => {
    console.log(error);
    
})

//iffie function Self-Invoking Functions(it will be called itself)
//with async await i cannot know the error because i dont have catch
// (async() => {
//     let something = await getData()
//     console.log(something);
// })()

//but when we use a normal function we need to use async await
//and then call the function
// async function normalFunction(){
//     let something = await getData()
//     console.log(something);
// }

// normalFunction()