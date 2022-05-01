pragma solidity ^0.5.0;

import './Ownable.sol';

contract ERC165 is Ownable {
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;
    /*
     * 0x01ffc9a7 ===
     *     bytes4(keccak256('supportsInterface(bytes4)'))
     */
    bool private _paused;
    event Paused();
    event Unpaused();

    /**
     * @dev a mapping of interface id to whether or not it's supported
     */
    mapping(bytes4 => bool) private _supportedInterfaces;

    modifier whenNotPaused() 
    {
        require(_paused, "Contract is paused");
        _;
    }

    modifier IsPaused() 
    {
        require(!_paused, "Contract is not paused");
        _;
    }

    /**
     * @dev A contract implementing SupportsInterfaceWithLookup
     * implement ERC165 itself
     */
    constructor () internal {
        _paused = false;
        _registerInterface(_INTERFACE_ID_ERC165);
    }

    /**
     * @dev implement supportsInterface(bytes4) using a lookup table
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool) {
        return _supportedInterfaces[interfaceId];
    }

    /**
     * @dev internal method for registering an interface
     */
    function _registerInterface(bytes4 interfaceId) internal {
        require(interfaceId != 0xffffffff);
        _supportedInterfaces[interfaceId] = true;
    }

    function setPauseState(bool newState) onlyOwner external 
    {
        require(_paused != newState, "New state cannot be the same as the previous one");
        _paused = newState;
        if(_paused)
        {
            emit Paused();
        } 
        else 
        {
            emit Unpaused();
        }
    }
}