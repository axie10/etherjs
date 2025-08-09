require("dotenv").config({ path: "../.env" });
const { ethers } = require("ethers");

// Variables de entorno
const INFURA_URL = process.env.INFURA_URL;
const INFURA_ID = process.env.INFURA_ID;
const ADDRESS_EXAMPLE = process.env.ADDRESS_EXAMPLE;
// console.log(INFURA_URL)
// console.log(INFURA_ID)
// console.log(provider)

const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
const address = ADDRESS_EXAMPLE;

const main = async () => {
  const balance = await provider.getBalance(address);
  const balanceEth = ethers.utils.formatEther(balance);
  console.log("balance:", balanceEth);
  //   const code = await provider.getCode(address);
  //   const bytes = ethers.utils.arrayify(code);
  //   console.log(bytes);
  // console.log('code:',code)
};

main();
