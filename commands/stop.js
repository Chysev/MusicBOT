const Manager = require("../connections/manager.js");

module.exports = {
  name: "stop",
  async execute(client, message, args) {
    // If the use is not in the voice channel then this command is not avaialble
    if (!message.member.voice.channel)
      return message.reply("You are not in a voice channel you stoopid");

    const connection = Manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    // If music is playing then user can stop
    if (connection.playing) {
      try {
        connection.destroy();
        await message.channel.send(
          "The music stopped by: " + message.author.username
        );
        console.log("The music stopped by: " + message.author.username);
      } catch (error) {
        console.log(error);
      }

      // If not then user cannot stop
    } else {
      await message.channel.send("I am not playing any music or audio");
    }
  },
};
