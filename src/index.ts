import express from "express"
const app = express()
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/embed", (req,res) => {
    
})
app.listen(process.env.PORT || 3000, () => {
    console.log("Im up bucko")
})