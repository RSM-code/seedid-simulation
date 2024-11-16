import { ethers } from "ethers";
import fs from "fs";
import path from "path";

async function testContract() {
  console.log("Initializing provider...");
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  console.log("Fetching signer...");
  const signer = await provider.getSigner(0);

  const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // Adresse du contrat déployé
  console.log(`Contract Address: ${contractAddress}`);

  // Charger l'ABI depuis les artefacts compilés
  const abiPath = path.resolve(
    __dirname,
    "../artifacts/contracts/SeedIDRevenue.sol/SeedIDRevenue.json"
  );
  const contractJson = JSON.parse(fs.readFileSync(abiPath, "utf-8"));
  const abi = contractJson.abi;

  console.log("Initializing contract...");
  const contract = new ethers.Contract(contractAddress, abi, signer);
console.log(
  "Fonctions ABI :",
  abi.map((f: any) => f.name)
);

  try {
    console.log("Testing contract call...");
    const verifier = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E"; // Adresse Ethereum valide
    const amount = 1000;

    console.log(`Adding revenue: Verifier=${verifier}, Amount=${amount}`);
    const tx = await contract.addRevenue(verifier, amount);
    console.log("Transaction hash:", tx.hash);
    await tx.wait();
    console.log("Revenue added successfully!");

    console.log("Fetching balance...");
    const balance = await contract.getBalance(verifier);
    console.log("Balance:", balance.toString());
  } catch (error: any) {
    console.error("An error occurred:", error.message || error);
  }
}

testContract().catch((error) => {
  console.error("Error:", error.message || error);
  process.exit(1);
});
