'use strict'; 

/*
    input: acecarr
    output: true

    input: north
    output: false

    input: Eva, Can I Stab Bats In A Cave?
    evacanistabbatsinacave
    e: 2
    v: 2
    a: 6
    c: 2
    i: 2
    s: 2
    t: 2
    b: 2
    n: 2

    output: true

    input: dda
    output: true

    input: a
    output: true

    input: test
    output: false
    t: 2
    e: 1
    s: 1

    input: aaaaa
    output: true

*/

function main(){ 
    let str = 'aaaaa'; 
    console.log(str, IsPalindromPermutation(str))
    str = 'acecarr'; 
    console.log(str, IsPalindromPermutation(str))
    str = 'north'; 
    console.log(str, IsPalindromPermutation(str))
    str = 'Eva, Can I Stab Bats In A Cave?'
    console.log(str, IsPalindromPermutation(str))
    str = ' '; 
    console.log(str, IsPalindromPermutation(str))
    str = ''
    console.log(str, IsPalindromPermutation(str))

    
}

function IsPalindromPermutation(string){ 
    string = NormalizeString(string);  
    const dict = new Map(); 

    for(const char of string){ 
        const count = dict.get(char) || 0; 
        dict.set(char, count+1); 
    }

    let seenOddCount = false; 
    for(const count of dict.values()){ 
        if( count % 2 === 1){ 
            if (seenOddCount){ 
                return false; 
            }
            seenOddCount = true; 
        }
    }
    return true; 
}

function NormalizeString(string){ 
    return string.toLowerCase().replace(/[^a-z]/g, '');  
}

main(); 