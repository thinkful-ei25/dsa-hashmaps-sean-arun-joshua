'use strict';

function hashString(string) {
  let hash = 5381;
  for (let i = 0; i < string.length; i += 1) {
    // get ascii character code
    // multiple the existing hash by 33
    // add the character code to it
    // convert back to integer

    hash = (hash << 5) + hash + string.charCodeAt(i);
    hash = hash & hash;
  }
  // zero fill the upper 32 bits to ensure it is treated like a positive number
  return hash >>> 0;
}

class ChainedHashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this.slots = [];
    this.capacity = initialCapacity;
  }

  _findSlot(key) {
    const hash = hashString(key);
    return hash % this.capacity;
  }

  _resize(size) {
    const oldSlots = this.slots;

    this.capacity = size;
    this.length = 0;
    this.slots = [];

    for (const slot of oldSlots) {
      if (slot) {
        for (const item of slot) {
          this.set(item.key, item.value);
        }
      }
    }
  }

  set(key, value) {
    // check if we're overcapacity (use MAX_LOAD_RATIO)
    //   resize()
    const load = (this.length + 1) / this.capacity;
    if (load >= ChainedHashMap.MAX_LOAD_RATIO) {
      this._resize(this.capacity * ChainedHashMap.RESIZE_RATIO);
    }

    // find index
    const index = this._findSlot(key);
    const slot = this.slots[index];

    // Check if this slot has a list in it
    if (!slot) {
      // no collisions
      this.slots[index] = [{ key, value }];
      this.length += 1;
    } else {
      //Figure out if colliding or overwriting
      // Collide: there is no object in the list slot that has a key of `key`
      // Overwrite: there is such an object
      const object = slot.find((item) => item.key === key);
      if (!object) {
        //Collision
        slot.push({ key, value });
        this.length += 1;
      } else {
        object.value = value;
      }
    }
  }

  get(key) {
    const index = this._findSlot(key);
    if (this.slots[index] === undefined) {
      throw new Error('KeyError: Could not find key');
    }

    // let found;
    // if (this.slots[index][0].key !== key) {
    //   // traverse through array
    //   this.slots[index].forEach((item) => {
    //     if (item.key === key) {
    //       found = item;
    //     }
    //   });
    // } else {
    //   found = this.slots[index][0];
    // }

    const found = this.slots[index].find((item) => item.key === key);

    if (!found) {
      throw new Error('KeyError: Could not find key');
    }

    return found.value;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this.slots[index];
    if (!slot) {
      throw new Error('KeyError: Unknown key');
    }

    const found = this.slots[index].find((item) => item.key === key);
    if (!found) {
      throw new Error('KeyError: Unknown key');
    }

    const indexToDelete = slot.indexOf(found);
    slot.splice(indexToDelete, 1);

    this.length -= 1;
  }
}

ChainedHashMap.MAX_LOAD_RATIO = 0.9;
ChainedHashMap.RESIZE_RATIO = 3;

module.exports = ChainedHashMap;
