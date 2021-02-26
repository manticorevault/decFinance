// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
  address public minter;

  event MinterChanged(address indexed from, address to);

  constructor() public payable ERC20("Bisoncoin", "BSN") {
    minter = msg.sender;
  }

  function changeMinter(address decFinance) public returns (bool) {
  	require(msg.sender==minter, "Oops, apparently that's an illegal operation. Only the contract sender can change the token minter");
  	minter = decFinance;

    emit MinterChanged(msg.sender, decFinance);
    return true;
  }

  function mint(address account, uint256 amount) public {
		require(msg.sender==minter, "Oops, apparently that's an illegal operation. Token minter must be the sender"); 
		_mint(account, amount);
	}
}