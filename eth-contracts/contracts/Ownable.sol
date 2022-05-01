pragma solidity ^0.5.0;

contract Ownable {

    address private _owner;
        
    event ownershipTransfered(address newOwner);

    constructor() internal {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the owner can do this action");
        _;
    }

    function getOwner() public view returns(address) {
        return _owner;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(_owner != newOwner, "New owner must be different from current owner");
        require(msg.sender == tx.origin, "A contract cannot make this operation");

        _owner = newOwner;
        emit ownershipTransfered(_owner);
    }
}