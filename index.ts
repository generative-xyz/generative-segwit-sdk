import { BIP32Interface } from "bip32";
import * as bitcoin from 'bitcoinjs-lib';
import bitcoinMessage from 'bitcoinjs-message';

const defaultPathSegwit = "m/84'/0'/0'/0/0";

async function signBitcoinSegwitRoot({ signMessage, root }: { signMessage: string, root: BIP32Interface }) {
    const childSegwit = root.derivePath(defaultPathSegwit);
    const keyPair = bitcoin.ECPair.fromWIF(childSegwit.toWIF());

    const privateKey = childSegwit.privateKey as Buffer;
    const pubKey = childSegwit.publicKey as Buffer;
    const signature = bitcoinMessage.sign(signMessage, keyPair.privateKey as Buffer, keyPair.compressed);
    const { address, network } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    const messagePrefix = network?.messagePrefix;
    const magicHash = bitcoinMessage.magicHash(signMessage);

    return {
        privateKey,
        pubKey,
        address,
        signature,

        messagePrefix,
        message: signMessage,
        magicHash,
    };
}

async function signBitcoinSegwitPrivateKey({ signMessage, privateKey }: { signMessage: string, privateKey: string }) {
    const keyPair = bitcoin.ECPair.fromWIF(privateKey)
    const pubKey = keyPair.publicKey as Buffer;
    const signature = bitcoinMessage.sign(signMessage, keyPair.privateKey as Buffer, keyPair.compressed);
    const { address, network } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    const messagePrefix = network?.messagePrefix;
    const magicHash = bitcoinMessage.magicHash(signMessage);

    const keyPairPrivateKey = keyPair.privateKey;

    return {
        privateKey,
        pubKey,
        address,
        signature,

        messagePrefix,
        message: signMessage,
        magicHash,

        keyPairPrivateKey,
    };
}

export {
    signBitcoinSegwitRoot,
    signBitcoinSegwitPrivateKey
};