// libphp.ts

// Find the position of the first occurrence of a substring in a string.
// @link https://www.php.net/manual/en/function.strpos.php

function strpos(haystack:string, needle:string, offset:number=0) :number|false {
  const pos = haystack.indexOf(needle);
  if (pos == -1) {
    return false;
  }
  return pos;
}

// Return part of string

function substr(s:string, offset:number, length:number=0) :string {

  if (arguments.length == 2) {
    length = s.length;
  }

  if (offset < 0) {
    offset = s.length + offset
  }

  return s.substring(offset, offset + length);
}

export {
   strpos
 , substr
};

