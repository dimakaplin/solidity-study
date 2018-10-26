var MetaCoin = artifacts.require("./MetaCoin.sol");
describe("It is rewritting of Metacoin Contract, in this implementation value of sended coins depends on string name", function () {
  contract('MetaCoin', function(accounts) {  
    it("should put 10000 MetaCoin in the first account", function() {
      return MetaCoin.deployed().then(function(instance) {
        return instance.getBalance.call(accounts[0]);
      }).then(function(balance) {
        assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
      });
    });
    it("should call a function that depends on a linked library", function() {
      var meta;
      var metaCoinBalance;
      var metaCoinEthBalance;

      return MetaCoin.deployed().then(function(instance) {
        meta = instance;
        return meta.getBalance.call(accounts[0]);
      }).then(function(outCoinBalance) {
        metaCoinBalance = outCoinBalance.toNumber();
        return meta.getBalanceInEth.call(accounts[0]);
      }).then(function(outCoinBalanceEth) {
        metaCoinEthBalance = outCoinBalanceEth.toNumber();
      }).then(function() {
        assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
      });
    });
    it("can set name as string", function() {
      var newName = "NaN";
      var meta;
      return MetaCoin.deployed().then(function(instance) {
        meta = instance;
        meta.setName(newName);
        return meta.getName.call();
      }).then(function(name){
      // console.log(name);
        assert.equal(name, newName, "its not good, setter of name does`t")})
    });
    it("should send coin correctly", function() {
      var meta;

      // Get initial balances of first and second account.
      var account_one = accounts[0];
      var account_two = accounts[1];
      var coins;
      var account_one_starting_balance;
      var account_two_starting_balance;
      var account_one_ending_balance;
      var account_two_ending_balance;

      

      return MetaCoin.deployed().then(function(instance) {
        meta = instance;
        return meta.getBalance.call(account_one);
      }).then(function(balance) {
        account_one_starting_balance = balance.toNumber();
        return meta.getBalance.call(account_two);
      }).then(function(balance) {
        account_two_starting_balance = balance.toNumber();
        return meta.sendCoin(account_two, {from: account_one});
      }).then(function() {
        return meta.getBalance.call(account_one);
      }).then(function(balance) {
        account_one_ending_balance = balance.toNumber();
        return meta.getBalance.call(account_two);
      }).then(function(balance) {
        account_two_ending_balance = balance.toNumber();
      }).then(function() {
        return meta.amountFromName.call();
      }).then(function(coin){coins = coin.toNumber()
        console.log(coins)
        assert.equal(account_one_ending_balance, account_one_starting_balance - coins, "Amount wasn't correctly taken from the sender");
        assert.equal(account_two_ending_balance, account_two_starting_balance + coins, "Amount wasn't correctly sent to the receiver");
      });
      
    });
  });
});