// test.ts

import { assertEquals } from "jsr:@std/assert";
import {
   strpos
 , strrpos
 , substr
 , basename
 , urlencode
 , rawurlencode
 , number_format
 , intval
 , ctype_digit
 , implode
 , range
 , array_key_exists
 , trim
 , rtrim
 , is_null
 , array_push
 , in_array
} from "./libphp.ts";

Deno.test('strpos', function() {
  assertEquals(strpos('foo', 'f'), 0);
  assertEquals(strpos('foo', 'o'), 1);
  assertEquals(strpos('foo', 'b'), false);
  assertEquals(strpos('foo bar buz', 'bar'), 4);
  assertEquals(strpos('foo bar buz', 'b', 5), 8, 'using offset');
});

Deno.test('strrpos', function() {
  assertEquals(strrpos('fooz', 'f'), 0, 'at begining');
  assertEquals(strrpos('fooz', 'o'), 2, 'at end');
  assertEquals(strrpos('fooz', 'b'), false, 'not exists');
  assertEquals(strrpos('fooz barz buzz', 'bar'), 5, 'search word');
  assertEquals(strrpos('fooz barz buzz', 'b', 6), 5, 'using offset');
});

Deno.test('substr', function() {
  assertEquals(substr('foo', 0, 1), 'f', 'substr');
  assertEquals(substr('foo', 1), 'oo', 'no length');
  assertEquals(substr('foo', 0, -1), 'fo', 'negative length');
  assertEquals(substr('foo', -1), 'o', 'negative offset 1');
  assertEquals(substr('foo', -2), 'oo', 'negative offset 2');
  assertEquals(substr('GMT+0200', -5, 3), '+02', 'negative offset 2 with length');
  assertEquals(substr('0123456789', 5, 2), '56', 'offset 2 with length');
});

Deno.test('basename', function() {
  assertEquals(basename('/c/data.csv'), 'data.csv', 'basename');
  assertEquals(basename('/c/data.csv', '.csv'), 'data', 'using suffix');
  assertEquals(basename('/c/data.csv', '.txt'), 'data.csv', 'invalid suffix');
  assertEquals(basename('/c/data/'), 'data', 'directory');
  assertEquals(basename('.'), '.', 'a dot');
  assertEquals(basename('/'), '', 'a slash');
});

Deno.test('urlencode', function() {
  assertEquals(urlencode('abcdefghijklmnopqrstuvwxyz')
    , 'abcdefghijklmnopqrstuvwxyz', 'lower alpha');
  assertEquals(urlencode('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    , 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'upper alpha');
  assertEquals(urlencode('0123456789')
    , '0123456789', 'digit');
  assertEquals(urlencode('!@#$%^&*()_+~`_-+=')
    , '%21%40%23%24%25%5E%26%2A%28%29_%2B%7E%60_-%2B%3D', 'symbol 1');
  assertEquals(urlencode('{[}]|\\:;"\'<,>.?/ ')
    , '%7B%5B%7D%5D%7C%5C%3A%3B%22%27%3C%2C%3E.%3F%2F+', 'symbol 2');
});

Deno.test('rawurlencode', function() {
  assertEquals(rawurlencode('abcdefghijklmnopqrstuvwxyz')
    , 'abcdefghijklmnopqrstuvwxyz', 'lower alpha');
  assertEquals(rawurlencode('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    , 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'upper alpha');
  assertEquals(rawurlencode('0123456789')
    , '0123456789', 'digit');
  assertEquals(rawurlencode('!@#$%^&*()_+~`_-+=')
    , '%21%40%23%24%25%5E%26%2A%28%29_%2B~%60_-%2B%3D', 'symbol 1');
  assertEquals(rawurlencode('{[}]|\\:;"\'<,>.?/ ')
    , '%7B%5B%7D%5D%7C%5C%3A%3B%22%27%3C%2C%3E.%3F%2F%20', 'symbol 2');
});

Deno.test('time', function() {

});

Deno.test('number_format', function() {
  assertEquals(number_format(1.568, 2), '1.56');
  assertEquals(number_format(128.85, 2), '128.85');
  assertEquals(number_format(3092.4, 2), '3,092.40');
  assertEquals(number_format(91025, 2), '91,025.00');
});

Deno.test('intval', function() {
  assertEquals(intval(42), 42, "intval(42)");
  assertEquals(intval(4.7), 4, "intval(4.7)");
  assertEquals(intval('42'), 42, "intval('42')");
  assertEquals(intval('+42'), 42, "intval('+42')");
  assertEquals(intval('-42'), -42, "intval('-42')");
  assertEquals(intval('4.7'), 4, "intval('4.7')");
  assertEquals(intval(true), 1, "intval(true)");
  assertEquals(intval(false), 0, "intval(false)");
});

Deno.test('ctype_digit', function() {
  assertEquals(ctype_digit('1820.20'), false, "ctype_digit('1820.20')");
  assertEquals(ctype_digit('10002'), true, "ctype_digit('10002')");
  assertEquals(ctype_digit('wsl!12'), false, "ctype_digit('wsl!12')");
  assertEquals(ctype_digit(true), false, "ctype_digit(true)");
  assertEquals(ctype_digit(false), false, "ctype_digit(false)");
  assertEquals(ctype_digit(null), false, "ctype_digit(null)");
});

Deno.test('implode', function() {
  assertEquals(implode(',', ['a','b']), 'a,b', "implode(',', ['a','b'])");
});

Deno.test('range', function() {
  assertEquals(
      implode(',',range<number>(0,5))
    , '0,1,2,3,4,5'
    , "implode(',',range(0,5))"
    );
  assertEquals(
      implode(',',range<number>(0,50,10))
    , '0,10,20,30,40,50'
    , "implode(',',range(0,50,10))"
    );
  assertEquals(
      implode(',',range<string>('a','e'))
    , 'a,b,c,d,e'
    , "implode(',',range('a','e'))"
    );
  assertEquals(
      implode(',',range<string>('A','E'))
    , 'A,B,C,D,E'
    , "implode(',',range('A','E'))"
    );
});

Deno.test('array_key_exists', function() {
  assertEquals(array_key_exists('f', {f:0}), true);
  assertEquals(array_key_exists('o', {f:0}), false);
});

Deno.test('trim', function() {
  assertEquals(trim('1foo', '1'), 'foo', 'trim 1');
  assertEquals(trim('foo1', '1'), 'foo', 'trim 2');
  assertEquals(trim('1foo1', '1'), 'foo', 'trim 3');
  assertEquals(trim('1foo', '123'), 'foo', 'trim 4');
  assertEquals(trim('foo1', '123'), 'foo', 'trim 5');
  assertEquals(trim('1foo1', '123'), 'foo', 'trim 6');
  assertEquals(trim('12foo', '123'), 'foo', 'trim 7');
  assertEquals(trim('foo12', '123'), 'foo', 'trim 8');
  assertEquals(trim('12foo13', '123'), 'foo', 'trim 9');
});

Deno.test('rtrim', function() {
  assertEquals(rtrim('1foo', '1'), '1foo', 'rtrim 1');
  assertEquals(rtrim('foo1', '1'), 'foo', 'rtrim 2');
  assertEquals(rtrim('1foo1', '1'), '1foo', 'rtrim 3');
  assertEquals(rtrim('1foo', '123'), '1foo', 'rtrim 4');
  assertEquals(rtrim('foo1', '123'), 'foo', 'rtrim 5');
  assertEquals(rtrim('1foo1', '123'), '1foo', 'rtrim 6');
  assertEquals(rtrim('12foo', '123'), '12foo', 'rtrim 7');
  assertEquals(rtrim('foo12', '123'), 'foo', 'rtrim 8');
  assertEquals(rtrim('12foo13', '123'), '12foo', 'rtrim 9');
});

Deno.test('is_null', function() {
  assertEquals(is_null(null), true, 'is_null null');
  assertEquals(is_null(true), false, 'is_null true');
  assertEquals(is_null(false), false, 'is_null false');
  assertEquals(is_null([]), false, 'is_null array');
  assertEquals(is_null(undefined), false, 'is_null undefined');
  assertEquals(is_null(''), false, 'is_null string');
  assertEquals(is_null(0), false, 'is_null number');
});

Deno.test('array_push', function() {
  assertEquals(array_push([], 1), 1, 'array_push 1');
  assertEquals(array_push([], 1, 2), 2, 'array_push 2');
});

Deno.test('in_array', function() {
  assertEquals(in_array(1, []), false, 'in_array 1');
  assertEquals(in_array(1, [1, 2]), true, 'in_array 2');
});

