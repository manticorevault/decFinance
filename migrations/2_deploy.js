const Token = artifacts.require("Token");
const decFinance = artifacts.require("decFinance");

module.exports = async function (deployer) {
	//deploy Token
	await deployer.deploy(Token)

	//assign token into variable to get it's address
	const token = await Token.deployed()

	//pass token address for decFinance contract(for future minting)
	await deployer.deploy(decFinance, token.address)

	//assign decFinance contract into variable to get it's address
	const decfinance = await decFinance.deployed()

	//change token's owner/minter from deployer to decFinance
	await token.changeMinter(decfinance.address)
};