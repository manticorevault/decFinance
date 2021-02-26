const Token = artifacts.require("Token");
const decfinance = artifacts.require("decFinance");

module.exports = async function (deployer) {
	//deploy Token
	await deployer.deploy(Token)

	//assign token into variable to get it's address
	const token = await Token.deployed()

	//pass token address for decFinance contract(for future minting)
	await deployer.deploy(decfinance, token.address)

	//assign decFinance contract into variable to get it's address
	const decFinance = await decfinance.deployed()

	//change token's owner/minter from deployer to decFinance
	await token.changeMinter(decFinance.address)
};