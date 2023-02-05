const Manager = require("../connections/manager.js");
const ytSearch = require("yt-search");

require("../connections/musicPlayer.js");

module.exports = {
  name: "play",
  async execute(client, message, args) {
    Manager.on("trackStart", async (player, track) => {
      message.channel.send(
        "NOW PLAYING: " + track.title + " requested by " + track.requester.tag
      );
    });

    client.on("raw", (d) => Manager.updateVoiceState(d));

    // If user is not in the voice channel then bot connot play and join
    if (!message.member.voice.channel)
      return message.reply("You need to join a voice channel.");
    if (!args.length)
      return message.reply("You need to give me a URL or a search term.");

    const search = args.join(" ");
    let res;

    try {
      res = await Manager.search(search, message.author);
      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED")
        throw { message: "Playlists are not supported with this command." };
    } catch (err) {
      return message.reply(
        `There was an error while searching: ${err.message}`
      );
    }

    if (res.loadType === "NO_MATCHES")
      return message.reply("There was no tracks found in the server");

    const connection = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    connection.connect();

    // Search YT and Play
    function SearchAndPlay(query) {
      try {
        ytSearch(query, (err, r) => {
          if (err) throw err;

          const video = r.videos[0];
          console.log(`Video URL: ${video.url}`);

          if (
            !connection.playing &&
            !connection.paused &&
            !connection.queue.size
          ) {
            connection.play(video.url);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    // QueueEnd
    Manager.on("queueEnd", (player) => {
      const channel = client.channels.cache.get(player.textChannel);
      channel.send("Queue has ended.");
      player.destroy();
    });

    SearchAndPlay(message.content);
    // Add music to Queue
    connection.queue.add(res.tracks[1]);
    return message.reply(`Enqueuing ${res.tracks[0].title}.`);
  },
};
