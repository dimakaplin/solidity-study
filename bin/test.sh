#!/bin/bash
ganache-cli > /dev/null &
sleep 5
truffle compile
truffle migrate --reset
truffle test test/metacoin.js
kill -9 $(lsof -t -i:8545)