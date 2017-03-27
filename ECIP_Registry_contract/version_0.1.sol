// NOT PRODUCTION READY! DO NOT USE THIS FOR REAL WORLD YET!
// This contract is an ECIP registry. It has all the basic parts and a link to the full text of the ecip(keep chain light)
// It needs an owner and administrators to manage registered ECIPs
pragma solidity ^0.4.10;

contract owned{
  function owned () {owner = msg.sender;}
  address owner;
  modifier onlyOwner {
          if (msg.sender != owner)
              throw;
          _;
      }
}

contract mpmaster is owned{
  uint public aCount;               //running count of the number of contracts registered
  uint public adminCount;           //running couint of the number of admins
  uint public ticketPrice = 0;      //current cost to reigster an ECIP
  uint pendingReturns = 0;          //amount in the till
  string public nameTag;            //public name of the registry

  // administrator array
  struct admin {
    address adminAddr;
    }

  // registered element array
  struct ecip {
    address ecipAddr;
    string category;
    address addBy;
    string changeReason;
    uint dateChanged;
    address changedBy;
    }

  // registered voter array needs refinement vote tracking etc
  struct voter{
    address voterAddr;
  }

  //map ecip, voter, and administrator
  mapping(uint => ecip) ecips;
  mapping(uint => admin) adminList;
  mapping(uint => voter) voters;


//this is the function that gets called when people send money to the contract.
//check to see if they paid enough, used for registering individual ecips 
function() public payable {
    if(msg.value < ticketPrice){
     throw;
    }
    uint id = aCount++ ;
    ecip a = ecips[id];
    a.ecipAddr = msg.sender;
    pendingReturns += msg.value;
}


//used by contract owner to withdraw ticket fees
function withdraw() returns (bool){
    var amount = pendingReturns;
    if (amount > 0) {
        // It is important to set this to zero because the recipient
        // can call this function again as part of the receiving call
        // before `send` returns.
        pendingReturns = 0;
        if (!msg.sender.send(amount)) {
            // No need to call throw here, just reset the amount owing
            pendingReturns = amount;
            return false;
        }
    }
    return true;
  }


function init() onlyOwner{
//assigns the superadmin of multipass and assigns them to be the first admin
  owner = msg.sender;
  adminList[1].adminAddr = msg.sender;
}


// admin management by owner
function modAdmin(address _admin, uint _action, uint _index) onlyOwner{
//options are 1 add, 2 del, 3 mod
  if (_action == 1){
    uint id = adminCount++;
    adminList[id].adminAddr = _admin;
  }
  if (_action == 2){
    delete adminList[_index].adminAddr;
    adminCount = adminCount -1;
  }
  if (_action == 3){
    adminList[_index].adminAddr = _admin;
  }
}

function modCategory(address _contractAddr, string _contractCat, uint _action, uint _index, string _reason, uint _reprice, string _newName){
//allows admins to add and remove ecip contracts to the master database
//check to see if the sender is an approved admin
  uint adminCheck = 0;
  for(uint i; i < adminCount; i ++){
    if (msg.sender == adminList[i].adminAddr){
      adminCheck = 1;
    }

  if (adminCheck != 1){
    throw;
  }

// allow the admin to 1 add, 2 del, 3 mod, 4 reprice, 5 name the ecip registry
if (_action == 1){
     uint id = aCount++;
     ecip a = ecips[id];
     a.ecipAddr = _contractAddr;
     a.dateChanged = now;
     a.changedBy = msg.sender;
     a.changeReason = _reason;
     aCount = aCount ++;
     }

   if (_action == 2){
     aCount = aCount-1;
     a = ecips[_index];
     delete a.ecipAddr;
     delete a.dateChanged;
     delete a.changedBy;
     delete a.changeReason;
     }

   if (_action == 3){
    a = ecips[_index];
    a.ecipAddr = _contractAddr;
    a.dateChanged = now;
    a.changedBy = msg.sender;
    a.changeReason = _reason;
    }

  if (_action == 4){
    ticketPrice = _reprice;
  }

  if (_action == 5){
    nameTag = _newName;
    }
  }
}
//Outputs

//General

//who is an admin
function adList(uint _index) constant returns (address){
  return adminList[_index].adminAddr;
  }

//read from T-trade.io
//total count of catManagers
function Count() constant returns (uint){
return aCount;
  }
//returns an ecip address
function aList(uint _index) constant returns (address){
  return ecips[_index].ecipAddr;
  }
//returns ecip categories
function aCat(uint _index) constant returns (string){
  return ecips[_index].category;
  }
//returns which admin added the ecip
function addedBy(uint _index) constant returns (address){
  return ecips[_index].addBy;
  }

//safety
function kill() public {
  if (msg.sender != owner){
    throw;
    }
  selfdestruct(owner);
  }

}
