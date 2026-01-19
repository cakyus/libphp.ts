// libphp.ts

// Find the position of the first occurrence of a substring in a string.
// 
// @param string haystack
// @param string needle
// @param int offset default 0
// @return int|false
// @link https://www.php.net/manual/en/function.strpos.php

function strpos(haystack:string, needle:string, offset:number=0) :number|false {
  const pos = haystack.indexOf(needle, offset);
  if (pos == -1) {
    return false;
  }
  return pos;
}

// Find the position of the last occurrence of a substring in a string.
//
// @param string haystack
// @param string needle
// @param int offset default 0
// @return int|false
// @link https://www.php.net/manual/en/function.strrpos.php

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
// 
// @param string string
// @param int offset
// @param int length default null
// @return string
// @link https://www.php.net/manual/en/function.substr.php

function substr(s:string, offset:number, length:number=0) :string {

  if (arguments.length == 2) {
    length = s.length;
  }

  let begin_index = offset;
  let end_index = length;


  if (begin_index < 0) {
    begin_index = s.length + begin_index
    end_index = begin_index + length;
  }

  if (end_index < 0) {
    end_index = s.length + end_index
  }

  // avoid outbound
  if (end_index > s.length) {
    end_index = s.length;
  }

  let t = '';
  for (let i = begin_index; i < end_index; i++) {
    t += s[i];
  }

  return t;
}

// Returns trailing name component of path.
//
// @param string path
// @param string suffix default ''
// @return string
// @link https://www.php.net/manual/en/function.basename.php

function basename(path:string, suffix:string='') :string {

  let name :string = '';

  if (substr(path, -1) == '/') {
    path = substr(path, 0, -1);
  }

  const pos1 = strrpos(path, '/');
  if (pos1 === false) {
    name = path;
  } else {
    name = substr(path, pos1 + 1);
  }

  if (suffix.length > 0) {
    const pos2 = strrpos(name, suffix);
    if (pos2 === false) {
      // do nothing
    } else {
      name = substr(name, 0, pos2);
    }
  }

  return name;
}

// Decodes a JSON string
//
// @params string text
// @params bool associative optional
// @params int depth default 512
// @params int flags default 0
// @return mixed
// @link https://www.php.net/manual/en/function.json-decode.php

function json_decode(text:string) :object {
  // remove NULL char at the end
  if (text.charCodeAt(text.length - 1) == 0) {
    text = text.substring(0, text.length - 1);
  }
  return JSON.parse(text);
}

// Returns the JSON representation of a value
//
// @param mixed value
// @param int flag default 0
// @param int depth default 512
// @return string|false
// @link https://www.php.net/manual/en/function.json-encode.php

function json_encode(data:object) :string {
  return JSON.stringify(data);
}

// URL-encodes string
//
// It is encoded the same way that the posted data from a WWW form is encoded,
// that is the same way as in application/x-www-form-urlencoded media type.
//
// This differs from the RFC 3986 encoding (see rawurlencode())
// in that for historical reasons, spaces are encoded as plus (+) signs.
//
// @param string string
// @return string
// @link https://www.php.net/manual/en/function.urlencode.php

function urlencode(s:string) :string {
  return encodeURIComponent(s)
    .replace('%20','+')
    .replace('!','%21')
    .replace('*','%2A')
    .replace('(','%28')
    .replace(')','%29')
    .replace('~','%7E')
    .replace('\'','%27')
    ;
}

// URL-encode according to RFC 3986
//
// Used for protecting literal characters from being interpreted as special URL
// delimiters, and for protecting URLs from being mangled by transmission media
// with character conversions (like some email systems).
//
// @param string string
// @return string
// @link https://www.php.net/manual/en/function.rawurlencode.php

function rawurlencode(s:string) :string {
  return encodeURIComponent(s)
    .replace('!','%21')
    .replace('*','%2A')
    .replace('(','%28')
    .replace(')','%29')
    .replace('\'','%27')
    ;
}

// Return current Unix timestamp
//
// @return int
// @link https://www.php.net/manual/en/function.time.php

function time() :number {
  const d = new Date();
  // use floor() to avoid returning time in the future
  return Math.floor(d.getTime() / 1000);
}


export {
   strpos
 , strrpos
 , substr
 , basename
 , json_decode
 , json_encode
 , urlencode
 , rawurlencode
 , time
};

