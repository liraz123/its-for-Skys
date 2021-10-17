/** @format */

const Command = require("../Structures/Command");

module.exports = new Command({
	name: "clear",
	description: "Clear an amount of messages",
	
	permission: "MANAGE_MESSAGES",
	type: "BOTH",
	slashCommandOptions: [{
		name: "amount",
		description: "The amount of messages to clear",
		type: "INTEGER",
		required: true
	}],
	async run(message, args, client) {
		const amount = args[1];
 
		if (!amount || isNaN(amount))
			return message.reply(
				`${
					amount == undefined ? "לא" : amount
				} כתבת לי כמה הודעות למחוק`
			);

		const amountParsed = parseInt(amount);

		if (amountParsed > 20)
			return message.channel.send("את/ה לא יכול/ה למחוק יותר מ20 הודעות");

		message.channel.bulkDelete(amountParsed);

		const msg = await message.reply(
			`נמחקו ${amountParsed} הודעות!`
		);

		

		if (msg) setTimeout(() => msg.delete(), 1000);
	}
})
