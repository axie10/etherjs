require("dotenv").config({ path: "../.env" });
const { ethers } = require("ethers");

// Variables
const LOCAL_BLOCK_URL = process.env.LOCAL_BLOCK_URL;
const provider = new ethers.providers.JsonRpcProvider(LOCAL_BLOCK_URL);
const address1 = process.env.ACCOUNT_2;
const privateKey1 = process.env.PRIVATE_KEY_1;
const address2 = process.env.ACCOUNT_1;
const privateKey2 = process.env.PRIVATE_KEY_2;
const wallet = new ethers.Wallet(privateKey2, provider);

async function main() {
  // Before
  const balanceBefore = await provider.getBalance(address1);
  const balanceWeiBefore = ethers.utils.formatEther(balanceBefore);
  console.log("Before", balanceWeiBefore, "ETH");

  await transfer(address2, "85");

  // After
  setTimeout(async () => {
    const balanceAfter = await provider.getBalance(address1);
    const balanceWeiAfter = ethers.utils.formatEther(balanceAfter);
    console.log("After", balanceWeiAfter, "ETH");
  }, 2000);
}

main();

// Funcion tranferir
async function transfer(account, value) {
  const transaction = await wallet.sendTransaction({
    to: account,
    value: ethers.utils.parseEther(value),
  });

  await transaction.wait();
  console.log(transaction);
}
