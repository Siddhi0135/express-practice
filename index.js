// //creating an HTTP server

const express = require("express");
const app = express();

// // function sum(n){
// //     let ans=0;
// //     for(let i=0; i<=n; i++){
// //         ans=ans+i;
// //     }
// //     return ans;
// // }

// // app.get("/", function(req,res){
// //     res.send("Hi there!");
// //     const num = req.query.n; // it is used for query parameters where .n is the input

// //     const ans = sum(num);
// //     res.send("Hi there your answer is:" + ans);
    
    
// // })


// // (req, res)=> request and response.
// app.get("/", function(req, res){

// })

// app.listen(3000);


var user = {
    name:"John",
    kidneys: [{
        healthy:false
    }]
}

var users = [{
    name:"John",
    kidneys: [{
        healthy:false
    }]
}];

app.use(express.json());

app.get("/", function(req, res){
    //query parameters are used in the get request
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    const numberOfHealthyKidneys = 0;
    //learn about filter in js
    for(let i=0; i<johnKidneys.length; i++){
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys = numberOfHealthyKidneys+1;
        }
    }

    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

app.post("/", function(req, res){
    //It is send in the body
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "DONE!"
    })
})

app.put("/", function(req, res){
    for(let i=0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})

//removing all the unhealthy kidneys
app.delete("/", function(req, res){
    // you should return a 411
    // only if atleast one unhealthy kidney is there do this, else return 411
    if(isThereAtLeastOneUnhealthy()){
        const newKidneys = [];
    for(let i=0; i<users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy){
            newKidneys.push({
                healthy: true
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({
        msg: "DONE"
    })
    }
    else{
        res.sendStatus(411).json({
            msg: "You have no bad kidneys"
        });
    }
})

function isThereAtLeastOneUnhealthy(){
    let atLeastOneUnhealthyKidney = false;
    for(let i=0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            atLeastOneUnhealthyKidney = true;
        }
    }
    return atLeastOneUnhealthyKidney;
}

app.listen(3000);