import { ethers } from "ethers";
import fs from "fs";
import path from "path";

async function testContract() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  const signer = provider.getSigner(0);

  const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  const abiPath = path.resolve(
    __dirname,
    "../artifacts/contracts/SeedIDRevenue.sol/SeedIDRevenue.json"
  );
  const contractJson = JSON.parse(fs.readFileSync(abiPath, "utf-8"));
  const abi = contractJson.abi;

  const contract = new ethers.Contract(contractAddress, abi, signer);

  console.log("Testing contract call...");
  const tx = await contract.addRevenue(
    "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
    1000
  );
  console.log("Transaction hash:", tx.hash);
  await tx.wait();
}
testContract().catch(console.error);
