pragma solidity >=0.4.21 <0.6.0;

contract VerifierInteface {
    function verifyTx(uint[2] calldata a, uint[2][2] calldata b, uint[2] calldata c, uint[2] calldata input) external returns (bool r);
}