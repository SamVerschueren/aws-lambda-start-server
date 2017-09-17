import * as AWS from 'aws-sdk';
import * as pify from 'pify';
import { Context } from '../types/context';

const ec2 = new AWS.EC2();

const describeInstances = pify(ec2.describeInstances.bind(ec2));

export async function runningInstanceIds(ctx: Context) {
	const params = {
		Filters: [
			{
				Name: 'tag:LaunchGroup',
				Values: [
					ctx.request.params.group
				]
			}
		]
	};

	// Describe the instances
	const data = await describeInstances(params);

	// Collect all the instances with a status code equal to `80`
	const ids = [];

	for (const reservation of data.Reservations) {
		for (const instance of reservation.Instances) {
			if (instance.State.Code === 80) {
				// 0: pending, 16: running, 32: shutting-down, 48: terminated, 64: stopping, 80: stopped
				ids.push(instance.InstanceId);
			}
		}
	}

	return ids;
}
