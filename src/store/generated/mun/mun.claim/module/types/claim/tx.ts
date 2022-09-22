/* eslint-disable */
import {
  ConditionType,
  conditionTypeFromJSON,
  conditionTypeToJSON,
} from "../claim/params";
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "mun.claim";

export interface MsgClaim {
  airdrop_id: number;
  recipient: string;
  conditionType: ConditionType;
}

export interface MsgClaimResponse {}

const baseMsgClaim: object = { airdrop_id: 0, recipient: "", conditionType: 0 };

export const MsgClaim = {
  encode(message: MsgClaim, writer: Writer = Writer.create()): Writer {
    if (message.airdrop_id !== 0) {
      writer.uint32(8).uint64(message.airdrop_id);
    }
    if (message.recipient !== "") {
      writer.uint32(18).string(message.recipient);
    }
    if (message.conditionType !== 0) {
      writer.uint32(24).int32(message.conditionType);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaim {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgClaim } as MsgClaim;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.airdrop_id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.recipient = reader.string();
          break;
        case 3:
          message.conditionType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaim {
    const message = { ...baseMsgClaim } as MsgClaim;
    if (object.airdrop_id !== undefined && object.airdrop_id !== null) {
      message.airdrop_id = Number(object.airdrop_id);
    } else {
      message.airdrop_id = 0;
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = String(object.recipient);
    } else {
      message.recipient = "";
    }
    if (object.conditionType !== undefined && object.conditionType !== null) {
      message.conditionType = conditionTypeFromJSON(object.conditionType);
    } else {
      message.conditionType = 0;
    }
    return message;
  },

  toJSON(message: MsgClaim): unknown {
    const obj: any = {};
    message.airdrop_id !== undefined && (obj.airdrop_id = message.airdrop_id);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    message.conditionType !== undefined &&
      (obj.conditionType = conditionTypeToJSON(message.conditionType));
    return obj;
  },

  fromPartial(object: DeepPartial<MsgClaim>): MsgClaim {
    const message = { ...baseMsgClaim } as MsgClaim;
    if (object.airdrop_id !== undefined && object.airdrop_id !== null) {
      message.airdrop_id = object.airdrop_id;
    } else {
      message.airdrop_id = 0;
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient;
    } else {
      message.recipient = "";
    }
    if (object.conditionType !== undefined && object.conditionType !== null) {
      message.conditionType = object.conditionType;
    } else {
      message.conditionType = 0;
    }
    return message;
  },
};

const baseMsgClaimResponse: object = {};

export const MsgClaimResponse = {
  encode(_: MsgClaimResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgClaimResponse } as MsgClaimResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgClaimResponse {
    const message = { ...baseMsgClaimResponse } as MsgClaimResponse;
    return message;
  },

  toJSON(_: MsgClaimResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgClaimResponse>): MsgClaimResponse {
    const message = { ...baseMsgClaimResponse } as MsgClaimResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  Claim(request: MsgClaim): Promise<MsgClaimResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Claim(request: MsgClaim): Promise<MsgClaimResponse> {
    const data = MsgClaim.encode(request).finish();
    const promise = this.rpc.request("mun.claim.Msg", "Claim", data);
    return promise.then((data) => MsgClaimResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
