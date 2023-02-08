module.exports = {
  name: "join",
  async execute(client, message, args, connection) {
    // If the user is in the voice call then bot can join
    if (message.member.voice.channel) {
      try {
        connection.connect();
        await message.reply("I joined in the call and dont left me hanging");
      } catch (error) {
        console.log(error);
      }
      // If not bot cannot join
    } else {
      await message.reply("Join voice call and try again bro");
    }
  },
};
