import { BIP32Interface } from "bip32";
declare function signBitcoinSegwitRoot({ signMessage, root }: {
    signMessage: string;
    root: BIP32Interface;
}): Promise<{
    privateKey: Buffer;
    pubKey: Buffer;
    address: any;
    signature: any;
    messagePrefix: any;
    message: string;
    magicHash: any;
    keyPair: any;
}>;
declare function signBitcoinSegwitPrivateKey({ signMessage, privateKey }: {
    signMessage: string;
    privateKey: string;
}): Promise<{
    privateKey: string;
    pubKey: Buffer;
    address: any;
    signature: any;
    messagePrefix: any;
    message: string;
    magicHash: any;
}>;
export { signBitcoinSegwitRoot, signBitcoinSegwitPrivateKey };
