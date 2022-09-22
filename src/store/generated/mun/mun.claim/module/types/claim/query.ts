/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Params, Airdrop, ClaimRecord } from "../claim/params";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";

export const protobufPackage = "mun.claim";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryAirdropRequest {
  airdrop_id: number;
}

export interface QueryAirdropResponse {
  airdrop: Airdrop | undefined;
}

export interface QueryAirdropsRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAirdropsResponse {
  airdrops: Airdrop[];
  pagination: PageResponse | undefined;
}

export interface QueryClaimRecordRequest {
  airdrop_id: number;
  recipient: string;
}

export interface QueryClaimRecordResponse {
  claim_record: ClaimRecord | undefined;
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
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

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryAirdropRequest: object = { airdrop_id: 0 };

export const QueryAirdropRequest = {
  encode(
    message: QueryAirdropRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.airdrop_id !== 0) {
      writer.uint32(8).uint64(message.airdrop_id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAirdropRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAirdropRequest } as QueryAirdropRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.airdrop_id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAirdropRequest {
    const message = { ...baseQueryAirdropRequest } as QueryAirdropRequest;
    if (object.airdrop_id !== undefined && object.airdrop_id !== null) {
      message.airdrop_id = Number(object.airdrop_id);
    } else {
      message.airdrop_id = 0;
    }
    return message;
  },

  toJSON(message: QueryAirdropRequest): unknown {
    const obj: any = {};
    message.airdrop_id !== undefined && (obj.airdrop_id = message.airdrop_id);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAirdropRequest>): QueryAirdropRequest {
    const message = { ...baseQueryAirdropRequest } as QueryAirdropRequest;
    if (object.airdrop_id !== undefined && object.airdrop_id !== null) {
      message.airdrop_id = object.airdrop_id;
    } else {
      message.airdrop_id = 0;
    }
    return message;
  },
};

const baseQueryAirdropResponse: object = {};

export const QueryAirdropResponse = {
  encode(
    message: QueryAirdropResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.airdrop !== undefined) {
      Airdrop.encode(message.airdrop, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAirdropResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAirdropResponse } as QueryAirdropResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.airdrop = Airdrop.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAirdropResponse {
    const message = { ...baseQueryAirdropResponse } as QueryAirdropResponse;
    if (object.airdrop !== undefined && object.airdrop !== null) {
      message.airdrop = Airdrop.fromJSON(object.airdrop);
    } else {
      message.airdrop = undefined;
    }
    return message;
  },

  toJSON(message: QueryAirdropResponse): unknown {
    const obj: any = {};
    message.airdrop !== undefined &&
      (obj.airdrop = message.airdrop
        ? Airdrop.toJSON(message.airdrop)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAirdropResponse>): QueryAirdropResponse {
    const message = { ...baseQueryAirdropResponse } as QueryAirdropResponse;
    if (object.airdrop !== undefined && object.airdrop !== null) {
      message.airdrop = Airdrop.fromPartial(object.airdrop);
    } else {
      message.airdrop = undefined;
    }
    return message;
  },
};

const baseQueryAirdropsRequest: object = {};

export const QueryAirdropsRequest = {
  encode(
    message: QueryAirdropsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAirdropsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAirdropsRequest } as QueryAirdropsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAirdropsRequest {
    const message = { ...baseQueryAirdropsRequest } as QueryAirdropsRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAirdropsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAirdropsRequest>): QueryAirdropsRequest {
    const message = { ...baseQueryAirdropsRequest } as QueryAirdropsRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAirdropsResponse: object = {};

export const QueryAirdropsResponse = {
  encode(
    message: QueryAirdropsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.airdrops) {
      Airdrop.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAirdropsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAirdropsResponse } as QueryAirdropsResponse;
    message.airdrops = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.airdrops.push(Airdrop.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAirdropsResponse {
    const message = { ...baseQueryAirdropsResponse } as QueryAirdropsResponse;
    message.airdrops = [];
    if (object.airdrops !== undefined && object.airdrops !== null) {
      for (const e of object.airdrops) {
        message.airdrops.push(Airdrop.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAirdropsResponse): unknown {
    const obj: any = {};
    if (message.airdrops) {
      obj.airdrops = message.airdrops.map((e) =>
        e ? Airdrop.toJSON(e) : undefined
      );
    } else {
      obj.airdrops = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAirdropsResponse>
  ): QueryAirdropsResponse {
    const message = { ...baseQueryAirdropsResponse } as QueryAirdropsResponse;
    message.airdrops = [];
    if (object.airdrops !== undefined && object.airdrops !== null) {
      for (const e of object.airdrops) {
        message.airdrops.push(Airdrop.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryClaimRecordRequest: object = { airdrop_id: 0, recipient: "" };

export const QueryClaimRecordRequest = {
  encode(
    message: QueryClaimRecordRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.airdrop_id !== 0) {
      writer.uint32(8).uint64(message.airdrop_id);
    }
    if (message.recipient !== "") {
      writer.uint32(18).string(message.recipient);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryClaimRecordRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryClaimRecordRequest,
    } as QueryClaimRecordRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.airdrop_id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.recipient = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClaimRecordRequest {
    const message = {
      ...baseQueryClaimRecordRequest,
    } as QueryClaimRecordRequest;
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
    return message;
  },

  toJSON(message: QueryClaimRecordRequest): unknown {
    const obj: any = {};
    message.airdrop_id !== undefined && (obj.airdrop_id = message.airdrop_id);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryClaimRecordRequest>
  ): QueryClaimRecordRequest {
    const message = {
      ...baseQueryClaimRecordRequest,
    } as QueryClaimRecordRequest;
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
    return message;
  },
};

const baseQueryClaimRecordResponse: object = {};

export const QueryClaimRecordResponse = {
  encode(
    message: QueryClaimRecordResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.claim_record !== undefined) {
      ClaimRecord.encode(
        message.claim_record,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryClaimRecordResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryClaimRecordResponse,
    } as QueryClaimRecordResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.claim_record = ClaimRecord.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClaimRecordResponse {
    const message = {
      ...baseQueryClaimRecordResponse,
    } as QueryClaimRecordResponse;
    if (object.claim_record !== undefined && object.claim_record !== null) {
      message.claim_record = ClaimRecord.fromJSON(object.claim_record);
    } else {
      message.claim_record = undefined;
    }
    return message;
  },

  toJSON(message: QueryClaimRecordResponse): unknown {
    const obj: any = {};
    message.claim_record !== undefined &&
      (obj.claim_record = message.claim_record
        ? ClaimRecord.toJSON(message.claim_record)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryClaimRecordResponse>
  ): QueryClaimRecordResponse {
    const message = {
      ...baseQueryClaimRecordResponse,
    } as QueryClaimRecordResponse;
    if (object.claim_record !== undefined && object.claim_record !== null) {
      message.claim_record = ClaimRecord.fromPartial(object.claim_record);
    } else {
      message.claim_record = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Airdrop items. */
  Airdrop(request: QueryAirdropRequest): Promise<QueryAirdropResponse>;
  /** Queries a list of Airdrops items. */
  Airdrops(request: QueryAirdropsRequest): Promise<QueryAirdropsResponse>;
  /** Queries a list of ClaimRecord items. */
  ClaimRecord(
    request: QueryClaimRecordRequest
  ): Promise<QueryClaimRecordResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("mun.claim.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  Airdrop(request: QueryAirdropRequest): Promise<QueryAirdropResponse> {
    const data = QueryAirdropRequest.encode(request).finish();
    const promise = this.rpc.request("mun.claim.Query", "Airdrop", data);
    return promise.then((data) =>
      QueryAirdropResponse.decode(new Reader(data))
    );
  }

  Airdrops(request: QueryAirdropsRequest): Promise<QueryAirdropsResponse> {
    const data = QueryAirdropsRequest.encode(request).finish();
    const promise = this.rpc.request("mun.claim.Query", "Airdrops", data);
    return promise.then((data) =>
      QueryAirdropsResponse.decode(new Reader(data))
    );
  }

  ClaimRecord(
    request: QueryClaimRecordRequest
  ): Promise<QueryClaimRecordResponse> {
    const data = QueryClaimRecordRequest.encode(request).finish();
    const promise = this.rpc.request("mun.claim.Query", "ClaimRecord", data);
    return promise.then((data) =>
      QueryClaimRecordResponse.decode(new Reader(data))
    );
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
