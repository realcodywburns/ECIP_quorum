// NOT PRODUCTION READY! DO NOT USE THIS FOR REAL WORLD YET!
// This contract is an ECIP. It has all the basic parts and a link to the full text of the ecip(keep chain light)
// It needs an owner, be able to register with a category contract, and handle comments
// This contract needs an manager. this is set when the contract is deployed and cannot be changed.

contract owned{
  function owned () {owner = msg.sender;}
  address owner;
  modifier onlyOwner {
          if (msg.sender != owner)
              throw;
          _;
      }
}
contract ecip is owned {
 // Parameters of all ecip.
 // metadata
    string public title;       //  headline for the ecip
    string public author;      //  Author of the ecip
    string public description; //  short description of the item
    string public extUrl;      //  a link to the full text
    uint public created ;
    

//simple comment section
    uint public cCount;
    struct cmnt{
      address cmntAddr;
      string cmntText;
      string notes;
      uint stamp;
      }
      
//show comments as they arrive
    event newComment(string comment);

// store comments
    mapping(uint => cmnt) cmnts;

function startecip(string _title, string _author, string _description, string _extUrl, string _type) onlyOwner payable{
// assign ecip metadata
    title = _title;
    author = _author;
    description = _description;
    extUrl = _extUrl;
    created = now;
        
   }

function comment(string _comment) {
  uint id = cCount++;
  cmnt c = cmnts[id];
  c.cmntAddr = msg.sender;
  c.cmntText = _comment;              // the message comment
  newComment(c.cmntText);             // sends event with the new comment
  cCount = cCount ++;
  }

//allow for sequential comment pulling call address the comment for each comment in cCount
function getSender(uint _index)  constant returns (address){
  return cmnts[_index].cmntAddr;
}
function getCmnt(uint _index)  constant returns (string){
  return cmnts[_index].cmntText;
}

// allow owner to remove comments in the event of a grossly need removal this should be avoided at all costs
function rmCmnt(uint _index, string _reason) onlyOwner{
  cmnt c = cmnts[_index];
  delete c.cmntText;
  c.notes = _reason;
  c.stamp = now;
}


//safety switch
  function kill() {
      if (msg.sender == owner) selfdestruct(owner);
    }
  function bailout() {
    if (!msg.sender.send(this.balance)){
          throw;
      }
    }
  }
