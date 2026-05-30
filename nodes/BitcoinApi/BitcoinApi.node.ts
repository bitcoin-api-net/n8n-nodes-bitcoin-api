import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class BitcoinApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Bitcoin API',
		name: 'bitcoinApi',
		icon: 'file:bitcoinApi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
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
			baseURL: 'https://bitcoin-api.net/api/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
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
						name: 'Get Klines (Candles)',
						value: 'getKlines',
						action: 'Get historical klines',
						routing: {
							request: {
								method: 'GET',
								url: '/prices/klines',
							},
						},
					},
					{
						name: 'Get Current Kline (Candle)',
						value: 'getCurrentKline',
						action: 'Get current open kline',
						routing: {
							request: {
								method: 'GET',
								url: '/prices/klines/current',
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
				default: 'btcusdt',
				description: 'Trading pair symbol, e.g., btcusdt',
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
					show: { operation: ['getKlines', 'getCurrentKline'] },
				},
				options: [
					{ name: '1m', value: '1m' },
					{ name: '5m', value: '5m' },
					{ name: '15m', value: '15m' },
					{ name: '30m', value: '30m' },
					{ name: '1h', value: '1h' },
					{ name: '4h', value: '4h' },
					{ name: '6h', value: '6h' },
					{ name: '12h', value: '12h' },
					{ name: '1d', value: '1d' },
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
					show: { operation: ['getKlines'] },
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
			{
				displayName: 'From',
				name: 'from',
				type: 'dateTime',
				displayOptions: {
					show: { operation: ['getKlines'] },
				},
				default: '',
				description: 'Start date/time',
				routing: {
					request: {
						qs: {
							from: '={{$value ? new Date($value).toISOString() : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'dateTime',
				displayOptions: {
					show: { operation: ['getKlines'] },
				},
				default: '',
				description: 'End date/time',
				routing: {
					request: {
						qs: {
							to: '={{$value ? new Date($value).toISOString() : undefined}}',
						},
					},
				},
			},
		],
	};
}
