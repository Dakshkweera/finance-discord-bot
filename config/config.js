require("dotenv").config() // .config->load process.env in enviornment and read what inside .env file

module.exports = {
    discordToken: process.env.DISCORD_TOKEN,
    pplxApiKey: process.env.PPLX_API_KEY,
}  // this take secret from .env file.