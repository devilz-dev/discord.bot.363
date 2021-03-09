const ms = require("ms");

exports.run = async (bot,message,args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have Permission to execute this command!")
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.channel.send('Invalid User Provided');
    let muteTime = args[1];
    let msTime = ms(muteTime);
    let muteRole = message.guild.roles.cache.find(r => r.name == "Muted");
    if(!muteRole) return message.channel.send("Mute role not found!");
    member.roles.add(muteRole);
    message.channel.send("User has been muted!");
    
}

exports.help = {
name: 'mute'
}