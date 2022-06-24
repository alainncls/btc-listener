import * as bitcoin from 'bitcoinjs-lib';
import * as zmq from 'zeromq';

type Output = {
    to: string;
    amount: number;
}

type Transaction = {
    id: string;
    outputs: Output[];
};

const BITCOIN_NODE_ADDRESS = 'tcp://localhost:3010';
const NETWORK = bitcoin.networks.regtest;

// Create a socket to listen to the blocks added to the chain
const sock = zmq.socket('sub');
sock.connect(BITCOIN_NODE_ADDRESS);
sock.subscribe('rawblock');
sock.on('message', (topic, message) => {
    const block = bitcoin.Block.fromHex(message.toString('hex'));

    block.transactions?.forEach(function (tx) {

        const outputs: Output[] = [];

        // Decode outputs addresses (if any)
        tx.outs.forEach(function (output) {
            if (output.script.length) {
                try {
                    outputs.push({to: bitcoin.address.fromOutputScript(output.script, NETWORK), amount: output.value})
                } catch (e) {
                }
            }
        });

        const parsedTransaction: Transaction = {
            id: tx.getId(),
            outputs
        };

        console.log(`Received transaction ${JSON.stringify(parsedTransaction)}`);
    });
});