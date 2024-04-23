const fs = require("fs");
let http = require("http");
const { type } = require("os");
let url = require("url");

const {
  config,
  aff,
  avoirKey,
  afficherPerso,
  valeurAttribut,
  affAttribut,
  affSocial,
  afficherPersoNom,
  ajouterPv,
  ajouterPs,
  affPv,
  restaurerPv,
  restaurerPs,
  modifierPv,
  modifierPs,
  tableauChannel,
  getIdChannel,
  chercheChanel,
  cherchePerso,
  chercheMusiqueVocal,
  modifierXP,
  ajouterXP,
  getxp,
  modifierverse,
  ajouterverse,
  getverse,
} = require("../manipulerjson");

let server = http.createServer();

//let config =require('../sourcePerso/perso.json');

/*Object.values(config).forEach(element => {
        console.log(element["nom"]);
    });*/

//console.log(Object.values(config));

server.on("request", (request, response) => {
  response.writeHead(200, {
    "content-type": "text/html; charset=utf-8",
  });
  let query = url.parse(request.url, true).query;

  let name = query.name === undefined ? "anonyme" : query.name;

  fs.readFile("test.html", "utf8", (err, data) => {
    if (err) {
      response.writeHead(404);
      response.end("ce fichier n'existe pas");
    } else {
      response.writeHead(200, {
        "content-type": "text/html; charset=utf-8",
      });

      let fiche = "";
      var resultat = "";

      /*------------------------PARTIE MENU------------------------- */

      resultat +=
        '<nav class="navbar" role="navigation" aria-label="main navigation"> \n';
      resultat += '<div class="navbar-brand"> \n';

      resultat +=
        '  <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"> \n';
      resultat += '    <span aria-hidden="true"></span> \n';
      resultat += '    <span aria-hidden="true"></span> \n';
      resultat += '    <span aria-hidden="true"></span> \n';
      resultat += "  </a> \n";
      resultat += "</div> \n";

      resultat += '<div id="navbarBasicExample" class="navbar-menu"> \n';
      resultat += '  <div class="navbar-start"> \n';
      resultat += '    <a class="navbar-item"> \n';
      resultat += "      Home \n";
      resultat += "    </a> \n";

      resultat += '    <a class="navbar-item"> \n';
      resultat += "      Documentation \n";
      resultat += "    </a> \n";

      resultat += '    <div class="navbar-item has-dropdown is-hoverable"> \n';
      resultat += '      <a class="navbar-link"> \n';
      resultat += "        More \n";
      resultat += "      </a> \n";

      resultat += '      <div class="navbar-dropdown"> \n';
      resultat += '        <a class="navbar-item"> \n';
      resultat += "          About \n";
      resultat += "        </a> \n";
      resultat += '        <a class="navbar-item"> \n';
      resultat += "          Jobs \n";
      resultat += "        </a> \n";
      resultat += '        <a class="navbar-item"> \n';
      resultat += "          Contact \n";
      resultat += "        </a> \n";
      resultat += '        <hr class="navbar-divider"> \n';
      resultat += '        <a class="navbar-item"> \n';
      resultat += "          Report an issue \n";
      resultat += "        </a> \n";
      resultat += "      </div> \n";
      resultat += "    </div> \n";
      resultat += "  </div> \n";

      /*resultat +=  '  <div class="navbar-end"> \n';
            resultat +=  '    <div class="navbar-item"> \n';
            resultat +=  '      <div class="buttons"> \n';
            resultat +=  '        <a class="button is-primary"> \n';
            resultat +=  '          <strong>Sign up</strong> \n';
            resultat +=  '        </a> \n';
            resultat +=  '        <a class="button is-light"> \n';
            resultat +=  '          Log in \n';
            resultat +=  '        </a> \n';
            resultat +=  '      </div> \n';
            resultat +=  '    </div> \n';
            resultat +=  '  </div> \n';*/
      resultat += "</div> \n";
      resultat += "</nav> \n";

      /* ------------------LA FICHE DE PERSONNAGE------------------ */
      resultat += '<div class="column is-half is-offset-one-quarter">';
      Object.values(config).forEach((element) => {
        let objectToInspect;
        let donnees = [];
        for (
          objectToInspect = element;
          objectToInspect !== null;
          objectToInspect = Object.getPrototypeOf(objectToInspect)
        ) {
          donnees = donnees.concat(Object.keys(objectToInspect));
        }
        //console.log(resultat+'');

        /* mise en page */

        resultat += '<div class="box">';

        donnees.forEach((att) => {
          if (att != "id") {
            if (att == "attribut") {
              let retour = "<div class='block'>ATTRIBUT :<br/><br/>";
              element["attribut"].forEach((elem) => {
                clé = avoirKey(elem);

                clé.forEach((key) => {
                  retour +=
                    "" +
                    key +
                    " : " +
                    elem[key] +
                    '  &ensp;&ensp;&ensp; <button class="button is-success">+1</button><button class="button is-danger">-1</button><input type="text" id="name" name="name"> ' +
                    "<br/>";
                });
                retour += "<br/>";
              });
              retour += "<br/></div>";
              resultat += retour;
            } else if (att == "magie") {
              resultat += affSocial(element["id"]);
            } else if (att == "pv") {
              resultat += affPv(element["id"]);
            } else {
              resultat += att + " : " + element[att] + "<br/>";
            }
          }
        });
        resultat += "</div>";
      });
      resultat += "</div>";

      data = data.replace("{{fiche}}", resultat);
      response.end(data);
    }
  });
});

server.listen(8000);

console.log("ok");
