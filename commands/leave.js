module.exports = {
  name: "leave",
  async execute(client, message, args, connection) {
    // If the user is in the voice channel then bot can leave
    if (message.member.voice.channel) {
      try {
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
