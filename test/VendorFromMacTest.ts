import * as assert from "assert";
import { toVendor } from "../src/VendorLookup";
import { MAC_PREFIX_PER_VENDOR } from "../src/VendorDatabase";

// IEEE re-assigns prefixes over time, so a hard-coded private prefix stops being
// private after a database update. Pick one out of the current database instead.
function aPrivatePrefix() {
    const prefix = MAC_PREFIX_PER_VENDOR["Private"]
        .find(prefix => !["2", "6", "A", "E"].includes(prefix.charAt(1)));
    assert.ok(prefix !== undefined, "no private prefix in the database");
    return prefix!.padEnd(12, "0");
}

describe("toVendor", () => {
    it("returns the vendor for a known MAC", () => {
        assert.equal(toVendor("54:83:3A:8D:72:98"), "Zyxel Communications Corporation");
    });

    it("returns <unknown> for an unknown MAC", () => {
        assert.equal(toVendor("23:11:11:8D:72:98"), "<unknown>");
    });

    it("returns <random MAC> for a random MAC", () => {
        assert.equal(toVendor("26:2f:aa:bb:12:1f"), "<random MAC>");
    });

    it("returns <private> for a private MAC", () => {
        assert.equal(toVendor(aPrivatePrefix()), "<private>");
    });
});
