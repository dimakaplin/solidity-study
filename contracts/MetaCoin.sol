pragma solidity ^0.4.18;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. tx.originCheers!

contract MetaCoin {
    mapping (address => uint) balances;
    string name = "dimakaplin";    

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() public {
        balances[tx.origin] = 10000;
    }

    function setName(string _name) public {
        name = _name;
    }

    function getName() public view returns (string) {
        return name;
    }    

    function sendCoin(address _receiver) public returns(bool sufficient) {
        // if (balances[msg.sender] < amount) return false;
        uint8 amount = amountFromName();
        balances[msg.sender] -= amount;
        balances[_receiver] += amount;
        emit Transfer(msg.sender, _receiver, amount);
        return true;
    }

    function getBalanceInEth(address _address) public view returns(uint){
        return ConvertLib.convert(getBalance(_address),2);
    }

    function getBalance(address _address) public view returns(uint) {
        return balances[_address];
    }

    function amountFromName() public view returns (uint8) {
        return uint8(keccak256(name))%100;
    }
}
