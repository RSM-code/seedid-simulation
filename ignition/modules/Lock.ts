import { buildModule } from "@nomiclabs/hardhat-ethers";
import { ethers } from "ethers";

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = ethers.utils.parseEther("0.001");

const LockModule = buildModule("LockModule", (m: any) => {
  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const lock = m.contract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  return { lock };
});

export default LockModule;
