let express = require('express')
let app = express()
let url = require('url')
//require('@google-cloud/debug-agent').start();

let min = 0.0
let max = 0.0
let mean = 0.0
let median = 0.0
arrayValuesofHeartRates = []

app.set('view engine', 'ejs')

app.get('/addData', (req, res) => {
    arrayValuesofHeartRates.push(req.query.heartRate)
    console.log(arrayValuesofHeartRates)
    min = Math.min(...arrayValuesofHeartRates)
    max = Math.max(...arrayValuesofHeartRates)
    let sum = 0.0;
    for(let i = 0; i< arrayValuesofHeartRates.length; i++){
        sum += +arrayValuesofHeartRates[i]
    }
    mean = sum / arrayValuesofHeartRates.length
    let newArray = [...arrayValuesofHeartRates.sort((a, b) => a - b)]
    let lowMiddle = Math.floor((arrayValuesofHeartRates.length - 1) / 2)
    let highMiddle = Math.ceil((arrayValuesofHeartRates.length - 1) / 2)
    median = (+newArray[lowMiddle] + +newArray[highMiddle]) / 2
    res.send("Added Successfully")
})

app.get('/statistics', (req, res) => {
    res.render('myview.ejs', {min: min, max : max, mean: mean, median: median})
    
})


let port = process.env.PORT || 8090
app.listen(port, () => console.log(`Example app listening on port ${port}!`))