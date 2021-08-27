const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const ejs=require("ejs")
const { MongoCredentials } = require("mongodb")
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.set("view engine","ejs");
mongoose.connect("mongodb+srv://Aman:Chaikidukan1@cluster0.kwlnx.mongodb.net/wikiDB?retryWrites=true&w=majority");
const articleSchema=
{
    title:String,
    content:String
};
const article=mongoose.model('article',articleSchema);
//////////////////////////////////////////////// Request Targeting ALl Articles //////////////////////////////////////////////////////////////////
app.route("/articles")
.get(function(req,res)
{
    article.find(function(err,foundItems)
    {
       if(err)
       {
        console.log("error found");
       }
       else
       {
         res.send(foundItems);
       }
    });
})
    
    .post(function(req,res)
    {
        const newarticle =new article
        ({
            title:req.body.title,
            content:req.body.content
        });
        newarticle.save(function(err)
        {
            if(!err)
            {
                res.send("New Article Added Successfully");
            }
        else
        {
            res.send(err);
        }
        });
    })
        .delete(function(req,res)
        {
            article.deleteMany(function(err)
            {
                if(err)
                {
                    res.send("error,delete command failed to process");
                }
                else
                {
                    res.send("All Articles Have Been deleted");
                }
                
            });
        })
   //////////////////////////////////////////////// Request Targeting Selected Article //////////////////////////////////////////////////////////////////
app.route("/articles/:articleTitle")
.get(function(req,res)
{ 
    article.findOne({title:req.params.articleTitle},function(err,foundItems)
    {
       if(err)
       {
        console.log("error found");
       }
       else
       {
         res.send(foundItems);
       }
    });
})
.post(function(req,res)
{
    const newarticle =new article
    ({
        title:req.body.title,
        content:req.body.content
    });
    newarticle.save(function(err)
    {
        if(!err)
        {
            res.send("New Article Added Successfully");
        }
    else
    {
        res.send(err);
    }
    });
})
.delete(function(req,res)
{
    article.deleteOne({title:req.params.articleTitle},function(err)
    {
        if(err)
        {
            res.send("error,delete command failed to process");
        }
        else
        {
            res.send(" Article Has Been deleted");
        }
        
    });
})
.put(function(req,res)
{
    article.updateOne({title:req.params.articleTitle},{title:req.body.title,content:req.body.content},{overwrite:true},function(err)
    {
        if(!err)
        {
            res.send("Successfully Updated Article");
        }
    else
    {
        res.send("No Article was found with this matching title");
    }
    })
}) 
.patch(function(req,res)
{
  article.find({title:req.params.articleTitle},{$set:req.body},function(err)
  {
      if(!err)
      {
          res.send("article updated successfully");
      }
      else
      {
          res.send(err);
      }
    })  
})        
app.listen(3000,function()
{
    console.log("server started at port 3000");

});