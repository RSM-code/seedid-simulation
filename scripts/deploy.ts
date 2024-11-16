import { ethers } from "hardhat";

async function main() {
  const SeedIDRevenue = await ethers.getContractFactory("SeedIDRevenue");
  const contract = await SeedIDRevenue.deploy();
  console.log("Deploying contract...");
  await contract.waitForDeployment();

  // Correctement afficher l'adresse
  const address = await contract.getAddress();
  console.log("SeedIDRevenue deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
