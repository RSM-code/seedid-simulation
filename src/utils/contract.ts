import { ethers, Contract } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const provider = new ethers.JsonRpcProvider(
  process.env.PROVIDER_URL || "http://127.0.0.1:8545"
);
const contractAddress =
  process.env.CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const abi = [
  "function addRevenue(address verifier, uint256 amount) external",
  "function withdraw(uint256 amount) external",
  "function balances(address) view returns (uint256)",
];

const contract: Contract = new ethers.Contract(contractAddress, abi, provider);

export { provider, contract };
