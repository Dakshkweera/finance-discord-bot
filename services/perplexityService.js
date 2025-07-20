const axios = require('axios');
const { pplxApiKey } = require("../config/config.js");

function splitIntoChunks(text, maxLength = 2000) {
  const chunks = [];
  let i = 0;

  while (i < text.length) {
    chunks.push(text.slice(i, i + maxLength));
    i += maxLength;
  }

  return chunks;
}

async function askQuestion(userId,question,Memory = []) {
  const url = 'https://api.perplexity.ai/chat/completions';

  const payload = {
    model: 'sonar-pro',  
    messages: [
      
        { role: 'system', 
        content: 'You are a helpful financial assistant.' 
      },
      ...Memory,
      {
        role: 'user',
        content: question
      }
    ]
  };

  const headers = {
    'Authorization': `Bearer ${pplxApiKey}`,
    'Content-Type': 'application/json',
  };

  const response = await axios.post(url, payload, { headers });

  const fullReply = response.data.choices[0].message.content;
  if (Array.isArray(fullReply)) {
    fullReply = fullReply.join("\n");
  }

  return splitIntoChunks(fullReply);
}

module.exports = { askQuestion };
