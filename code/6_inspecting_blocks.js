require("dotenv").config({ path: "../.env" });
const { ethers } = require("ethers");

const INFURA_URL = process.env.INFURA_URL;
const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

const main = async () => {
  const block = await provider.getBlockNumber();
  console.log(`\nBlock number: ${block}`);

  const blockInfo = await provider.getBlock(block);
  console.log('Blockinfo:',blockInfo);

  const { transactions } = await provider.getBlockWithTransactions(block);
  console.log('transactions:',transactions[1]);
};

main();
