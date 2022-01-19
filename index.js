var express = require('express');
var app = express();
const shortid = require("shortid");
const validUrl = require("valid-url");

const Url = require("./mongomodel/url");
const config = require("config");
const dbutil = require("./config/db")

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.json({}));
// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('convert');
});

app.post('/shorton',async (req,res)=>{
    console.log(req.originalUrl)
    const longUrl = req.body.longUrl;
    const baseUrl = config.get("baseURL");
    console.log("base url " + baseUrl + "   " + longUrl);
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json("Internal error. Please come back later.");
    }

    const urlCode = shortid.generate();

    if(validUrl.isUri(longUrl)){

        try{
            var url = await Url.findOne({longUrl : longUrl});
            console.log(url);
            if(url){
                return  res.status(200).send({msg:"Success",url});
            }else{

                const shortUrl = baseUrl + "/" + urlCode;
                url  = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    clickCount: 0
                });
                
                await url.save()
                return res.status(201).send({msg:"Success",url});
            }
        }catch(err){
            console.error(err.message);
            return res.status(500).send({msg:"Failed",data:`Internal Server error ${err.message}`});
        }
    }else{
        res.status(400).send({msg:"Failed",data:"Invalid URL. Please enter a valid url for shortening."});
    }    
})




app.get('/v/:shortUrl', async (req, res) => {
    console.log(req.params)
    var shortUrlCode = req.params.shortUrl;
    var url = await Url.findOne({ urlCode: shortUrlCode });

    try {
        if (url) {
            var clickCount = url.clickCount;
            if(clickCount >= config.allowedClick){
                console.log("The click count for shortcode " + shortUrlCode + " has passed the limit of " + config.allowedClick);
                return  res.render("error")
            }
            clickCount++;
            await url.update({ clickCount });
            return res.redirect(url.longUrl);
        } else {
            return res.status(400).json("The short url doesn't exists in our system.");
        }
    }
    catch (err) {
        console.error("Error while retrieving long url for shorturlcode " + shortUrlCode);
        return res.status(500).json("There is some internal error.");
    }
})

const PORT =8600

dbutil.connectToServer(function(err){
    if(err){
        console.log("Mongo db error " + err);
    }else{
        
        app.listen(PORT,()=>{
            console.log(`Server started on port ${PORT}`);
        });
        
    }
})

