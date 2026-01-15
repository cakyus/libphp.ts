// libphp.ts

// Find the position of the first occurrence of a substring in a string.
// @link https://www.php.net/manual/en/function.strpos.php

function strpos(haystack:string, needle:string, offset:number=0) :number|false {
  const pos = haystack.indexOf(needle, offset);
  if (pos == -1) {
    return false;
  }
  return pos;
}

// Find the position of the last occurrence of a substring in a string.

function strrpos(haystack:string, needle:string, offset:number=0) :number|false {
  // reverse haystack and needle
  haystack = haystack.split('').reverse().join('');
  needle = needle.split('').reverse().join('');
  const pos = haystack.indexOf(needle, offset);
  if (pos == -1) {
    return false;
  }
  return haystack.length - needle.length - pos;
}

// Return part of string

function substr(s:string, offset:number, length:number=0) :string {

  if (arguments.length == 2) {
    length = s.length;
  }

  let begin_index = offset;
  let end_index = length;

  if (begin_index < 0) {
    begin_index = s.length + begin_index
  }

  if (end_index < 0) {
    end_index = s.length + end_index
  }

  let t = '';
  for (let i = begin_index; i < end_index; i++) {
    t += s[i];
  }

  return t;
}

export {
   strpos
 , strrpos
 , substr
};

