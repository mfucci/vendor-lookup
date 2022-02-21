import fs from "fs";
import path from "path";

import axios from "axios";

import { Settings } from "./Settings";
import { parse } from "csv-parse/sync";

const OUI_24_URL = "https://standards-oui.ieee.org/oui/oui.csv";
const OUI_28_URL = "https://standards-oui.ieee.org/oui28/mam.csv";
const OUI_36_URL = "https://standards-oui.ieee.org/oui36/oui36.csv";

const OUI_URLS = [OUI_24_URL, OUI_28_URL, OUI_36_URL];

class Updater {
    readonly settings = new Settings("vendor-lookup", "cache");
    readonly etag = this.settings.getSetting<Record<string, string>>("etags");
    readonly cache = this.settings.getSetting<Record<string, string>>("data");

    async update() {
        console.log("Updating vendor data");
        var updated = false;
        for (var url of OUI_URLS) {
            updated ||= await this.updateData(url);
        }
        if (!updated) {
            console.log("The database is already up-to-date");
            //return;
        }

        console.log("Processing vendor data");
        const result: Record<string, string[]> = {};
        OUI_URLS.forEach(url => (parse(this.cache[url], {}) as string[][])
            .forEach(([, prefix, vendor]) => (result[vendor] ?? (result[vendor] = [])).push(prefix)));
        delete result["Organization Name"] // Delete table header.

        const databasePath = path.join(__dirname, "../../src/VendorDatabase.ts");
        fs.writeFileSync(databasePath, `// Last update on ${new Date().toString()}\nexport const MAC_PREFIX_PER_VENDOR: Record<string, string[]> = ${JSON.stringify(result, undefined, 2)};`);

        console.log("Done");
    }

    private async updateData(url: string) {
        console.log(`Checking ${url}`);
        const previousEtag = this.etag[url];
        const head = await axios.head(url);
        const currentEtag = head.headers["etag"] as string;

        if (previousEtag == currentEtag) {
            console.log(`Up-to-date`);
            return false;
        }

        console.log(`Downloading ${url}`);
        const data = (await axios.get(url)).data as string;
        this.etag[url] = currentEtag;
        this.cache[url] = data;
        this.settings.save();
        return true;
    }
}

new Updater().update();