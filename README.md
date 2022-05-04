# Capstone: Real Estate Marketplace

Final project for the Blockchain Developer nanodegree program (Udacity) 

## How to test this project

This project is created using Truffle so the execution of tests is as simple as
'_truffle test_' or _test_ inside the develop environment (_truffle develop_)

There are three files of tests:
1. TestRealEstateMarket.js => Tests about custom implementation of ERC721
    - The contract to test is RealEstateMarket.sol
2. TestSquareVerifier.js => Tests about the generated contract from Zokrates (an implementation of zkSnarks proof validation)
    - The contract to test is verifier.sol
3. TestSolnSquareVerifier.js => Tests about unifying the custom implementation of ERC721 and the zkSnarks contract implementation
    - The contract to test is SolnSquareVerifier.sol

## Deployement

This project is deployed on Rinkeby test network

| Contract | Address |
|----------|---------|
| Verifier.sol |  0x57966Cf356185276eD701b90f458b6EcB371F825
| SolnSquareVerifier | 0xE211830bA3B5FB6b4bcAF5134adEca3334539C81

### How to mint tokens in testnet

There is a simple WebApp to mint new tokens easily. 

npm run serve and access it from localhost:8080

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
