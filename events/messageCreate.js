const conf = require("../config.json");
const { Events } = require("discord.js");
const client = require("../handlers/client.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (!message.content.startsWith(conf.PREFIX) || message.author.bot) return;

    const args = message.content.slice(conf.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (
      !client.commands.has(command) &&
      !client.commands.find(
        (commands) => commands.aliases && commands.aliases.includes(command)
      )
    )
      return;

    try {
      let execute_commands =
        client.commands.get(command) ||
        client.commands.find(
          (commands) => commands.aliases && commands.aliases.includes(command)
        );
      execute_commands.execute(client, message, args);
    } catch (error) {
      console.error(error);
      await message.reply("There was an error trying to execute that command!");
    }
  },
};
