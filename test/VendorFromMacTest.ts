import * as assert from "assert";
import { vendorFromMac } from "../src/VendorFromMac";

describe("vendorFromMac", () => {
    it("returns the vendor for a known MAC", () => {
        assert.equal(vendorFromMac("54:83:3A:8D:72:98"), "Zyxel Communications Corporation");
    });

    it("returns <unknown> for an unknown MAC", () => {
        assert.equal(vendorFromMac("23:11:11:8D:72:98"), "<unknown>");
    });

    it("returns <random MAC> for a random MAC", () => {
        assert.equal(vendorFromMac("26:2f:aa:bb:12:1f"), "<random MAC>");
    });

    it("returns <private> for a private MAC", () => {
        assert.equal(vendorFromMac("70:B3:D5:6F:41:22"), "<private>");
    });
});
