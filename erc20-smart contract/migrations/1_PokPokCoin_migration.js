const PokPokCoin = artifacts.require("PokPokCoin");

module.exports = function (deployer) {
  deployer.deploy(PokPokCoin);
};
