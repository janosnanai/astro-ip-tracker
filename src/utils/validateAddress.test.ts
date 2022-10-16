import { describe, expect, it } from "vitest";

import validateAddress, { AddressTypes } from "./validateAddress";

describe("validateAddress", () => {
  it("should recognize and pass valid ipv4", () => {
    const test1 = validateAddress("192.168.0.1");
    expect(test1.isValid).toBe(true);
    expect(test1.type).toBe(AddressTypes.IPV4);

    const test2 = validateAddress("0.0.0.0");
    expect(test2.isValid).toBe(true);
    expect(test2.type).toBe(AddressTypes.IPV4);

    const test3 = validateAddress("255.255.255.255");
    expect(test3.isValid).toBe(true);
    expect(test3.type).toBe(AddressTypes.IPV4);
  });

  it("should recognize and pass valid ipv6", () => {
    const test1 = validateAddress("ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff");
    expect(test1.isValid).toBe(true);
    expect(test1.type).toBe(AddressTypes.IPV6);

    const test2 = validateAddress("::");
    expect(test2.isValid).toBe(true);
    expect(test2.type).toBe(AddressTypes.IPV6);

    const test3 = validateAddress("1234:abcd:ef::");
    expect(test3.isValid).toBe(true);
    expect(test3.type).toBe(AddressTypes.IPV6);
  });

  it("should recognize and pass valid domain url", () => {
    const test1 = validateAddress("www.google.com");
    expect(test1.isValid).toBe(true);
    expect(test1.type).toBe(AddressTypes.DOMAIN);

    const test2 = validateAddress("vitest.dev");
    expect(test2.isValid).toBe(true);
    expect(test2.type).toBe(AddressTypes.DOMAIN);

    const test3 = validateAddress("https://asdf3.qwerty.hello.ggwp");
    expect(test3.isValid).toBe(true);
    expect(test3.type).toBe(AddressTypes.DOMAIN);
  });

  it("should fail on invalid input", () => {
    const test1 = validateAddress("-google.com");
    expect(test1.isValid).toBe(false);
    expect(test1.type).toBe(undefined);

    const test2 = validateAddress("im.badbrorlybadsobadomg");
    expect(test2.isValid).toBe(false);
    expect(test2.type).toBe(undefined);

    const test3 = validateAddress("192.168.x.1");
    expect(test3.isValid).toBe(false);
    expect(test3.type).toBe(undefined);

    const test4 = validateAddress("::hello");
    expect(test4.isValid).toBe(false);
    expect(test4.type).toBe(undefined);

    const test5 = validateAddress(":f:::::::::::::::::::::::::::");
    expect(test5.isValid).toBe(false);
    expect(test5.type).toBe(undefined);

    const test6 = validateAddress(":");
    expect(test6.isValid).toBe(false);
    expect(test6.type).toBe(undefined);

    // @ts-ignore
    const test7 = validateAddress(undefined);
    expect(test7.isValid).toBe(false);
    expect(test7.type).toBe(undefined);
  });
});
