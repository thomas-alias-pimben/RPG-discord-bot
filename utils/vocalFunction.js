const {
  createAudioResource,
  AudioPlayerStatus,
  createAudioPlayer,
} = require("@discordjs/voice");
const { getVoiceConnections } = require("@discordjs/voice");

module.exports.musiquetime = (path, time) => {
  let player;
  let playercritique;
  if (getVoiceConnections().size !== 0) {
    let arrayConn = Array.from(getVoiceConnections(), ([name, value]) => ({ name, value }));
    let connection = arrayConn[0];
    player = createAudioPlayer();
    console.log("path =" + path);
    player.pause();
    const resource = createAudioResource(path);

    player.on(AudioPlayerStatus.Playing, () => {
      console.log("The audio player has started playing!");
    });

    player.on(AudioPlayerStatus.Paused, () => {
      console.log("en pause");
    });

    playercritique = createAudioPlayer();

    playercritique.play(resource);
    connection.subscribe(playercritique);
    setTimeout(() => {
      playercritique.stop();
      connection.subscribe(player);
      player.unpause();
    }, time);
    console.log("musique réussite critique");
  } else {
    console.log("pas connecter");
  }
};
