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

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this.slots = [];
    this.capacity = initialCapacity;
    this.deleted = 0;
  }

  _findSlot(key) {
    const hash = hashString(key);
    const start = hash % this.capacity;
    for (let i = start; i < start + this.capacity; i += 1) {
      const index = i % this.capacity;
      const slot = this.slots[index];
      if (!slot || (slot.key === key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this.slots;

    this.capacity = size;
    this.length = 0;
    this.slots = [];
    this.deleted = 0;

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  set(key, value) {
    // check if we're overcapacity (use MAX_LOAD_RATIO)
    //   resize()
    const load = (this.length + this.deleted + 1) / this.capacity;
    if (load >= HashMap.MAX_LOAD_RATIO) {
      this._resize(this.capacity * HashMap.RESIZE_RATIO);
    }

    // find index
    const index = this._findSlot(key);

    // store new {key, value} at index
    this.slots[index] = { key, value, deleted: false };
    // increase length
    this.length += 1;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this.slots[index] === undefined) {
      throw new Error('KeyError: Could not find key');
    }

    return this.slots[index].value;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this.slots[index];
    if (!slot) {
      throw new Error('KeyError: Unknown key');
    }

    slot.deleted = true;
    this.length -= 1;
    this.deleted += 1;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.RESIZE_RATIO = 3;

module.exports = HashMap;
