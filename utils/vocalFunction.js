const {
  createAudioResource,
  AudioPlayerStatus,
  createAudioPlayer,
} = require("@discordjs/voice");
const { getVoiceConnections } = require("@discordjs/voice");

module.exports.musiquetime = (path, time) => {
  let player;
  if (getVoiceConnections().size !== 0) {
    let connection = getVoiceConnections().entries().next().value[1];
    // player = createAudioPlayer();
    console.log("path =" + path);
    //player.pause();
    const resource = createAudioResource(path);

    /* player.on(AudioPlayerStatus.Playing, () => {
      console.log("The audio player has started playing!");
    });

    player.on(AudioPlayerStatus.Paused, () => {
      console.log("en pause");
    });*/

    playercritique = createAudioPlayer();

    playercritique.play(resource);
    connection.subscribe(playercritique);
    setTimeout(() => {
      playercritique.stop();
      //connection.subscribe(player);
      //player.unpause();
    }, time);
    console.log("musique réussite critique");
  } else {
    console.log("pas connecter");
  }
};
