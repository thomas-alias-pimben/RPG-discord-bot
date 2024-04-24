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

function TableauPerso(perso) {
  resultat = "";
  if (typeof perso === "undefined") {
    Object.values(config).forEach((element) => {
      afficherTableau(element);
    });
  } else {
    resultat += afficherTableau(config[perso]);
  }
  return resultat;
}

function afficherTableau(element) {
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

  resultat += '<div class="column is-three-fifths is-offset-one-fifth ">';
  resultat += '<div class="box">';

  let i = 0;
  donnees.forEach((att) => {
    if (att != "id") {
      if (att == "attribut") {
        let retour = "<div class='block'>ATTRIBUT :<br/><br/>";

        element["attribut"].forEach((elem) => {
          clé = avoirKey(elem);
          clé.forEach((key) => {
            retour += '<form action="/perso" method="post">';
            //console.log(element.joueur);
            retour +=
              '<input name="perso" type="hidden" value="' +
              element.joueur.toLowerCase() +
              '">';
            retour += '<input name="att" type="hidden" value="' + key + '">';
            if (key[0] == key[0].toUpperCase()) {
              let tmp =
                "" +
                key +
                " : " +
                elem[key] +
                '<br/><button class="btn btn-success" type="submit" name="modif" value="+1">+1</button><button class="btn btn-danger" type="submit" name="modif" value="-1">-1</button><input class="form" type="number" name="nombre" ></button><button class="btn btn-primary" type="submit" name="modif" value="valider">valider</button></div> \n' +
                " <br/>\n";
              if (i === 1) {
                retour += "</table>\n";
              } else {
                i = 1;
              }
              retour += '<table class="table is-fullwidth">\n';
              retour += "<thead>\n";
              retour += "    <tr>\n";
              retour += '        <th> <font size="6">' + tmp + "</font></th>\n";
              retour += "    </tr>\n";
              retour += "    </thead>\n";
            } else {
              let tmp =
                "" +
                key +
                " : " +
                elem[key] +
                '  <br/><button class="btn btn-success" type="submit" name="modif" value="+1">+1</button><button class="btn btn-danger" type="submit" name="modif" value="-1">-1</button><input class="form" type="number" name="nombre" ></button><button class="btn btn-primary" type="submit" name="modif" value="valider">valider</button>  \n' +
                "<br/>\n";

              retour += "<tr>\n";
              retour += '    <td><font size="5">' + tmp + "</font></td>\n";

              retour += "</tr>\n";
            }
            retour += "</form>";
          });
          retour += "<br/>";
        });
        retour += "</table>";
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
  resultat += "</div>";

  return resultat;
}

module.exports.TableauPerso = TableauPerso;
