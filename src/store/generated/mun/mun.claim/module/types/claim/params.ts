/* eslint-disable */
import { Timestamp } from "../google/protobuf/timestamp";
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "mun.claim";

/** ConditionType defines the type of condition that a recipient must execute in order to receive a claimable amount. */
export enum ConditionType {
  /** CONDITION_TYPE_UNSPECIFIED - CONDITION_TYPE_UNSPECIFIED specifies an unknown condition type */
  CONDITION_TYPE_UNSPECIFIED = 0,
  /** CONDITION_TYPE_INIT - CONDITION_TYPE_DEPOSIT specifies deposit condition type */
  CONDITION_TYPE_INIT = 1,
  /** CONDITION_TYPE_SWAP - CONDITION_TYPE_SWAP specifies swap condition type */
  CONDITION_TYPE_SWAP = 2,
  /** CONDITION_TYPE_STAKE - CONDITION_TYPE_LIQUIDSTAKE specifies liquid stake condition type */
  CONDITION_TYPE_STAKE = 3,
  /** CONDITION_TYPE_VOTE - CONDITION_TYPE_VOTE specifies governance vote condition type */
  CONDITION_TYPE_VOTE = 4,
  UNRECOGNIZED = -1,
}

export function conditionTypeFromJSON(object: any): ConditionType {
  switch (object) {
    case 0:
    case "CONDITION_TYPE_UNSPECIFIED":
      return ConditionType.CONDITION_TYPE_UNSPECIFIED;
    case 1:
    case "CONDITION_TYPE_INIT":
      return ConditionType.CONDITION_TYPE_INIT;
    case 2:
    case "CONDITION_TYPE_SWAP":
      return ConditionType.CONDITION_TYPE_SWAP;
    case 3:
    case "CONDITION_TYPE_STAKE":
      return ConditionType.CONDITION_TYPE_STAKE;
    case 4:
    case "CONDITION_TYPE_VOTE":
      return ConditionType.CONDITION_TYPE_VOTE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConditionType.UNRECOGNIZED;
  }
}

export function conditionTypeToJSON(object: ConditionType): string {
  switch (object) {
    case ConditionType.CONDITION_TYPE_UNSPECIFIED:
      return "CONDITION_TYPE_UNSPECIFIED";
    case ConditionType.CONDITION_TYPE_INIT:
      return "CONDITION_TYPE_INIT";
    case ConditionType.CONDITION_TYPE_SWAP:
      return "CONDITION_TYPE_SWAP";
    case ConditionType.CONDITION_TYPE_STAKE:
      return "CONDITION_TYPE_STAKE";
    case ConditionType.CONDITION_TYPE_VOTE:
      return "CONDITION_TYPE_VOTE";
    default:
      return "UNKNOWN";
  }
}

/** Params defines the parameters for the module. */
export interface Params {}

/** Airdrop defines airdrop information. */
export interface Airdrop {
  /** id specifies index of the airdrop */
  id: number;
  /**
   * source_address defines the bech32-encoded source address
   * where the source of coins from
   */
  source_address: string;
  /** conditions specifies a list of conditions */
  conditions: ConditionType[];
  /** start_time specifies the start time of the airdrop */
  start_time: Date | undefined;
  /** end_time specifies the start time of the airdrop */
  end_time: Date | undefined;
}

/** ClaimRecord defines claim record that corresponds to the airdrop. */
export interface ClaimRecord {
  /** airdrop_id specifies airdrop id */
  airdrop_id: number;
  /** recipient specifies the bech32-encoded address that is eligible to claim airdrop */
  recipient: string;
  /** initial_claimable_coins specifies the initial claimable coins */
  initial_claimable_coins: Coin[];
  /** claimable_coins specifies the unclaimed claimable coins */
  claimable_coins: Coin[];
  /**
   * claimed_conditions specifies a list of condition types
   * initial values are empty and each condition type gets appended when claim is successfully executed
   */
  claimed_conditions: ConditionType[];
}

const baseParams: object = {};

export const Params = {
  encode(_: Params, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
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

  fromJSON(_: any): Params {
    const message = { ...baseParams } as Params;
    return message;
  },

  toJSON(_: Params): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    return message;
  },
};

const baseAirdrop: object = { id: 0, source_address: "", conditions: 0 };

export const Airdrop = {
  encode(message: Airdrop, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.source_address !== "") {
      writer.uint32(18).string(message.source_address);
    }
    writer.uint32(26).fork();
    for (const v of message.conditions) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.start_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.start_time),
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.end_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.end_time),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Airdrop {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAirdrop } as Airdrop;
    message.conditions = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.source_address = reader.string();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.conditions.push(reader.int32() as any);
            }
          } else {
            message.conditions.push(reader.int32() as any);
          }
          break;
        case 4:
          message.start_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.end_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Airdrop {
    const message = { ...baseAirdrop } as Airdrop;
    message.conditions = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.source_address !== undefined && object.source_address !== null) {
      message.source_address = String(object.source_address);
    } else {
      message.source_address = "";
    }
    if (object.conditions !== undefined && object.conditions !== null) {
      for (const e of object.conditions) {
        message.conditions.push(conditionTypeFromJSON(e));
      }
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.start_time = fromJsonTimestamp(object.start_time);
    } else {
      message.start_time = undefined;
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.end_time = fromJsonTimestamp(object.end_time);
    } else {
      message.end_time = undefined;
    }
    return message;
  },

  toJSON(message: Airdrop): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.source_address !== undefined &&
      (obj.source_address = message.source_address);
    if (message.conditions) {
      obj.conditions = message.conditions.map((e) => conditionTypeToJSON(e));
    } else {
      obj.conditions = [];
    }
    message.start_time !== undefined &&
      (obj.start_time =
        message.start_time !== undefined
          ? message.start_time.toISOString()
          : null);
    message.end_time !== undefined &&
      (obj.end_time =
        message.end_time !== undefined ? message.end_time.toISOString() : null);
    return obj;
  },

  fromPartial(object: DeepPartial<Airdrop>): Airdrop {
    const message = { ...baseAirdrop } as Airdrop;
    message.conditions = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.source_address !== undefined && object.source_address !== null) {
      message.source_address = object.source_address;
    } else {
      message.source_address = "";
    }
    if (object.conditions !== undefined && object.conditions !== null) {
      for (const e of object.conditions) {
        message.conditions.push(e);
      }
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.start_time = object.start_time;
    } else {
      message.start_time = undefined;
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.end_time = object.end_time;
    } else {
      message.end_time = undefined;
    }
    return message;
  },
};

const baseClaimRecord: object = {
  airdrop_id: 0,
  recipient: "",
  claimed_conditions: 0,
};

export const ClaimRecord = {
  encode(message: ClaimRecord, writer: Writer = Writer.create()): Writer {
    if (message.airdrop_id !== 0) {
      writer.uint32(8).uint64(message.airdrop_id);
    }
    if (message.recipient !== "") {
      writer.uint32(18).string(message.recipient);
    }
    for (const v of message.initial_claimable_coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.claimable_coins) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    writer.uint32(42).fork();
    for (const v of message.claimed_conditions) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ClaimRecord {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClaimRecord } as ClaimRecord;
    message.initial_claimable_coins = [];
    message.claimable_coins = [];
    message.claimed_conditions = [];
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
          message.initial_claimable_coins.push(
            Coin.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.claimable_coins.push(Coin.decode(reader, reader.uint32()));
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.claimed_conditions.push(reader.int32() as any);
            }
          } else {
            message.claimed_conditions.push(reader.int32() as any);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClaimRecord {
    const message = { ...baseClaimRecord } as ClaimRecord;
    message.initial_claimable_coins = [];
    message.claimable_coins = [];
    message.claimed_conditions = [];
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
    if (
      object.initial_claimable_coins !== undefined &&
      object.initial_claimable_coins !== null
    ) {
      for (const e of object.initial_claimable_coins) {
        message.initial_claimable_coins.push(Coin.fromJSON(e));
      }
    }
    if (
      object.claimable_coins !== undefined &&
      object.claimable_coins !== null
    ) {
      for (const e of object.claimable_coins) {
        message.claimable_coins.push(Coin.fromJSON(e));
      }
    }
    if (
      object.claimed_conditions !== undefined &&
      object.claimed_conditions !== null
    ) {
      for (const e of object.claimed_conditions) {
        message.claimed_conditions.push(conditionTypeFromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ClaimRecord): unknown {
    const obj: any = {};
    message.airdrop_id !== undefined && (obj.airdrop_id = message.airdrop_id);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    if (message.initial_claimable_coins) {
      obj.initial_claimable_coins = message.initial_claimable_coins.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.initial_claimable_coins = [];
    }
    if (message.claimable_coins) {
      obj.claimable_coins = message.claimable_coins.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.claimable_coins = [];
    }
    if (message.claimed_conditions) {
      obj.claimed_conditions = message.claimed_conditions.map((e) =>
        conditionTypeToJSON(e)
      );
    } else {
      obj.claimed_conditions = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ClaimRecord>): ClaimRecord {
    const message = { ...baseClaimRecord } as ClaimRecord;
    message.initial_claimable_coins = [];
    message.claimable_coins = [];
    message.claimed_conditions = [];
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
    if (
      object.initial_claimable_coins !== undefined &&
      object.initial_claimable_coins !== null
    ) {
      for (const e of object.initial_claimable_coins) {
        message.initial_claimable_coins.push(Coin.fromPartial(e));
      }
    }
    if (
      object.claimable_coins !== undefined &&
      object.claimable_coins !== null
    ) {
      for (const e of object.claimable_coins) {
        message.claimable_coins.push(Coin.fromPartial(e));
      }
    }
    if (
      object.claimed_conditions !== undefined &&
      object.claimed_conditions !== null
    ) {
      for (const e of object.claimed_conditions) {
        message.claimed_conditions.push(e);
      }
    }
    return message;
  },
};

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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

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
