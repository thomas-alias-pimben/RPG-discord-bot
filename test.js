const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
} = require("@discordjs/voice");
const path = require("path");

const player = createAudioPlayer({
  behaviors: { noSubscriber: NoSubscriberBehavior.Play },
});
const resource = createAudioResource(path.join(__dirname, "attack.mp3"));
player.play(resource);
connection.subscribe(player);
