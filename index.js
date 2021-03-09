const Discord = require('discord.js')
const bot = new Discord.Client({ws: {intents: Discord.Intents.ALL}});
const fs = require("fs")
const queue = new Map();



bot.commands = new Discord.Collection();


bot.on('ready', () => {
    console.log('The power of nini 363 server bot is online!')

    fs.readdir('./commands', (err, files) => {
        if(err) return console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() == 'js');

        if(jsfile.length == 0) {return console.log("Could not find any commands!")}

        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props)
        })
    })
})

bot.on('message', (message) => {
    if(message.author.bot) return;
    if(message.channel.type !== 'text') return;
    let prefix = '+';
    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length)
    let args = MessageArray.slice(1)

    if(!message.content.startsWith(prefix)) return;

    let commandfile = bot.commands.get(cmd);
    if(commandfile) {commandfile.run(bot,message,args)}


})

bot.on('channelCreate', (channel) => {
    channel.send('This channel was just made!')
})

bot.on('guildMemberUpdate', (oldMember, newMember) => {
    if(oldMember.nickname !== newMember.nickname) {
        newMember.send('You changed your nickname')
    }
    let oldAvatar = oldMember.user.avatarURL()
    let newAvatar = newMember.user.avatarURL();
    if(oldAvatar !== newAvatar) {
        newMember.send('your avatar has changed!')
    
    }



})




bot.on('guildMemberAdd', (member) => {
    let embed = new Discord.MessageEmbed()
    .setTitle('welcome to my server!')
    .setDescription(`Thank you for joining my server! make sure to stay active and talk to the other members!\n***Current Member Count:*** ${member.guild.memberCount}\n***owner:*** ${member.guild.owner.user.tag}`)
    .setColor('#cc3300')
    .setAuthor(member.guild.owner.user.tag, member.guild.owner.user.avatarURL())
    .setFooter(member.guild.name, member.guild.iconURL())
    .setThumbnail(member.user.avatarURL());

    member.send(embed)
})

bot.login("ODE3ODYzNzU5MDU3NTE4NTkz.YEPs-w.VuG7JH79uacjC0S1FQgPW1-teRI")