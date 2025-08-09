require("dotenv").config({ path: "../.env" });
const { ethers } = require("ethers");

// Variables
const LOCAL_BLOCK_URL = process.env.LOCAL_BLOCK_URL;
const provider = new ethers.providers.JsonRpcProvider(LOCAL_BLOCK_URL);
const account1 = process.env.ACCOUNT_1;
const privateKey1 = process.env.PRIVATE_KEY_1;
const account2 = process.env.ACCOUNT_2;
const privateKey2 = process.env.PRIVATE_KEY_2;
const wallet = new ethers.Wallet(privateKey1, provider);
const contract = new ethers.Contract(address, ERC20_ABI, provider);
const ERC20_ABI = [
    "function decimals() view returns (uint)",
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];