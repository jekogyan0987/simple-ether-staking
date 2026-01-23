// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Staker {
    mapping(address => uint256) public balances;
    uint256 public totalStaked;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    function stake() public payable {
        require(msg.value > 0, "Cannot stake 0 ETH");
        balances[msg.sender] += msg.value;
        totalStaked += msg.value;
        emit Staked(msg.sender, msg.value);
    }

    function withdraw() public {
        uint256 balance = balances[msg.sender];
        require(balance > 0, "No balance to withdraw");
        
        balances[msg.sender] = 0;
        totalStaked -= balance;
        
        (bool sent, ) = msg.sender.call{value: balance}("");
        require(sent, "Failed to send Ether");
        
        emit Withdrawn(msg.sender, balance);
    }
    
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
