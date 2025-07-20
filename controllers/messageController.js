const {askQuestion}= require("../services/perplexityService.js");
const { getMemory, setMemory} = require("../services/memoryStore.js");

async function messagehandel(message){
    if(message.author.bot)return;

    const userId = message.author.id;
    const channelname = message.channel.name;

    const nonAIChannelIds = ['1396177845956509828'];
    if (nonAIChannelIds.includes(message.channel.id)) {
    if (message.content.startsWith("/ask")) {
        await message.reply("🤖 This channel is for group discussion only.");
    }
  return;
}

    let question = null;

    const ischannelname = channelname === `finguru-${userId}`;

    if(ischannelname){
        question = message.content.trim();
    }
    else if(message.content.startsWith("/ask")){
        question = message .content.slice(5).trim();
    }

    if(!question){
         await message.reply('❗ Please include a question after `/ask`.');
        return;
    }

    try{
        await message.reply('💭 Thinking...');
        const userId = message.author.id;
        const memory = await getMemory(userId);

        const replychunk = await askQuestion(userId,question,memory);
        const reply = replychunk.join('\n'); 

        setMemory(userId, [
            { role: 'user', content: question },
            { role: 'assistant', content: reply }
        ]);
        
        for (const chunk of replychunk) {
            if ( chunk.trim() !== "") {
            await message.reply(chunk);
            }
        }
        // await message.reply(`💬 ${reply}`);
    }
    catch(err){
         console.error(err);
         await message.reply('⚠️ Error talking to AI.');
    }

};

module.exports = { messagehandel};