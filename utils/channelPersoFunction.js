const {
  tableauChannel,
  getIdChannel,
  afficherPlusieursPartie,
  afficherPersoNom,
  chercheChanel,
} = require("../manipulerjson");

module.exports.rebootPagePerso = (client) => {
  tableauIdChannel = tableauChannel();

  tableauIdChannel.forEach((joueurChannelid) => {
    idJoueur = getIdChannel(joueurChannelid);

    console.log(idJoueur);

    let channelpromise2 = client.channels.fetch(idJoueur);

    channelpromise2.then(succesChannel).catch(() => {
      console.log(idJoueur + "n'as pas été trouvé");
    });
  });

  async function succesChannel(channel) {
    //channel.send(afficherPerso(userId));

    const fetched = await channel.messages.fetch({ limit: 10 });
    console.log(fetched.size);
    if (fetched.size === 0) {
      afficherPlusieursPartie(
        afficherPersoNom(chercheChanel(channel.id)),
      ).forEach((message) => {
        channel.send(message);
      });
    } else {
      afficherPlusieursPartie(
        afficherPersoNom(chercheChanel(channel.id)),
      ).forEach((message) => {
        let first = fetched.last();
        fetched.delete(first.id);
        first.edit(message);
        //channel.send(message);
      });

      fetched.forEach((message) => {
        message.delete();
      });
    }
  }
};
