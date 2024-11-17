import { ethers } from "hardhat";

async function main() {
  const SeedIDRevenue = await ethers.getContractFactory("SeedIDRevenue");
  const contract = await SeedIDRevenue.deploy();
  await contract.deployed();
  console.log("SeedIDRevenue deployed to:", contract.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
