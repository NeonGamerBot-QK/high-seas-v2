import express from "express";
import session from "express-session";
import { getReqId, validateReq } from "./req";
import { sendEmail } from "./shipmentviewer";
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(
  session({
    secret:
      process.env.SESSION_SECRET || Math.random().toString(36).substring(2),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/better-wonderdome", (req, res) => {
  res.render("embed", {
    title: "Better Wonderdome",
    url: `https://wonderdome.r58playz.dev/`,
  });
});
// app.get('/embed-shipmentviewer', (req, res) => {
//     res.render("embed", {
//         title: "Shipment viewer",
//         url: `https://shipment-viewer.hackclub.com/`
//     })
// })
app.get("/embed-leaderboard", (req, res) => {
  res.render("embed", {
    title: "Leaderboard",
    url: `https://doubloons.cyteon.hackclub.app/`,
  });
});
app.get("/shipment-viewer", (req, res) => {
  res.render("shipment-viewer", {
    title: "Shipment viewer",
    req_id: getReqId(),
  });
});
app.get("/api/shipmentviewer", async (req, res) => {
  const email = req.query.email;
  const sig = req.query.sig;
  if (!email || !sig) {
    res
      .status(400)
      .send({ error: "No email or sig provided", new_code: getReqId() });
    return;
  }
  // just make the req :3
  fetch(
    `https://shipment-viewer.hackclub.com/dyn/jason/${email}?email=${encodeURIComponent(email as string)}&signature=${sig}`,
  )
    .then((r) => r.json())
    .then((j) => res.json(j));
});
app.post("/shipment/sendemail", validateReq, async (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(400).send({ error: "No email provided", new_code: getReqId() });
    return;
  }
  sendEmail(email).then((r) => {
    if (r.error) res.status(500).send({ error: r.error, new_code: getReqId() });
    else res.send({ error: null, new_code: getReqId() });
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Im up bucko");
});
