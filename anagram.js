'use strict';

/*
input: array
output: multidimensional array of anagrams grouped together

eg.:
  [dog, cat, gerbal] => [[dog], [cat], [gerbal]]
  [dog, god, plants, ants, tans] => [[dog, god], [plants], [ants, tans]]
  [east, teas, eats] => [[eats, teas, eats]]
  [t, t, t] => [[t, t, t]

Human solution: O(n*n!)
  For each word in the list: O(n)
    Generate all the permutations (anagrams) of that word
    For each permutaion: O(n!)
      Check if it's in the list of words
        If so, add to a list of permutations for that word

What Sean is actually doing:
  For a given pair, you're checking to see if they have the same letters

Sort characters and store that in a hashmap as the key

For each word in list: O(N)
  sort the word alphabetically (normalizedWord) O(nlog(W))
  get the value of normalizedWord out of my hashmap O(1)
  if value exists, push word into the value-list  O(1)
  if not, set normalizedWord in the hashmap with value: [word] O(1)

return hashmap.values() O(N)
 */

function groupAnagrams(anagrams) {
  const groupedAnagrams = new Map();

  for (const anagram of anagrams) {
    const sorted = anagram
      .split('')
      .sort()
      .join('');
    const group = groupedAnagrams.get(sorted);
    if (group) {
      group.push(anagram);
    } else {
      groupedAnagrams.set(sorted, [anagram]);
    }
  }

  return Array.from(groupedAnagrams.values());
}

function testGroupAnagrams() {
  let anagrams = ['dog', 'cat', 'gerbal'];
  console.log(anagrams, groupAnagrams(anagrams));
  anagrams = ['dog', 'god', 'plants', 'ants', 'tans'];
  console.log(anagrams, groupAnagrams(anagrams));
  anagrams = ['eats', 'teas', 'east'];
  console.log(anagrams, groupAnagrams(anagrams));
  anagrams = ['t', 't', 't'];
  console.log(anagrams, groupAnagrams(anagrams));
}

testGroupAnagrams();
