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
const ERC20_ABI = [
    "function decimals() view returns (uint)",
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];
const address = '0x597B48087B895EC0B2382d23c350FeD13E5f47Ae';
const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {

    const decimals = await contract.decimals()
    console.log(`Decimals: ${decimals}`)
    const balanceBefore = await contract.balanceOf(account1)
    console.log(ethers.utils.formatEther(balanceBefore))
    console.log(`BalanceBefore (${account1}): ${balanceBefore / 10**decimals} Tokens`)

    const contractWithWallet = contract.connect(wallet)
    const tx = await contractWithWallet.transfer(account2, '1000000000000000000')
    // const tx1 = await contractWithWallet.transfer(account2, balanceBefore)
    await tx.wait()
    console.log(tx)

    const balanceAfter = await contract.balanceOf(account1)
    console.log(`balanceAfter (${account1}): ${balanceAfter / 10**decimals} Tokens`)
    const balanceAccount2 = await contract.balanceOf(account2)
    console.log(ethers.utils.formatEther(balanceAccount2))
    console.log(`balanceAccount2 (${account2}): ${balanceAccount2 / 10**decimals} Tokens`)
}

main()