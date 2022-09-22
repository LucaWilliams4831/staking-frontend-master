/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../mun/params";

export const protobufPackage = "mun.mun";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryAirdropRequest {}

export interface QueryAirdropResponse {}

export interface QueryAirdropsRequest {}

export interface QueryAirdropsResponse {}

export interface QueryClaimRecordRequest {}

export interface QueryClaimRecordResponse {}

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

const baseQueryAirdropRequest: object = {};

export const QueryAirdropRequest = {
  encode(_: QueryAirdropRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAirdropRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAirdropRequest } as QueryAirdropRequest;
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

  fromJSON(_: any): QueryAirdropRequest {
    const message = { ...baseQueryAirdropRequest } as QueryAirdropRequest;
    return message;
  },

  toJSON(_: QueryAirdropRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryAirdropRequest>): QueryAirdropRequest {
    const message = { ...baseQueryAirdropRequest } as QueryAirdropRequest;
    return message;
  },
};

const baseQueryAirdropResponse: object = {};

export const QueryAirdropResponse = {
  encode(_: QueryAirdropResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAirdropResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAirdropResponse } as QueryAirdropResponse;
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

  fromJSON(_: any): QueryAirdropResponse {
    const message = { ...baseQueryAirdropResponse } as QueryAirdropResponse;
    return message;
  },

  toJSON(_: QueryAirdropResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryAirdropResponse>): QueryAirdropResponse {
    const message = { ...baseQueryAirdropResponse } as QueryAirdropResponse;
    return message;
  },
};

const baseQueryAirdropsRequest: object = {};

export const QueryAirdropsRequest = {
  encode(_: QueryAirdropsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAirdropsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAirdropsRequest } as QueryAirdropsRequest;
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

  fromJSON(_: any): QueryAirdropsRequest {
    const message = { ...baseQueryAirdropsRequest } as QueryAirdropsRequest;
    return message;
  },

  toJSON(_: QueryAirdropsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryAirdropsRequest>): QueryAirdropsRequest {
    const message = { ...baseQueryAirdropsRequest } as QueryAirdropsRequest;
    return message;
  },
};

const baseQueryAirdropsResponse: object = {};

export const QueryAirdropsResponse = {
  encode(_: QueryAirdropsResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAirdropsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAirdropsResponse } as QueryAirdropsResponse;
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

  fromJSON(_: any): QueryAirdropsResponse {
    const message = { ...baseQueryAirdropsResponse } as QueryAirdropsResponse;
    return message;
  },

  toJSON(_: QueryAirdropsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryAirdropsResponse>): QueryAirdropsResponse {
    const message = { ...baseQueryAirdropsResponse } as QueryAirdropsResponse;
    return message;
  },
};

const baseQueryClaimRecordRequest: object = {};

export const QueryClaimRecordRequest = {
  encode(_: QueryClaimRecordRequest, writer: Writer = Writer.create()): Writer {
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryClaimRecordRequest {
    const message = {
      ...baseQueryClaimRecordRequest,
    } as QueryClaimRecordRequest;
    return message;
  },

  toJSON(_: QueryClaimRecordRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<QueryClaimRecordRequest>
  ): QueryClaimRecordRequest {
    const message = {
      ...baseQueryClaimRecordRequest,
    } as QueryClaimRecordRequest;
    return message;
  },
};

const baseQueryClaimRecordResponse: object = {};

export const QueryClaimRecordResponse = {
  encode(
    _: QueryClaimRecordResponse,
    writer: Writer = Writer.create()
  ): Writer {
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryClaimRecordResponse {
    const message = {
      ...baseQueryClaimRecordResponse,
    } as QueryClaimRecordResponse;
    return message;
  },

  toJSON(_: QueryClaimRecordResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<QueryClaimRecordResponse>
  ): QueryClaimRecordResponse {
    const message = {
      ...baseQueryClaimRecordResponse,
    } as QueryClaimRecordResponse;
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
    const promise = this.rpc.request("mun.mun.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  Airdrop(request: QueryAirdropRequest): Promise<QueryAirdropResponse> {
    const data = QueryAirdropRequest.encode(request).finish();
    const promise = this.rpc.request("mun.mun.Query", "Airdrop", data);
    return promise.then((data) =>
      QueryAirdropResponse.decode(new Reader(data))
    );
  }

  Airdrops(request: QueryAirdropsRequest): Promise<QueryAirdropsResponse> {
    const data = QueryAirdropsRequest.encode(request).finish();
    const promise = this.rpc.request("mun.mun.Query", "Airdrops", data);
    return promise.then((data) =>
      QueryAirdropsResponse.decode(new Reader(data))
    );
  }

  ClaimRecord(
    request: QueryClaimRecordRequest
  ): Promise<QueryClaimRecordResponse> {
    const data = QueryClaimRecordRequest.encode(request).finish();
    const promise = this.rpc.request("mun.mun.Query", "ClaimRecord", data);
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
