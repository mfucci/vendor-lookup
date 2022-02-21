import { MAC_PREFIX_PER_VENDOR } from "./VendorDatabase";

export function isRandomMac(mac: string) {
    return ["2", "6", "A", "E", "a", "e"].includes(mac.charAt(1));
}

const vendorPrefixMap: Record<string, string> = {};
var intialized = false;

function loadDatabase() {
    for (var vendor in MAC_PREFIX_PER_VENDOR) {
        MAC_PREFIX_PER_VENDOR[vendor].forEach(prefix => vendorPrefixMap[prefix] = vendor);
    }
}

export function toVendor(mac: string) {
    if (isRandomMac(mac)) return "<random MAC>";

    if (!intialized) {
        loadDatabase();
        intialized = true;
    }

    const macFormatted = mac.replace(/:/g, "").toUpperCase();
    const vendor = vendorPrefixMap[macFormatted.slice(0, 9)]
        || vendorPrefixMap[macFormatted.slice(0, 7)]
        || vendorPrefixMap[macFormatted.slice(0, 6)];
    if (vendor === undefined) return "<unknown>";
    if (vendor === "Private") return "<private>";
    return vendor;
}