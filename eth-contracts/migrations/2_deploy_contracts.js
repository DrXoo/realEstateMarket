// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var RealEstateMarket = artifacts.require("./RealEstateMarket.sol");

module.exports = async function(deployer) {
  await deployer.deploy(SquareVerifier);
  await deployer.deploy(RealEstateMarket);

  var squareVerifier = await SquareVerifier.deployed();

  await deployer.deploy(SolnSquareVerifier, squareVerifier.address);
};
