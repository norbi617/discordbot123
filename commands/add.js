// npmjs packages
const Discord = require('discord.js');
const fs = require('fs');
const os = require('os');

// configuration
const config = require('../config.json');

// export command
module.exports = {
    
    // command name
	name: 'add',

    // command description
	description: 'Add an account to a specified service.',

    // command
	execute(message) {

        // split message content
        const messageArray = message.content.split(' ');

        // args
        const args = messageArray.slice(1);

        // service
        const service = args[0];

        // account
        const account = args[1];

        // if no service
        if (!service) {

            // send message to channel
            message.channel.send(

                // embed
                new Discord.MessageEmbed()
                .setColor(config.color.red)
                .setTitle('Missing parameters')
                .setDescription('You need to give a service name!')
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
            );

            // cancel
            return;
        };

        // if no account
        if (!account) {

            // send message to channel
            message.channel.send(

                // embed
                new Discord.MessageEmbed()
                .setColor(config.color.red)
                .setTitle('Missing parameters')
                .setDescription('You need to give an account or data!')
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp()
            );

            // cancel
            return;
        };

        // stock files path
        const filePath = `${__dirname}/../stock/${args[0]}.txt`;

        // file append
        fs.appendFile(filePath, `${os.EOL}${args[1]}`, function (error) {

            // if error
            if (error) {
                
                // write to console
                console.log(error);

                // cancel
                return;
            };

            // send message to channel
            message.channel.send(
                new Discord.MessageEmbed()
                .setColor(config.color.green)
                .setTitle('Account added!')
                .setDescription(`Successful added \`${args[1]}\` to \`${args[0]}\` service!`)
                .setFooter(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
            );
        });
    },
};