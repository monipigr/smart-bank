// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {SmartBank} from "../src/SmartBank.sol";

contract SmartBankTest is Test {
    SmartBank public smartbank;
    address public admin = vm.addr(1);
    address public user1 = vm.addr(2);
    address public user2 = vm.addr(3);
    uint256 maxBalance = 2 ether;

    function setUp() public {
        smartbank = new SmartBank(maxBalance, admin);
    }

    // Comprueba el constructor inicial
    function test_InitialState() public view {
        uint256 maxBalance_ = smartbank.maxBalance();
        assert(maxBalance_ == maxBalance);
        address admin_ = smartbank.admin();
        assert(admin_ == admin);
        string memory name_ = smartbank.name();
        assertEq(name_, "Smart Bank");
    }

    // Comprueba que se puede depositar ether correctamente
    function test_DepositEther() public {
        vm.deal(user1, 1 ether);

        vm.startPrank(user1);
        smartbank.depositEther{value: 1 ether}();
        assertEq(smartbank.balanceOf(user1), 1 ether);
        vm.stopPrank();
    }

    // Comprueba que el ether depositado no supera el balance máximo permitido
    function test_DepositExceedsMaxBalance() public {
        vm.deal(user1, 3 ether);

        vm.startPrank(user1);
        vm.expectRevert();
        smartbank.depositEther{value: 3 ether}();
        vm.stopPrank();
    }

    // Comprueba que emite el evento EtherDeposit
    function test_EmitEtherDepositEvent() public {
        vm.deal(user1, 1 ether);

        vm.startPrank(user1);
        vm.expectEmit(true, true, false, true);
        emit SmartBank.EtherDeposit(user1, 1 ether);
        smartbank.depositEther{value: 1 ether}();
        vm.stopPrank();
    }

    // Comprueba que se puede retirar ether
    function test_WithdrawEther() public {
        vm.deal(user1, 1 ether);

        vm.startPrank(user1);
        smartbank.depositEther{value: 1 ether}();
        smartbank.withdrawEther(0.5 ether);
        assertEq(smartbank.balanceOf(user1), 0.5 ether);
        vm.stopPrank();
    }

    // Comprueba que no puede retirar más ether del que dicho usuario tiene en balance
    function test_WithdrawMoreThanBalance() public {
         vm.deal(user1, 1 ether);

        vm.startPrank(user1);
        smartbank.depositEther{value: 1 ether}();
        vm.expectRevert();
        smartbank.withdrawEther(1.5 ether);
        vm.stopPrank();
    }

    // Comprueba que emite el evento EtherWithdraw
    function test_EmitEtherWithdrawEvent() public {
        vm.deal(user1, 1 ether);
        
        vm.startPrank(user1);
        smartbank.depositEther{value: 1 ether}();
        vm.expectEmit(true, true, false, true);
        emit SmartBank.EtherWithdraw(user1, 0.5 ether);
        smartbank.withdrawEther(0.5 ether);
        vm.stopPrank();
    }

    // Comprueba que primero se resta el saldo y luego se transfiere fuera del contrato para evitar reentrancy attacks
    // function test_ReentrancyProtection() public {}

    // Comprueba que se puede modificar el balance máximo
    function test_ModifyMaxBalance() public {
        uint newMax_ = 5 ether;

        vm.startPrank(admin);
        smartbank.modifyMaxBalance(newMax_);
        assertEq(smartbank.maxBalance(), newMax_);
        vm.stopPrank();
    }

    // Comprueba que si no es el admin no puede modificar el balance máximo
    function test_NonAdminCannotModifyMaxBalance() public {
        uint newMax_ = 5 ether;

        vm.startPrank(user2);
        vm.expectRevert();
        smartbank.modifyMaxBalance(newMax_);
        vm.stopPrank();
    }

    // Comprueba que, dada una dirección, devuelve su balance
    function test_BalanceOf() public {
        vm.deal(user1, 1 ether);
        vm.startPrank(user1);
        smartbank.depositEther{ value: 1 ether}();
        assertEq(smartbank.balanceOf(user1), 1 ether);
        assertEq(smartbank.balanceOf(user2), 0 ether);
    }

}