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
});

Deno.test('substr', function() {
  assertEquals(substr('foo', 0, 1), 'f');
  assertEquals(substr('foo', 1), 'oo');
});

