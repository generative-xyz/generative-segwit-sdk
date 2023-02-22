/// <reference types="node" />
import { BIP32Interface } from "bip32";
declare function signBitcoinSegwitKey({ signMessage, root }: {
    signMessage: string;
    root: BIP32Interface;
}): Promise<{
    privateKey: Buffer;
    pubKey: Buffer;
    address: string | undefined;
    signature: Buffer;
    messagePrefix: string | undefined;
    signMessage: string;
    magicHash: Buffer;
}>;
export { signBitcoinSegwitKey };
