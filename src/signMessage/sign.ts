import * as bitcoin from 'bitcoinjs-lib';
import bitcoinMessage from 'bitcoinjs-message';
import { ISignMessageReq, ISignMessageResp } from "@src/signMessage/types";

const defaultPathSegwit = "m/84'/0'/0'/0/0";

function signBitcoinSegwitKey({ message, root }: ISignMessageReq): ISignMessageResp {
    const segwitChild = root.derivePath(defaultPathSegwit);
    const keyPair = bitcoin.ECPair.fromWIF(segwitChild.toWIF());

    const privateKey = segwitChild.privateKey as Buffer;
    const pubKey = segwitChild.publicKey as Buffer;

    const signature = bitcoinMessage.sign(message, keyPair.privateKey as Buffer, keyPair.compressed);

    const { address, network } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

    const messagePrefix = network?.messagePrefix;
    const magicHash = bitcoinMessage.magicHash(message, messagePrefix);

    return {
        // key
        privateKey,
        pubKey,
        address,

        // message
        messagePrefix,
        message,

        // hash message
        magicHash,

        signature,
    };
}

export {
    signBitcoinSegwitKey
};