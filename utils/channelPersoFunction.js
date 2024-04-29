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

    try {
      let channelpromise2 = client.channels.find(idJoueur);

      channelpromise2.then(succesChannel);
    }
    catch (e) {

    }


  });

  async function succesChannel(channel) {
    //channel.send(afficherPerso(userId));

    const fetched = await channel.messages.fetch({ limit: 10 });
    fetched.forEach((message) => {
      message.delete();
    });

    afficherPlusieursPartie(
      afficherPersoNom(chercheChanel(channel.id)),
    ).forEach((message) => {
      channel.send(message);
    });
  }
};
