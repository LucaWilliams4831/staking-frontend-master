
/**
 * CommissionRates defines the initial commission rates to be used for creating
 * a validator.
 */
 export interface CommissionRates {
  /** rate is the commission rate charged to delegators, as a fraction. */
  rate: string;
  /** max_rate defines the maximum commission rate which validator can ever charge, as a fraction. */
  max_rate: string;
  /** max_change_rate defines the maximum daily increase of the validator commission, as a fraction. */
  max_change_rate: string;
}

/** Commission defines commission parameters for a given validator. */
export interface Commission {
  /** commission_rates defines the initial commission rates to be used for creating a validator. */
  commission_rates: CommissionRates | undefined;
  /** update_time is the last time the commission rate was changed. */
  update_time: Date | undefined;
}

/** Description defines a validator description. */
export interface Description {
  /** moniker defines a human-readable name for the validator. */
  moniker: string;
  /** identity defines an optional identity signature (ex. UPort or Keybase). */
  identity: string;
  /** website defines an optional website link. */
  website: string;
  /** security_contact defines an optional email for security contact. */
  security_contact: string;
  /** details define other optional details. */
  details: string;
}

/**
 * Validator defines a validator, together with the total amount of the
 * Validator's bond shares and their exchange rate to coins. Slashing results in
 * a decrease in the exchange rate, allowing correct calculation of future
 * undelegations without iterating over delegators. When coins are delegated to
 * this validator, the validator is credited with a delegation whose number of
 * bond shares is based on the amount of coins delegated divided by the current
 * exchange rate. Voting power can be calculated as total bonded shares
 * multiplied by exchange rate.
 */
export interface Validator {
  /** operator_address defines the address of the validator's operator; bech encoded in JSON. */
  operator_address: string;
  /** consensus_pubkey is the consensus public key of the validator, as a Protobuf Any. */
  consensus_pubkey: undefined;
  /** jailed defined whether the validator has been jailed from bonded status or not. */
  jailed: boolean;
  /** status is the validator status (bonded/unbonding/unbonded). */
  status: BondStatus;
  /** tokens define the delegated tokens (incl. self-delegation). */
  tokens: string;
  /** delegator_shares defines total shares issued to a validator's delegators. */
  delegator_shares: string;
  /** description defines the description terms for the validator. */
  description: Description | undefined;
  /** unbonding_height defines, if unbonding, the height at which this validator has begun unbonding. */
  unbonding_height: number;
  /** unbonding_time defines, if unbonding, the min time for the validator to complete unbonding. */
  unbonding_time: Date | undefined;
  /** commission defines the commission parameters. */
  commission: Commission | undefined;
  /** min_self_delegation is the validator's self declared minimum self delegation. */
  min_self_delegation: string;
}
export enum BondStatus {
  /** BOND_STATUS_UNSPECIFIED - UNSPECIFIED defines an invalid validator status. */
  BOND_STATUS_UNSPECIFIED = 0,
  /** BOND_STATUS_UNBONDED - UNBONDED defines a validator that is not bonded. */
  BOND_STATUS_UNBONDED = 1,
  /** BOND_STATUS_UNBONDING - UNBONDING defines a validator that is unbonding. */
  BOND_STATUS_UNBONDING = 2,
  /** BOND_STATUS_BONDED - BONDED defines a validator that is bonded. */
  BOND_STATUS_BONDED = 3,
  UNRECOGNIZED = -1,
}


export interface Account {
  address: string
  pathIncrement: number
}
export type Wallet = {
  name: string
  mnemonic: string | null
  HDpath: string | null
  password: string | null
  prefix: string
  pathIncrement: number
  accounts: Account[]
}

export interface Amount {
  amount: string
  denom: string
}
export type ColoredAmount = Amount & { color: string }
export interface DenomTrace {
  denom_trace: { path: string; base_denom: string }
}
export interface DenomTraces {
  [key: string]: DenomTrace
}
export type Block = {
  height: number
} & {
  [key: string]: string | undefined
}
export interface IBCAckHeights {
  packetHeightA: number
  packetHeightB: number
  ackHeightA: number
  ackHeightB: number
}
export interface IBCEndpoint {
  clientID: string
  connectionID: string
}
export interface IBCChannel {
  portId?: string
  channelId: string
}
export interface Relayer {
  name: string
  prefix?: string
  endpoint?: string
  gasPrice?: string
  external: boolean
  status: 'connected' | 'linked' | 'created'
  heights?: IBCAckHeights
  running?: boolean
  chainIdA?: string
  chainIdB: string
  targetAddress?: string
  endA?: IBCEndpoint
  endB?: IBCEndpoint
  src: IBCChannel
  dest?: IBCChannel
}

export interface Transactions {
  txs: Array<RawTransaction>
  tx_responses: Array<RawTransactionResponse>
}
export type RawTransactionResponse = {
  height: number
  code: number
} & {
  [key: string]: string | undefined
}
export interface TxPacket {
  data: string
  source_port: string
  source_channel: string
  destination_port: string
  destination_channel: string
}
export interface TxDecodedPacket {
  sender?: string
  receiver?: string
  amount?: string
  denom?: string
}
export interface TxMessage {
  '@type': string
  packet?: TxPacket
  signer: string
  connection_id?: string
  client_id?: string
  amount?: Amount[]
  token?: Amount
  counterparty_connection_id?: string
  previous_connection_id?: string
  from_address?: string
  to_address?: string
  sender?: string
  receiver?: string
  port_id?: string
  channel_id?: string
  source_channel?: string
  counterparty_version?: string
  previous_channel_id?: string
}
export interface TxBody {
  messages: Array<TxMessage>
}
export type RawTransaction = {
  response: RawTransactionResponse
  body: TxBody
} & {
  [key: string]: unknown
}
export type Transaction = RawTransaction & {
  [key: string]: unknown
}
export interface SpTypeObject {
  id?: string
  creator?: string
  [key: string]: string | undefined
}
export interface Field {
  name: string
  type: string
}
export type AmountWithMeta = Amount & {
  coinDenom: string
  coinMinimalDenom: string
  coinDecimals: number
}
