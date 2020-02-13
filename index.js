var bip39 = require("bip39"),
    hdkey = require("hdkey");
    ethUtil = require("ethereumjs-util"),
    Chance = require("chance"),
    adjs = require("./adjs.js"),
    animals = require("./animals.js");

const randItem = (gen, items) =>
  items[gen.integer({min: 0, max: items.length - 1})];

while (true) {
  const mnemonic = bip39.generateMnemonic(); //generates string
  const seed = bip39.mnemonicToSeed(mnemonic); //creates seed buffer
  const root = hdkey.fromMasterSeed(seed);
  const masterPrivateKey = root.privateKey.toString('hex');

  const addrNode = root.derive("m/43'/60'/1581'/0'/0");
  const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
  const addr = ethUtil.publicToAddress(pubKey).toString('hex');
  const address = ethUtil.toChecksumAddress(addr);

  const pubKeyHex = "0x04" + pubKey.toString("hex");
  var randGen = new Chance(pubKeyHex);

  const adj1   = randItem(randGen, adjs);
  const adj2   = randItem(randGen, adjs);
  const animal = randItem(randGen, animals);

  console.log(adj1, adj2, animal, "-", mnemonic, "\n");
}
