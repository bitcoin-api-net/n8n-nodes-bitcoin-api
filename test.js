const { BitcoinApi } = require('./dist/nodes/BitcoinApi/BitcoinApi.node.js');
const { BitcoinApiApi } = require('./dist/credentials/BitcoinApiApi.credentials.js');

try {
	const node = new BitcoinApi();
	const credentials = new BitcoinApiApi();

	if (node.description.name !== 'bitcoinApi') {
		throw new Error(`Invalid node name: ${node.description.name}`);
	}

	if (credentials.name !== 'bitcoinApiApi') {
		throw new Error(`Invalid credentials name: ${credentials.name}`);
	}

	console.log('✅ Instances created successfully. Sanity test passed.');
} catch (e) {
	console.error('❌ Sanity test failed:', e);
	process.exit(1);
}
