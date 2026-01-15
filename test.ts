// test.ts

import { assertEquals } from "jsr:@std/assert";
import {
   strpos
 , strrpos
 , substr
 , basename
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
});

Deno.test('basename', function() {
  assertEquals(basename('/c/data.csv'), 'data.csv', 'basename');
  assertEquals(basename('/c/data.csv', '.csv'), 'data', 'using suffix');
  assertEquals(basename('/c/data.csv', '.txt'), 'data.csv', 'invalid suffix');
});

