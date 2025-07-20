const userchannel = require("../model/userchannel");

async function createorfetchchannel(user,guild){
    const existing = await userchannel.findOneAndReplace({userId : user.id});

    if(existing){
        const channel = guild.channels.cache.get(existing.channelId);
        if(channel)return channel;        
    }

    const channel = await guild.channels.create({
        name: `finguru-${user.username.toLowerCase()}`,
        type: 0,
        permissionOverwrites:[
            {
                id: guild.roles.everyone.id,
                deny: ['ViewChannel'],
            },
            {
                id: user.id,
                allow : ['ViewChannel', 'SendMessages', 'ReadMessageHistory'],
            },
            {
                id: guild.members.me.id,
                allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'],
            }
        ]
    });

    await userchannel.create({
        userId: user.id,
        channelId: channel.id
    });

    return channel;
}

module.exports = { createorfetchchannel };

