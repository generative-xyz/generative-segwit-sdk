import { BIP32Interface } from "bip32";

interface ISignMessageReq {
    message: string,
    root: BIP32Interface
}

interface ISignMessageResp {
    privateKey: Buffer,
    pubKey: Buffer,
    address: string | undefined,

    messagePrefix: string | undefined,
    message: string,
    magicHash: Buffer,

    signature: Buffer,
}

export {
    ISignMessageReq,
    ISignMessageResp
}