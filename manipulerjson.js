const fs = require("fs");

function gererPersoJSON() {
  const modules = {};
  const controllerPath = require("path").join(__dirname, "perso");

  require("fs")
    .readdirSync(controllerPath)
    .forEach((file) => {
      const name = file.replace(/\.js$/, "").replace(".json", "");
      modules[name] = require(`./perso/${file}`);
    });

  return modules;
}

//config =require('./sourcePerso/perso.json');
config = gererPersoJSON();
configPNJ = require("./sourcePerso/PNJ.json");

configautre = require("./sourcePerso/autre.json");

function avoirKey(element) {
  let objectToInspect;
  let donnees = [];

  for (
    objectToInspect = element;
    objectToInspect !== null;
    objectToInspect = Object.getPrototypeOf(objectToInspect)
  ) {
    donnees = donnees.concat(Object.keys(objectToInspect));
  }
  return donnees;
}

function cherchePerso(idJoueur) {
  let donnees = "persoTest";
  for (
    objectToInspect = config;
    objectToInspect !== null;
    objectToInspect = Object.getPrototypeOf(objectToInspect)
  ) {
    perso = Object.keys(objectToInspect);

    perso.forEach((element) => {
      //console.log(""+config[element]["id"]);
      if (config[element]["id"] == idJoueur) {
        donnees = element;
      }
    });
  }
  return donnees;
}

function hasSpaceFirst(message) {
  return message[0] === " ";
}

function getPersoAllAttributs(idJoueur, message) {
  let spaceFirst = hasSpaceFirst(message);
  perso = cherchePerso(idJoueur);
  retour = config[perso]["attribut"].flatMap((element) => {
    return Object.keys(element)
      .map((e) => {
        if (spaceFirst) return " " + e;
        else return e;
      })
      .filter((string) => {
        if (string.includes(message)) {
          return true;
        }
      });
  });

  return retour.slice(0, 25);
}

function getPersoAllPNJ(message) {
  let spaceFirst = hasSpaceFirst(message);
  let pnj = configPNJ.principale;
  let retour = Object.keys(configPNJ[pnj]["attribut"])
    .map((e) => {
      if (spaceFirst) return " " + e;
      else return e;
    })
    .filter((string) => {
      if (string.includes(message)) {
        return true;
      }
    });

  return retour.slice(0, 25);
}

function getPrincipale() {
  return configPNJ.principale;
}

function getAllPNJ(message) {
  let spaceFirst = hasSpaceFirst(message);
  let pnj = configPNJ.principale;
  let retour = Object.keys(configPNJ)
    .map((e) => {
      if (spaceFirst) return " " + e;
      else return e;
    })
    .filter((string) => {
      if (string.includes(message)) {
        return true;
      }
    });
  retour = retour.filter((e) => {
    return !e.includes("principale");
  });

  return retour.slice(0, 25);
}

function afficherPersoNom(nom) {
  let userId = config[nom]["id"];
  return afficherPerso(userId);
}

/* modifier PV/PS */
function affPv(userId) {
  perso = cherchePerso(userId);
  let retour = "\n\n";

  retour +=
    "PV : " +
    config[perso]["pv"][0].PV +
    " / " +
    Object.values(config[perso]["attribut"][0])[0] +
    "\n";
  retour +=
    "PS : " +
    config[perso]["pv"][0].PS +
    " / " +
    Object.values(config[perso]["attribut"][0])[1] +
    "\n";

  retour += "\n";

  retour += "\n";
  return retour;
}

function ajouterPv(userId, pv) {
  perso = cherchePerso(userId);

  config[perso]["pv"][0].PV = config[perso]["pv"][0].PV + pv;

  ecrireConfig();
}

function ajouterPs(userId, ps) {
  perso = cherchePerso(userId);

  config[perso]["pv"][0].PS = config[perso]["pv"][0].PS + ps;

  ecrireConfig();
}

function restaurerPv(userId) {
  perso = cherchePerso(userId);

  config[perso]["pv"][0].PV = Object.values(config[perso]["attribut"][0])[0];

  ecrireConfig();
}

function restaurerPs(userId) {
  perso = cherchePerso(userId);

  config[perso]["pv"][0].PS = Object.values(config[perso]["attribut"][0])[1];

  ecrireConfig();
}

function modifierPv(userId, pv) {
  perso = cherchePerso(userId);

  config[perso]["pv"][0].PV = pv;

  ecrireConfig();
}

function modifierPs(userId, ps) {
  perso = cherchePerso(userId);

  config[perso]["pv"][0].PS = ps;

  ecrireConfig();
}

/* modifier XP */

function modifierXP(userId, xp) {
  perso = cherchePerso(userId);

  config[perso]["xp"] = xp;

  ecrireConfig();
}

function ajouterXP(userId, xp) {
  perso = cherchePerso(userId);

  config[perso]["xp"] = config[perso]["xp"] + xp;

  ecrireConfig();
}

function getxp(userId) {
  perso = cherchePerso(userId);

  return config[perso]["xp"];
}

/* modifier verse */

function modifierverse(userId, verse) {
  perso = cherchePerso(userId);

  config[perso]["verse"] = verse;

  ecrireConfig();
}

function ajouterverse(userId, verse) {
  perso = cherchePerso(userId);

  config[perso]["verse"] = config[perso]["verse"] + verse;

  ecrireConfig();
}

function getverse(userId) {
  perso = cherchePerso(userId);

  return config[perso]["verse"];
}

function afficherPlusieursPartie(stringPerso) {
  if (stringPerso.length <= 2000) {
    return [stringPerso];
  } else {
    let perso1stPart = stringPerso.substring(0, 1997);
    const perso1stPartSplitBackSlash = perso1stPart.split("\n");
    const beforeBackSlash =
      perso1stPartSplitBackSlash[perso1stPartSplitBackSlash.length - 1];
    perso1stPart = perso1stPart.substring(
      0,
      perso1stPart.length - beforeBackSlash.length,
    );
    let perso2stPart = stringPerso.substring(1997);

    perso2stPart = beforeBackSlash + perso2stPart;

    return [perso1stPart].concat(afficherPlusieursPartie(perso2stPart));
  }
}

function afficherPerso(userId) {
  perso = cherchePerso(userId);
  let objectToInspect;
  let donnees = [];

  for (
    objectToInspect = config[perso];
    objectToInspect !== null;
    objectToInspect = Object.getPrototypeOf(objectToInspect)
  ) {
    donnees = donnees.concat(Object.keys(objectToInspect));
  }
  //console.log(resultat+'');

  /* mise en page */
  var resultat = "";

  donnees.forEach((att) => {
    if (att !== "id" && att !== "idChannel" && att !== "musique") {
      if (att === "attribut") {
        resultat += affAttribut(userId);
      } else if (att === "magie") {
        resultat += affMagie(userId);
      } else if (att === "pv") {
        resultat += affPv(userId);
      } else {
        resultat += att + " : " + config[perso][att] + "\n";
      }
    }
  });

  //console.log(resultat);
  return resultat;
}

/* pour les attribut*/

function affAttribut(userId) {
  perso = cherchePerso(userId);
  let retour = "\n\nATTRIBUT :\n\n";
  config[perso]["attribut"].forEach((element) => {
    clef = avoirKey(element);

    clef.forEach((key) => {
      retour += "" + key + " : " + element[key] + "\n";
    });
    retour += "\n";
  });
  retour += "\n";
  return retour;
}

function affMagie(userId) {
  perso = cherchePerso(userId);
  let retour = "\n\nMAGIE :\n\n";

  let objectToInspect;
  let clef = [];

  for (
    objectToInspect = config[perso]["magie"];
    objectToInspect !== null;
    objectToInspect = Object.getPrototypeOf(objectToInspect)
  ) {
    clef = clef.concat(Object.keys(objectToInspect));
  }

  clef.forEach((attSocial) => {
    retour += attSocial + " :\n\n";
    config[perso]["magie"][attSocial].forEach((element) => {
      clef = avoirKey(element);

      clef.forEach((key) => {
        retour += "" + key + " : " + element[key] + "\n";
      });
      retour += "\n";
    });
  });

  retour += "\n";
  return retour;
}

function valeurAttribut(userId, attribut) {
  perso = cherchePerso(userId);

  let retour;
  if (config[perso] !== undefined) {
    config[perso]["attribut"].forEach((element) => {
      let clef = avoirKey(element);

      clef.forEach((key) => {
        if (key === attribut) {
          retour = element[key];
        }
      });
    });
    return retour;
  }
  return undefined;
}

/*    pour les CHANNEL */

function tableauChannel() {
  return Object.keys(config);
}

function getIdChannel(perso) {
  let idChannel = config[perso]["idChannel"];
  return idChannel;
}

function chercheChanel(idChannel) {
  let donnees = "persoTest";
  for (
    objectToInspect = config;
    objectToInspect !== null;
    objectToInspect = Object.getPrototypeOf(objectToInspect)
  ) {
    perso = Object.keys(objectToInspect);

    perso.forEach((element) => {
      //console.log("***idchannel : "+idChannel);
      if (config[element]["idChannel"] == idChannel) {
        donnees = element;
      }
    });
  }
  return donnees;
}

/* VOCAL*/

function chercheMusiqueVocal(userId) {
  let idChannel = "";
  if (config[cherchePerso(userId)]) {
    idChannel = config[cherchePerso(userId)]["musique"];
  }

  return idChannel;
}

/* COMMANDE SERVEUR*/

function modifBonus(bonus) {
  if (bonus[0] !== "") {
    configautre.bonusPNJ[0] = parseInt(bonus[0], 10);
  }

  if (bonus[1] !== "") {
    configautre.bonusPNJ[1] = parseInt(bonus[1], 10);
  }

  if (bonus[2] !== "") {
    configautre.bonusPNJ[2] = parseInt(bonus[2], 10);
  }

  if (bonus[3] !== "") {
    configautre.bonusPNJ[3] = parseInt(bonus[3], 10);
  }

  if (bonus[4] !== "") {
    configautre.bonusPNJ[4] = parseInt(bonus[4], 10);
  }

  fs.writeFileSync(
    "./sourcePerso/autre.json",
    JSON.stringify(configautre, null, 4),
  );
}
function valeurBonus(bonus) {
  return configautre.bonusPNJ[parseInt(bonus)];
}

function modifAtt(perso, att, modif, nombre) {
  console.log(perso + " " + att + " " + modif);

  //le bonus
  let bonus = 0;

  if (modif == "+1") {
    bonus = +1;
  } else if (modif == "-1") {
    bonus = -1;
  } else {
    bonus = parseInt(nombre);
  }

  //on modifie
  let tmp = 0;
  config[perso]["attribut"].forEach((element) => {
    clef = avoirKey(element);

    clef.forEach((key) => {
      if (key == att) {
        //console.log(config[perso]["attribut"][tmp][att]);
        if (modif == "+1" || modif == "-1") {
          config[perso]["attribut"][tmp][att] =
            config[perso]["attribut"][tmp][att] + bonus;
        } else {
          if (!isNaN(bonus)) {
            config[perso]["attribut"][tmp][att] = bonus;
          }
        }
      }
    });
    tmp++;
  });

  ecrireConfig();
}

function creerPNJ(perso) {
  if (configPNJ[perso.nom] == undefined) {
    delete perso["valider"];
    objperso = creerObjPerso(perso);

    configPNJ[perso.nom] = objperso;

    fs.writeFileSync(
      "./sourcePerso/PNJ.json",
      JSON.stringify(configPNJ, null, 4),
    );
  } else {
    console.log("perso déjà crée");
  }
}

function changerPNJ(perso) {
  delete perso["valider"];
  objperso = creerObjPerso(perso);
  configPNJ[perso.nom] = objperso;
  fs.writeFileSync(
    "./sourcePerso/PNJ.json",
    JSON.stringify(configPNJ, null, 4),
  );
}

function changePNJPrincipale(pnj) {
  configPNJ.principale = pnj;
  fs.writeFileSync(
    "./sourcePerso/PNJ.json",
    JSON.stringify(configPNJ, null, 4),
  );
}

function manipPNJ(perso) {
  if (perso.PNJ !== undefined) {
    configPNJ.principale = perso.PNJ;
  }
  if (perso.change !== undefined) {
    console.log("change");
  }
  if (perso.supp !== undefined) {
    delete configPNJ[perso.supp];
  }
  fs.writeFileSync(
    "./sourcePerso/PNJ.json",
    JSON.stringify(configPNJ, null, 4),
  );
  //console.log(configPNJ.principale)
  return true;
}

function valeurAttributPNJ(attribut, pnj) {
  if (pnj === null) {
    pnj = configPNJ.principale;
  }

  let retour;
  if (configPNJ[pnj] !== undefined) {
    return configPNJ[pnj]["attribut"][attribut];
  }
  return undefined;
}

function creerObjPerso(perso) {
  objPerso = {};
  objPerso["attribut"] = {};
  objPerso["magie"] = {};
  Object.keys(perso).forEach((element) => {
    if (element == "nom") {
      objPerso[element] = perso[element];
    } else if (
      element == "nommagie1" ||
      element == "nommagie2" ||
      element == "nbmagie1" ||
      element == "nbmagie2"
    ) {
      console.log("nop " + element);
    } else {
      if (perso[element] === "") {
        objPerso["attribut"][element] = "5";
      } else {
        objPerso["attribut"][element] = perso[element];
      }
    }

    //partie pour les magies
    objPerso["magie"][perso["nommagie1"]] = perso["nbmagie1"];
    objPerso["magie"][perso["nommagie2"]] = perso["nbmagie2"];
  });

  return objPerso;
}

function ecrireConfig() {
  fs.writeFileSync("./sourcePerso/perso.json", JSON.stringify(config, null, 4));
  for (const [key, value] of Object.entries(config)) {
    //console.log(`${key}: ${value}`);
    fs.writeFileSync(
      "./perso/" + key + ".json",
      JSON.stringify(value, null, 4),
    );
  }
}

//méthode à importer
module.exports.config = config;
module.exports.configautre = configautre;
module.exports.configPNJ = configPNJ;
module.exports.avoirKey = avoirKey;
module.exports.valeurAttribut = valeurAttribut;
module.exports.afficherPerso = afficherPerso;
module.exports.affAttribut = affAttribut;
module.exports.affSocial = affMagie;
module.exports.afficherPersoNom = afficherPersoNom;
module.exports.ajouterPv = ajouterPv;
module.exports.ajouterPs = ajouterPs;
module.exports.affPv = affPv;
module.exports.restaurerPv = restaurerPv;
module.exports.restaurerPs = restaurerPs;
module.exports.modifierPv = modifierPv;
module.exports.modifierPs = modifierPs;
module.exports.tableauChannel = tableauChannel;
module.exports.getIdChannel = getIdChannel;
module.exports.chercheChanel = chercheChanel;
module.exports.chercheMusiqueVocal = chercheMusiqueVocal;
module.exports.cherchePerso = cherchePerso;
module.exports.modifierXP = modifierXP;
module.exports.ajouterXP = ajouterXP;
module.exports.getxp = getxp;
module.exports.modifierverse = modifierverse;
module.exports.ajouterverse = ajouterverse;
module.exports.getverse = getverse;
module.exports.modifBonus = modifBonus;
module.exports.valeurBonus = valeurBonus;
module.exports.modifAtt = modifAtt;
module.exports.creerPNJ = creerPNJ;
module.exports.changerPNJ = changerPNJ;
module.exports.manipPNJ = manipPNJ;
module.exports.valeurAttributPNJ = valeurAttributPNJ;
module.exports.getPersoAllPNJ = getPersoAllPNJ;
module.exports.afficherPlusieursPartie = afficherPlusieursPartie;
module.exports.getPersoAllAttributs = getPersoAllAttributs;
module.exports.changePNJPrincipale = changePNJPrincipale;
module.exports.getAllPNJ = getAllPNJ;
module.exports.getPricipale = getPrincipale;
