const mongoose = require("mongoose");

const userchannelschema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true,
    },
    channelId:{
        type: String,
        required: true,
    }
});

const userchannel = mongoose.model("userchannel", userchannelschema);

module.exports = userchannel;