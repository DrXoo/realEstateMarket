pragma solidity >=0.4.21 <0.6.0;

import './RealEstateMarket.sol';
import './VerifierInterface.sol';

contract SolnSquareVerifier is RealEstateMarket {

    enum SolutionState { NONE, CREATED, VERIFIED, USED }

    struct Solution {
        uint256 id;
        address tokenOwnerAddress;
        SolutionState state;
    }

    VerifierInteface private verifierContract;

    mapping(bytes32 => Solution) private solutions;

    event SolutionAdded(uint256, address);

    constructor(address verifierContractAddress) public {
        verifierContract = VerifierInteface(verifierContractAddress);
    }

    function addSolution(uint256 _id) external {
        bytes32 solutionHash = _hashSolution(_id, msg.sender);

        require(solutions[solutionHash].state == SolutionState.NONE, "This solution already exists");

        Solution memory newSolution = Solution({
            id: _id,
            tokenOwnerAddress: msg.sender,
            state: SolutionState.CREATED
        });

        solutions[solutionHash] = newSolution;

        emit SolutionAdded(_id, msg.sender);
    }

    function getSolutionState(uint256 _id, address _address) external view returns(SolutionState){
        bytes32 solutionHash = _hashSolution(_id, _address);
        return solutions[solutionHash].state;
    }

    function verifySolution(uint256 _solutionId, uint[2] calldata a, uint[2][2] calldata b, uint[2] calldata c, uint[2] calldata input) external {
        bytes32 solutionHash = _hashSolution(_solutionId, msg.sender);

        require(solutions[solutionHash].state == SolutionState.CREATED, "Invalid solution state");

        bool result = verifierContract.verifyTx(a, b, c, input);

        if(result == true) {
            solutions[solutionHash].state = SolutionState.VERIFIED;
        }
    }

    function mintNFT(uint256 _solutionId, uint256 _tokenId) external returns(bool) {
        bytes32 solutionHash = _hashSolution(_solutionId, msg.sender);

        require(solutions[solutionHash].state == SolutionState.VERIFIED, "Solution is not verified");

        super._mint(msg.sender, _tokenId);
        super._setTokenURI(_tokenId);

        solutions[solutionHash].state = SolutionState.USED;
    }

    function _hashSolution(uint256 _id, address _addr) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(_id, _addr));
    }
}