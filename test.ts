// test.ts

import { assertEquals } from "jsr:@std/assert";
import {
   strpos
 , strrpos
 , substr
 , basename
 , urlencode
 , rawurlencode
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

