const Web3 = require('web3');


//use epool for api point
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


exports.multihome = (req, res) => {
var endUserAbi = [{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"userName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"fCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"cCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_action","type":"uint256"},{"name":"_index","type":"uint256"},{"name":"_frndAddr","type":"address"},{"name":"_fUsrname","type":"string"}],"name":"modFrnd","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"friendAddr","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"verifier","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"friendName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"extUrl","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"title","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"bailout","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_msg","type":"string"}],"name":"veriPass","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getSite","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"avatar","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"GetProfile","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"description","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"Count","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"pgp","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"author","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getFrndTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"creationTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_author","type":"string"},{"name":"_title","type":"string"},{"name":"_description","type":"string"},{"name":"_extUrl","type":"string"},{"name":"_avatar","type":"string"},{"name":"_pgp","type":"string"}],"name":"startMultipass","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_action","type":"uint256"},{"name":"_index","type":"uint256"},{"name":"_aSite","type":"string"},{"name":"_aUsrname","type":"string"},{"name":"_aUrl","type":"string"}],"name":"modPass","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"site","type":"string"},{"indexed":false,"name":"username","type":"string"},{"indexed":false,"name":"url","type":"string"}],"name":"newComment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"verification","type":"string"}],"name":"verification","type":"event"}]


//project abi

//address of the master registery contract
var multiPassMaster = '0x0e563f7355c39dE2C8eC462016BaF89e949023Df';
var masterAbi = [{"constant":true,"inputs":[],"name":"pendingReturns","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ownerCheck","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"adminCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newContract","type":"address"}],"name":"register","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"aList","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"bailout","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"nameTag","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"Count","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"returnCheck","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_admin","type":"address"},{"name":"_action","type":"uint256"},{"name":"_index","type":"uint256"}],"name":"modAdmin","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_index","type":"uint256"},{"name":"_contractAddr","type":"address"},{"name":"_action","type":"uint256"},{"name":"_reason","type":"string"},{"name":"_reprice","type":"uint256"},{"name":"_newName","type":"string"}],"name":"modCategory","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newUser","type":"address"}],"name":"newCommit","type":"event"}];

//find all contracts. two categories; business or person
var masterCount = web3.eth.contract(masterAbi).at(multiPassMaster).Count();
var masterList = [];
for (i = 0; i < masterCount; i++){
  var addr = web3.eth.contract(masterAbi).at(multiPassMaster).aList(i);
  masterList[i] =  addr;
}

/**
 * GET /
 * userAccounts for each account registered on the master contract, get the meta data
 */


console.log('Multipass found %s users', masterList.length);
console.log(masterList);
  // a list of accounts to get info from
  var accounts = [];
  var userPass = [];
  console.log(1);
  for (i = 0; i < masterList.length; i++){
    try{
      contractAddr = masterList[i];
      author = web3.eth.contract(endUserAbi).at(masterList[i]).author();
      title = web3.eth.contract(endUserAbi).at(masterList[i]).title();
      bio = web3.eth.contract(endUserAbi).at(masterList[i]).description();
      extUrl = web3.eth.contract(endUserAbi).at(masterList[i]).extUrl();
      imgUrl = web3.eth.contract(endUserAbi).at(masterList[i]).avatar();

      mProof= web3.eth.contract(endUserAbi).at(masterList[i]).verifier();
      //get site data for each user
      count = web3.eth.contract(endUserAbi).at(masterList[i]).Count();
      fCount = web3.eth.contract(endUserAbi).at(masterList[i]).fCount();
      multipassList = [];
      for (c = 0; c < count; c++){

        mSite = web3.eth.contract(endUserAbi).at(masterList[i]).getSite(c);
        mUser = web3.eth.contract(endUserAbi).at(masterList[i]).userName(c);
        mVerify= web3.eth.contract(endUserAbi).at(masterList[i]).GetProfile(c);
        mTime = web3.eth.contract(endUserAbi).at(masterList[i]).getTime(c);
        multipassList[c] = {site : mSite , User : mUser, mUrl : mVerify, mTime : mTime};
      }
      multipassFrnd = [];
      for (f = 0; f < fCount; f++){

        fAddr = web3.eth.contract(endUserAbi).at(masterList[i]).friendAddr(f);
        fUser = web3.eth.contract(endUserAbi).at(masterList[i]).friendName(f);
        fTime = web3.eth.contract(endUserAbi).at(masterList[i]).getFrndTime(f);
        multipassFrnd[c] = {fAddr : fAddr , fUser : fUser, fTime : fTime};
      }

      //make a nice package of everything

      userPass[i] = { author : author, title : title, bio : bio , extUrl : extUrl, mProof : mProof, imgUrl : imgUrl, multipassList : multipassList, contractAddr: contractAddr , multipassFrnd : multipassFrnd};
    }
    catch (err){
      console.log(err);
    }
  }
  var tPrice = web3.eth.contract(masterAbi).at(multiPassMaster).price();
  tPrice =  tPrice*.000000000000000001;
  var data = {masterList, userPass, multiPassMaster, tPrice};
  res.render('multihome', data);
};
