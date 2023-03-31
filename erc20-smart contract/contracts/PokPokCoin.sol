// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PokPokCoin is ERC20 {
    constructor() ERC20("PokPokCoin", "PPC") {
        
    }

    function deposit() public payable{
        require(msg.value > 0,"Amount ETH is Zero");
        // 1 ETH = 10000 PPC
        _mint(msg.sender, msg.value / (10**14));

    }

    function withdraw(uint amount) public{
        require(amount > 0 && amount <= balanceOf(msg.sender),"Amount PPC is Zero");
        payable(msg.sender).transfer(amount * (10**14) );
        _burn(msg.sender,amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }


}