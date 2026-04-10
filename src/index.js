require("dotenv").config();
require("./ws");

const { clientId } = require("../config");
const { initRPC } = require("./rpc/activity");

initRPC(clientId);

