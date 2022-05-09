var fetch = require("node-fetch");
var express = require('express');
var app = express();
const cors = require("cors");

const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.get('/getgallery/:page', async function (req, res) {

    const page = req.params.page;
   
    try {
        const rawData = await fetch(`https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=9491cf7e43d79ca01a1c329205185c75&gallery_id=72157719421354859&per_page=12&page=${page}&format=json&nojsoncallback=1`);
        const data = await rawData.json();
        const photos = data.photos.photo.map(photo => {
            return {
                title: photo.title,
                url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
            }
        });

        // To simulate slow load
        await new Promise(resolve => setTimeout(resolve, 3000));

        return res.send(photos);
    } catch(error) {
        res.status(500);
    }
})

var server = app.listen(8081, function () {
   var port = server.address().port
   console.log("listening to port:", port)
})