import express from "express"
import session from "express-session"
import { getReqId, validateReq } from "./req"
import { sendEmail } from "./shipmentviewer"
const app = express()
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', 'src/views')
app.use(session({
    secret: process.env.SESSION_SECRET || Math.random().toString(36).substring(2),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/better-wonderdome", (req,res) => {
    res.render("embed", {
        title: "Better Wonderdome",
        url: `https://wonderdome.r58playz.dev/`
    })
})
// app.get('/embed-shipmentviewer', (req, res) => {
//     res.render("embed", {
//         title: "Shipment viewer",
//         url: `https://shipment-viewer.hackclub.com/`
//     })
// })
app.get('/embed-leaderboard', (req, res) => {
    res.render("embed", {
        title: "Leaderboard",
        url: `https://doubloons.cyteon.hackclub.app/`
    })
})
app.get('/shipment-viewer', (req,res) => {
    res.render('shipment-viewer', {
        title: "Shipment viewer",
        req_id: getReqId()
    })
})
app.post('/shipment/sendemail',validateReq, async (req,res) => {
    const email = req.body.email 
    sendEmail(email).then(r => {
        if(r.error) res.status(500).send(r.error)
        else res.send("ok")
    })
})
app.listen(process.env.PORT || 3000, () => {
    console.log("Im up bucko")
})