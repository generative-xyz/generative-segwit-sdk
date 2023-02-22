import { ISignMessageReq, ISignMessageResp } from "@src/signMessage/types";
declare function signBitcoinSegwitKey({ message, root }: ISignMessageReq): ISignMessageResp;
export { signBitcoinSegwitKey };
