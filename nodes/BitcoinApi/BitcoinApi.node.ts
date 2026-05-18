import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class BitcoinApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Bitcoin API',
		name: 'bitcoinApi',
		icon: 'file:bitcoinApi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Bitcoin API',
		defaults: {
			name: 'Bitcoin API',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'bitcoinApiApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.bitcoin-api.net/api/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Info', value: 'info' },
					{ name: 'Price', value: 'price' },
					{ name: 'Docs', value: 'docs' },
				],
				default: 'price',
			},
			// INFO
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { resource: ['info'] },
				},
				options: [
					{
						name: 'Get Me',
						value: 'getMe',
						action: 'Get current user info',
						routing: {
							request: {
								method: 'GET',
								url: '/auth/me',
							},
						},
					},
				],
				default: 'getMe',
			},
			// DOCS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { resource: ['docs'] },
				},
				options: [
					{
						name: 'Ask AI',
						value: 'askAi',
						action: 'Ask AI about docs',
						routing: {
							request: {
								method: 'POST',
								url: '/docs/ask-ai',
							},
						},
					},
				],
				default: 'askAi',
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				required: true,
				displayOptions: {
					show: { resource: ['docs'], operation: ['askAi'] },
				},
				default: '',
				description: 'Question to ask AI',
				routing: {
					request: {
						body: {
							query: '={{$value}}',
						},
					},
				},
			},
			// PRICE
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { resource: ['price'] },
				},
				options: [
					{
						name: 'Get Current Price',
						value: 'getCurrentPrice',
						action: 'Get current price',
						routing: {
							request: {
								method: 'GET',
								url: '/prices/current',
							},
						},
					},
					{
						name: 'Get Candles',
						value: 'getCandles',
						action: 'Get price candles',
						routing: {
							request: {
								method: 'GET',
								url: '/prices/candles',
							},
						},
					},
				],
				default: 'getCurrentPrice',
			},
			{
				displayName: 'Symbol',
				name: 'symbol',
				type: 'string',
				required: true,
				displayOptions: {
					show: { resource: ['price'] },
				},
				default: 'BTCUSDT',
				description: 'Trading pair symbol, e.g., BTCUSDT',
				routing: {
					request: {
						qs: {
							symbol: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Interval',
				name: 'interval',
				type: 'options',
				required: true,
				displayOptions: {
					show: { resource: ['price'], operation: ['getCandles'] },
				},
				options: [
					{ name: '1m', value: '1m' },
					{ name: '3m', value: '3m' },
					{ name: '5m', value: '5m' },
					{ name: '15m', value: '15m' },
					{ name: '30m', value: '30m' },
					{ name: '1h', value: '1h' },
					{ name: '2h', value: '2h' },
					{ name: '4h', value: '4h' },
					{ name: '6h', value: '6h' },
					{ name: '8h', value: '8h' },
					{ name: '12h', value: '12h' },
					{ name: '1d', value: '1d' },
					{ name: '3d', value: '3d' },
					{ name: '1w', value: '1w' },
					{ name: '1M', value: '1M' },
				],
				default: '1d',
				routing: {
					request: {
						qs: {
							interval: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: { resource: ['price'], operation: ['getCandles'] },
				},
				default: 100,
				routing: {
					request: {
						qs: {
							limit: '={{$value}}',
						},
					},
				},
			},
		],
	};
}
