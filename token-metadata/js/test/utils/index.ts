import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SendOptions,
} from '@solana/web3.js';
import { inspect } from 'util';
import debug from 'debug';
import test from 'tape';

export * from './TransactionHandler';
export * from './asserts';
export * from './address-labels';
export * from './metadata';

export const logError = debug('mpl:setup:error');
export const logInfo = debug('mpl:setup:info');
export const logDebug = debug('mpl:setup:debug');
export const logTrace = debug('mpl:setup:trace');

export const programIds = {
  metadata: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  vault: 'vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn',
  auction: 'auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8',
  metaplex: 'p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98',
};

export const defaultSendOptions: SendOptions = {
  skipPreflight: false,
  preflightCommitment: 'confirmed',
};

export const LOCALHOST = 'http://127.0.0.1:8899/';
export const DEVNET = clusterApiUrl('devnet');
export const connectionURL = process.env.USE_DEVNET != null ? DEVNET : LOCALHOST;

export async function airdrop(connection: Connection, publicKey: PublicKey, sol = 1) {
  const sig = await connection.requestAirdrop(publicKey, sol * LAMPORTS_PER_SOL);
  return connection.confirmTransaction(sig);
}

export function dump(x: any) {
  console.log(inspect(x, { depth: 5 }));
}

export function killStuckProcess() {
  // solana web socket keeps process alive for longer than necessary which we
  // "fix" here
  test.onFinish(() => process.exit(0));
}
