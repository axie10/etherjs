require("dotenv").config({ path: "../.env" });
const { ethers } = require("ethers");

// Variables
const LOCAL_BLOCK_URL = process.env.LOCAL_BLOCK_URL;
const provider = new ethers.providers.JsonRpcProvider(LOCAL_BLOCK_URL);
const account1 = process.env.ACCOUNT_1;
const account2 = process.env.ACCOUNT_2;