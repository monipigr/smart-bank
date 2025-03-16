// SPDX-License-Identifier: LGPL-3.0-only

pragma solidity ^0.8.24; 

contract SmartBank {

    string public constant name = "Smart Bank";

    uint256 public maxBalance;
    address public admin;
    mapping(address => uint256) public userBalance; 

    event EtherDeposit(address user_, uint256 etheramount_);
    event EtherWithdraw(address user_, uint256 etheramount_);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not allowed");
        _;
    }

    constructor(uint256 maxBalance_, address admin_) {
        maxBalance = maxBalance_;
        admin = admin_;
    }

    function depositEther() external payable {
        require(userBalance[msg.sender] + msg.value <= maxBalance, "MaxBalance reached");
        userBalance[msg.sender] += msg.value;

        emit EtherDeposit(msg.sender, msg.value);
    }

    function withdrawEther(uint256 amount_) external {
        require(amount_ <= userBalance[msg.sender], "Not enough ether");

        userBalance[msg.sender] -= amount_;
        (bool success, ) = msg.sender.call{value: amount_}("");
        require(success, "Transfer failed");

        emit EtherWithdraw(msg.sender, amount_);
    }

    function modifyMaxBalance(uint256 newMaxBalance_) external onlyAdmin {
        maxBalance = newMaxBalance_;
    }

    function balanceOf(address addr_) external view returns(uint256) {
        return userBalance[addr_];
    }

}