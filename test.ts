// test.ts

import { assertEquals } from "jsr:@std/assert";
import {
   strpos
} from "./libphp.ts";

Deno.test('strpos', function() {
  assertEquals(strpos('foo', 'f'), 0);
  assertEquals(strpos('foo', 'o'), 1);
  assertEquals(strpos('foo', 'b'), false);
  assertEquals(strpos('foo bar buz', 'bar'), 4);
});

