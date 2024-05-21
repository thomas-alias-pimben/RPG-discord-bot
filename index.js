let express = require("express");
let app = express();
let bodyparser = require("body-parser");
var session = require("express-session");
const manipjson = require("./utils/manipulerjson");

const { portServer } = require("./config.json");

const botDiscord = require("./bootbot");

app.set("view engine", "ejs");

//middleware
app.use("/assets", express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  session({
    secret: "ersgdsgdsfgf",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

//midleware perso
app.use(require("./middleware/flash"));
joueurs = manipjson.config;
//Route
app.get("/", (request, response) => {
  response.render("page/index", { test: "salut", joueurs });
  //console.log(request.query)
});

app.get("/perso", (request, response) => {
  let perso = new Object();
  perso.config = require("./utils/FonctionServeur");
  perso.personnage = request.query;

  response.render("page/fichePerso", { perso, joueurs });
  //console.log(request.query)
});

app.get("/bonus", (request, response) => {
  manipautre = manipjson.configautre;
  response.render("page/bonus", { manipautre, joueurs });
});

app.get("/creer", (request, response) => {
  response.render("page/creerPNJ", { test: "salut", joueurs });
  //console.log(request.query)
});

app.get("/changer", (request, response) => {
  manipPNJ = {};
  manipPNJ.pnj = manipjson.configPNJ;
  response.render("page/changerPNJ", { manipPNJ, joueurs });
  //console.log(request.query)
});

app.get("/changerPNJ", (request, response) => {
  manipPNJ = {};
  manipPNJ.pnj = manipjson.configPNJ[request.query.perso];
  response.render("page/modifierPNJ", { manipPNJ, joueurs });
  //console.log(request.query)
});

//JEU
app.get("/jeu", (request, response) => {
  response.render("page/jeu", { joueurs });
  //console.log(request.query)
});

//POST
app.post("/", (request, response) => {
  if (request.body.message === undefined || request.body.message === "") {
    request.flash("error", "vous n'avez pas posté de message");
  }
  //console.log(request.body);
  response.redirect("/");
});

app.post("/bonus", (request, response) => {
  //console.log(request.body);
  manipjson.modifBonus(request.body);
  response.redirect("/bonus");
});

app.post("/perso", (request, response) => {
  //console.log(request.body);

  manipjson.modifAtt(
    request.body.perso,
    request.body.att,
    request.body.modif,
    request.body.nombre,
  );
  if (request.body.perso === "" || request.body.perso === undefined) {
    response.redirect("/perso");
  } else {
    response.redirect("/perso?perso=" + request.body.perso);
  }
});

app.post("/creer", (request, response) => {
  if (request.body.nom === undefined || request.body.nom === "") {
    request.flash("error", "vous n'avez pas mis de nom");
  } else {
    manipjson.creerPNJ(request.body);
    request.flash("valid", "PNJ Crée");
  }

  //console.log(request.body);
  response.redirect("/changer");
});

app.post("/modifier", (request, response) => {
  if (request.body.nom === undefined || request.body.nom === "") {
    request.flash("error", "vous n'avez pas mis de nom");
  } else {
    manipjson.changerPNJ(request.body);
    request.flash("valid", "PNJ Crée");
  }

  //console.log(request.body);
  response.redirect("/changer");
});

app.post("/changer", (request, response) => {
  if (request.body.change === undefined) {
    if (!manipjson.manipPNJ(request.body)) {
      request.flash("error", "ça n'as pas marché");
    }
    //console.log(request.body);
    response.redirect("/changer?post");
  } else {
    response.redirect("/changerPNJ?perso=" + request.body.change);
  }
});

//page d'erreur
app.get("/coffee", (req, res) => {
  res
    .status(418)
    .render("page/PageTeaTime", { erreur: "418", type: "I AM A TEAPOT" });
});

app.get("*", (req, res) => {
  res
    .status(404)
    .render("page/PageErreur", { erreur: "404", type: "NOT FOUND" });
});

app.listen(portServer ?? 8000);
