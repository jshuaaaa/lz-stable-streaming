// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor () ERC20("Token", "TOKE") {
        _mint(msg.sender, 100000);
    }

}