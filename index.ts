import { BIP32Interface } from "bip32";
import * as bitcoin from 'bitcoinjs-lib';
import bitcoinMessage from 'bitcoinjs-message';

const defaultPathSegwit = "m/84'/0'/0'/0/0";

async function signBitcoinSegwitKey({ signMessage, root }: { signMessage: string, root: BIP32Interface }) {
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
        signMessage,
        magicHash,
    };
}

export {
    signBitcoinSegwitKey
};