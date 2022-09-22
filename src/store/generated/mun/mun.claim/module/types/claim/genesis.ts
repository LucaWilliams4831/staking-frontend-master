/* eslint-disable */
import { Params, Airdrop, ClaimRecord } from "../claim/params";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "mun.claim";

/** GenesisState defines the claim module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  /**
   * this line is used by starport scaffolding # genesis/proto/state
   * airdrops specifies a list of airdrops
   */
  airdrops: Airdrop[];
  /** claim_records specifies a list of claim records */
  claim_records: ClaimRecord[];
}

const baseGenesisState: object = {};

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.airdrops) {
      Airdrop.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.claim_records) {
      ClaimRecord.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.airdrops = [];
    message.claim_records = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.airdrops.push(Airdrop.decode(reader, reader.uint32()));
          break;
        case 3:
          message.claim_records.push(
            ClaimRecord.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.airdrops = [];
    message.claim_records = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.airdrops !== undefined && object.airdrops !== null) {
      for (const e of object.airdrops) {
        message.airdrops.push(Airdrop.fromJSON(e));
      }
    }
    if (object.claim_records !== undefined && object.claim_records !== null) {
      for (const e of object.claim_records) {
        message.claim_records.push(ClaimRecord.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.airdrops) {
      obj.airdrops = message.airdrops.map((e) =>
        e ? Airdrop.toJSON(e) : undefined
      );
    } else {
      obj.airdrops = [];
    }
    if (message.claim_records) {
      obj.claim_records = message.claim_records.map((e) =>
        e ? ClaimRecord.toJSON(e) : undefined
      );
    } else {
      obj.claim_records = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.airdrops = [];
    message.claim_records = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.airdrops !== undefined && object.airdrops !== null) {
      for (const e of object.airdrops) {
        message.airdrops.push(Airdrop.fromPartial(e));
      }
    }
    if (object.claim_records !== undefined && object.claim_records !== null) {
      for (const e of object.claim_records) {
        message.claim_records.push(ClaimRecord.fromPartial(e));
      }
    }
    return message;
  },
};

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
