// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SeedIDRevenue {
    address public owner;
    mapping(address => uint256) public balances;

    event RevenueAdded(address indexed verifier, uint256 amount);
    event Withdraw(address indexed verifier, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function addRevenue(address verifier, uint256 amount) external {
        require(msg.sender == owner, "Only owner can add revenue");
        balances[verifier] += amount;
        emit RevenueAdded(verifier, amount);
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    // Explicit getter for balances
    function getBalance(address verifier) external view returns (uint256) {
        return balances[verifier];
    }

    receive() external payable {}
}
