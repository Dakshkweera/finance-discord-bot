// In plce storage.


// const memoryStore = new Map();

// function getMemory(userId) {
//   return memoryStore.get(userId) || [];
// }

// function setMemory(userId, newMessages) {
//   const existing = memoryStore.get(userId) || [];
//   const updated = [...existing, ...newMessages];
//   const trimmed = updated.slice(-10);

//   memoryStore.set(userId, trimmed);
// }

// module.exports = { getMemory, setMemory };


//  storage using mongo db.

const Memory = require("../model/memory");


async function getMemory(userId) {
  const memory = await Memory.findOne({ userId });
  if (!memory || !Array.isArray(memory.messages)) {
    return []; 
  }
  return memory.messages.slice(-10); // Last 10
}


async function setMemory(userId, newMessages){
    const memory = await Memory.findOne({userId});

    if(memory){
        memory.messages.push(...newMessages);

        memory.messages = memory.messages.slice(-10);
        await memory.save();
    }
    else{
        await Memory.create({ userId, messages: newMessages });
    }
}


module.exports = { getMemory, setMemory };