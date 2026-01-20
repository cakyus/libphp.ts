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

// @param float num
// @param int decimal default 0
// @param string decimal_separator default "."
// @param string thousands_separator default ","
// @return string
// @link https://www.php.net/manual/en/function.number-format.php

function number_format(
    n:number
  , decimal:number = 0
  , decimal_separator:string = '.'
  , thousands_separator:string = ','
  ) :string {

  // split integer and decimal
  const s1 = n.toString().split('.');
  let sinteger = s1[0];
  let sdecimal = '';
  if (s1.length == 2) {
    sdecimal = s1[1];
  }

  // resize sdecimal according to decimal
  sdecimal = sdecimal.substring(0, decimal);
  if (sdecimal.length < decimal) {
    // add '0' s
    sdecimal = sdecimal + '0'.repeat(decimal - sdecimal.length);
  }

  // add thousand separator
  let s :string = '';
  let end_index :number = sinteger.length;
  let begin_index :number = end_index - 3;
  const counter :number = Math.ceil(sinteger.length / 3);
  for (let i = 0; i < counter; i++) {
    if (begin_index < 0) {
      begin_index = 0;
    }
    if (i > 0) {
      s = sinteger.substring(begin_index, end_index)
        + thousands_separator + s;
    } else {
      s = sinteger.substring(begin_index, end_index);
    }
    begin_index = begin_index - 3;
    end_index = end_index - 3;
  }
  sinteger = s;

  if (sdecimal.length > 0) {
    return sinteger + decimal_separator + sdecimal;
  } else {
    return sinteger;
  }
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
 , number_format
};

