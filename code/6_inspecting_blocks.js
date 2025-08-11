require("dotenv").config({ path: "../.env" });
const { ethers } = require("ethers");

const INFURA_URL = process.env.INFURA_URL;
const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

const ERC20_ABI = [
  "function transfer(address to, uint256 amount)",
  "function approve(address spender, uint256 amount)",
  "function transferFrom(address from, address to, uint256 amount)",
];
const iface = new ethers.utils.Interface(ERC20_ABI);

const main = async () => {
  const blockNumber = await provider.getBlockNumber();
  console.log(`\nBlock number: ${blockNumber}`);

  const blockInfo = await provider.getBlock(blockNumber, true);
  console.log("Blockinfo:", blockInfo);
  console.log(
    `Analizando bloque #${blockInfo} con ${blockInfo.transactions.length} transacciones...\n`
  );

  const { transactions } = await provider.getBlockWithTransactions(blockNumber);

  console.log("transactions:", transactions[0]);
  console.log(`transactions hash: ${transactions[0].hash}`);
  console.log(`From: ${transactions[0].from}`);
  console.log(`To: ${transactions[0].to}`);
  console.log(`Data: ${transactions[0].data}`);

  try {
    const decoded = iface.parseTransaction({ data: transactions[0].data });
    console.log(`Función: ${decoded.name}`);
    console.log(`Args:`, decoded.args);
  } catch {
    console.log("No coincide con el ABI proporcionado");
  }
};

main();
