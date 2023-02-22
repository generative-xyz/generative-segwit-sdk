"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signBitcoinSegwitKey = void 0;
const bitcoin = __importStar(require("bitcoinjs-lib"));
const bitcoinjs_message_1 = __importDefault(require("bitcoinjs-message"));
const defaultPathSegwit = "m/84'/0'/0'/0/0";
function signBitcoinSegwitKey({ message, root }) {
    const segwitChild = root.derivePath(defaultPathSegwit);
    const keyPair = bitcoin.ECPair.fromWIF(segwitChild.toWIF());
    const privateKey = segwitChild.privateKey;
    const pubKey = segwitChild.publicKey;
    const signature = bitcoinjs_message_1.default.sign(message, keyPair.privateKey, keyPair.compressed);
    const { address, network } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    const messagePrefix = network === null || network === void 0 ? void 0 : network.messagePrefix;
    const magicHash = bitcoinjs_message_1.default.magicHash(message, messagePrefix);
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
exports.signBitcoinSegwitKey = signBitcoinSegwitKey;
