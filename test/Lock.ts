import { ethers } from "hardhat";
import { expect } from "chai";

describe("Lock", function () {
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;

    const lockedAmount = ethers.utils.parseEther("0.001");
    const latestBlock = await ethers.provider.getBlock("latest");
    const unlockTime = latestBlock.timestamp + ONE_YEAR_IN_SECS;

    const [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    await lock.deployed();

    return {
      lock,
      unlockTime,
      lockedAmount,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, unlockTime } = await deployOneYearLockFixture();

      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
      const { lock, owner } = await deployOneYearLockFixture();

      expect(await lock.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds to lock", async function () {
      const { lock, lockedAmount } = await deployOneYearLockFixture();

      const contractBalance = await ethers.provider.getBalance(lock.address);
      expect(contractBalance).to.equal(lockedAmount);
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      const Lock = await ethers.getContractFactory("Lock");
      const latestBlock = await ethers.provider.getBlock("latest");
      const latestTime = latestBlock.timestamp;

      await expect(
        Lock.deploy(latestTime, { value: ethers.utils.parseEther("0.001") })
      ).to.be.revertedWith("Unlock time should be in the future");
    });
  });

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await deployOneYearLockFixture();

        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } =
          await deployOneYearLockFixture();

        await ethers.provider.send("evm_increaseTime", [unlockTime]);
        await ethers.provider.send("evm_mine", []);

        const lockAsOtherAccount = lock.connect(otherAccount);
        await expect(lockAsOtherAccount.withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime } = await deployOneYearLockFixture();

        await ethers.provider.send("evm_increaseTime", [unlockTime]);
        await ethers.provider.send("evm_mine", []);

        await expect(lock.withdraw()).to.not.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount } =
          await deployOneYearLockFixture();

        await ethers.provider.send("evm_increaseTime", [unlockTime]);
        await ethers.provider.send("evm_mine", []);

        const tx = await lock.withdraw();
        const receipt = await tx.wait();

        const withdrawalEvent = receipt.events?.find(
          (event) => event.event === "Withdrawal"
        );

        expect(withdrawalEvent).to.not.be.undefined;
        expect(withdrawalEvent?.args?.amount).to.equal(lockedAmount);
      });
    });
  });
});
