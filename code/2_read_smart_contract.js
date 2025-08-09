require("dotenv").config({ path: "../.env" });
const { ethers } = require("ethers");

// Variables de entorno
const INFURA_URL = process.env.INFURA_URL;
const INFURA_ID = process.env.INFURA_ID;
const ADDRESS_EXAMPLE = process.env.ADDRESS_EXAMPLE;

const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

// ABI = Application Binary Interface
// Manual de instrucciones o traductor que le dice a tu aplicación:
// - Qué funciones tiene el contrato
// - Qué parámetros esperan
// - Qué valores devuelven
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
];

// DAI Contract
const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const contract = new ethers.Contract(address, ERC20_ABI, provider);

// Person address
const personAddress = "0x0469eCae49081623A7e9dF4754Bb90bfC8323323";

const main = async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();

  console.log("Reading smart contract of:", name);
  console.log("name =>", name);
  console.log("symbol =>", symbol);

  const totalSupply = await contract.totalSupply();
  const totalSupplyEth = ethers.utils.formatEther(totalSupply);
  const balanceOf = await contract.balanceOf(personAddress);
  const balanceOfEth = ethers.utils.formatEther(balanceOf);

  console.log("totalSupply =>", totalSupplyEth);
  console.log("balanceOf ETH =>", balanceOfEth);
};

main();
