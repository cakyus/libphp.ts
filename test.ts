// test.ts

import { assertEquals } from "jsr:@std/assert";
import {
   strpos
 , substr
} from "./libphp.ts";

Deno.test('strpos', function() {
  assertEquals(strpos('foo', 'f'), 0);
  assertEquals(strpos('foo', 'o'), 1);
  assertEquals(strpos('foo', 'b'), false);
  assertEquals(strpos('foo bar buz', 'bar'), 4);
  assertEquals(strpos('foo bar buz', 'b', 5), 8, 'using offset');
});

Deno.test('substr', function() {
  assertEquals(substr('foo', 0, 1), 'f', 'substr');
  assertEquals(substr('foo', 1), 'oo', 'no length');
  assertEquals(substr('foo', 0, -1), 'fo', 'negative length');
  assertEquals(substr('foo', -1), 'o', 'negative offset 1');
  assertEquals(substr('foo', -2), 'oo', 'negative offset 2');
});

