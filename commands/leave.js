const Manager = require("../connections/manager.js");

module.exports = {
  name: "leave",
  async execute(client, message, args) {
    // If the user is in the voice channel then bot can leave
    if (message.member.voice.channel) {
      try {
        const connection = Manager.create({
          guild: message.guild.id,
          voiceChannel: message.member.voice.channel.id,
          textChannel: message.channel.id,
        });
        connection.destroy();
      } catch (error) {
        console.log(error);
      }
      // If not bot connot leave
    } else {
      await message.reply("We are not in the voice call you stoopid");
    }
  },
};
