const express = require('express');
const router=express.Router();

require('./routes/BusDetails')(router)
require('./routes/Users')(router)
require('./routes/bookedUsers')(router)
module.exports=router