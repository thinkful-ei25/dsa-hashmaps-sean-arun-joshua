/* eslint-disable no-console */
'use strict';

const ChainedHashMap = require('./chained-hashmap');

function main() {
  const lor = new ChainedHashMap();

  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragorn');

  lor.remove('Wizard');
  console.log(lor);

  lor.set('Elf', 'Legolas');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');
  lor.set('RingBearer', 'Gollum');
  console.log(lor.capacity, lor.length);
  lor.set('LadyOfLight', 'Galadriel');
  console.log(lor.capacity, lor.length);
  lor.set('HalfElven', 'Arwen');
  console.log(lor.capacity, lor.length);
  lor.set('Ent', 'Treebeard');

  console.log(lor.get('Maiar'));
  console.log(lor);
}

main();
