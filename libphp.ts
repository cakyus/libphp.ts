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

export {
   strpos
};

