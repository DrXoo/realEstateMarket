pragma solidity ^0.5.0;

import './ERC721Enumerable.sol';
import './Oraclize.sol';

contract ERC721Metadata is ERC721Enumerable, usingOraclize {
    
    string private _name;
    string private _symbol;
    string private _baseTokenURI;

    mapping (uint256 => string) private _tokenURIs;

    bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x5b5e139f;
    /*
     * 0x5b5e139f ===
     *     bytes4(keccak256('name()')) ^
     *     bytes4(keccak256('symbol()')) ^
     *     bytes4(keccak256('tokenURI(uint256)'))
     */


    constructor (string memory name, string memory symbol, string memory baseTokenURI) public {
        _name = name;
        _symbol = symbol;
        _baseTokenURI = baseTokenURI;

        _registerInterface(_INTERFACE_ID_ERC721_METADATA);
    }

    function getName() external view returns (string memory) {
        return _name;
    } 

    function getSymbol() external view returns (string memory) {
        return _symbol;
    } 

    function getBaseTokenURI() external view returns (string memory) {
        return _baseTokenURI;
    } 

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId));
        return _tokenURIs[tokenId];
    }

    function _setTokenURI(uint256 tokenId) internal {
        require(bytes(_tokenURIs[tokenId]).length != 0, "Token ID must exist");
        _tokenURIs[tokenId] = strConcat(_baseTokenURI, uint2str(tokenId));
    }
}