require("dotenv").config({ path: "../.env" });
const { ethers } = require("ethers");

const INFURA_URL = process.env.INFURA_URL;

const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

// DAI Contract
const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {
  const block = await provider.getBlockNumber();
  const network = await provider.getNetwork();
  console.log('block:',block);
  console.log('network:',network);

  const transferEvents = await contract.queryFilter(
    "Transfer",
    block - 1,
    block
  );
  console.log(transferEvents);
};

main();
