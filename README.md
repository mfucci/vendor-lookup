# vendor-lookup

Simple library with no dependencies to lookup the manufactuers from a network MAC address using an up-to-date database imported directly from IEEE registeries.

## Installation

```bash
$ npm install @network-utils/vendor-lookup
```

## Update the vendor database

```bash
$ npm run update
```

## Usage

### Example

```typescript
import {toVendor} from '@network-utils/vendor-lookup'

const vendor = toVendor('04:a1:51:1b:12:92') // Returns 'NETGEAR'
```

### `toVendor(mac: string): string`

Returns the IEEE registered vendor for the prefix of this MAC address
or '<random MAC>' if the MAC address is a random MAC (often used by mobile devices for privacy)
or '<private>' if this prefix is associated with a vendor which choosed to keep their records private
or '<unknown>' of this prefix is not in IEEE database

### `isRandom(mac: string): boolean`

Returns true if this MAC address is random