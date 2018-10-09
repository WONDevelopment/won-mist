#!/usr/bin/env bash
TM_PATH=$(pwd)
mkdir -p ~/.meteor-dapp-wallet
rm -rf app/.meteor/local
cp -rf app ~/.meteor-dapp-wallet/
#cp -rf ../interface/packages ~/.meteor-dapp-wallet/app/
cd ~/.meteor-dapp-wallet/app
npm run-script build
rm -rf $TM_PATH/build
mv -f ../build $TM_PATH/
rm -rf ~/.meteor-dapp-wallet/