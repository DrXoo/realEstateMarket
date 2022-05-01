pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import "./Oraclize.sol";
import './ERC721Metadata.sol';

contract RealEstateMarket is ERC721Metadata("Find Your Home", "H", "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/") {

    function mint(address to, uint256 tokenId) onlyOwner external returns(bool){
        super._mint(to, tokenId);
        super._setTokenURI(tokenId);

        return true;
    }
}