import * as assert from "assert";
import { toVendor } from "../src/VendorLookup";

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
        assert.equal(toVendor("70:B3:D5:6F:41:22"), "<private>");
    });
});
