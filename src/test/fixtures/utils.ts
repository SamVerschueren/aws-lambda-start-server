export function createCronRequest(ruleName: string) {
	return {
		'detail-type': 'Scheduled Event',
		source: 'aws.events',
		time: new Date(),
		id: 'cdc73f9d-aea9-11e3-9d5a-835b769c0d9c',
		resources: [
			`arn:aws:events:eu-west-1:123456789012:rule/${ruleName}`
		]
	};
}
