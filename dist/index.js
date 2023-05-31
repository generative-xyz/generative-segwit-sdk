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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signBitcoinSegwitPrivateKey = exports.signBitcoinSegwitRoot = void 0;
const bitcoin = __importStar(require("bitcoinjs-lib"));
const bitcoinjs_message_1 = __importDefault(require("bitcoinjs-message"));
const defaultPathSegwit = "m/84'/0'/0'/0/0";
function signBitcoinSegwitRoot({ signMessage, root }) {
    return __awaiter(this, void 0, void 0, function* () {
        const childSegwit = root.derivePath(defaultPathSegwit);
        const keyPair = bitcoin.ECPair.fromWIF(childSegwit.toWIF());
        const privateKey = childSegwit.privateKey;
        const pubKey = childSegwit.publicKey;
        const signature = bitcoinjs_message_1.default.sign(signMessage, keyPair.privateKey, keyPair.compressed);
        const { address, network } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
        const messagePrefix = network === null || network === void 0 ? void 0 : network.messagePrefix;
        const magicHash = bitcoinjs_message_1.default.magicHash(signMessage);
        const keyPairPrivateKey = keyPair.privateKey;
        return {
            privateKey,
            pubKey,
            address,
            signature,
            messagePrefix,
            message: signMessage,
            magicHash,
            keyPairPrivateKey
        };
    });
}
exports.signBitcoinSegwitRoot = signBitcoinSegwitRoot;
function signBitcoinSegwitPrivateKey({ signMessage, privateKey }) {
    return __awaiter(this, void 0, void 0, function* () {
        const keyPair = bitcoin.ECPair.fromWIF(privateKey);
        const pubKey = keyPair.publicKey;
        const signature = bitcoinjs_message_1.default.sign(signMessage, keyPair.privateKey, keyPair.compressed);
        const { address, network } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
        const messagePrefix = network === null || network === void 0 ? void 0 : network.messagePrefix;
        const magicHash = bitcoinjs_message_1.default.magicHash(signMessage);
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
    });
}
exports.signBitcoinSegwitPrivateKey = signBitcoinSegwitPrivateKey;
