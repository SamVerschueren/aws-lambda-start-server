import * as AWS from 'aws-sdk';
import * as pify from 'pify';
import { Context } from '../types/context';

const ec2 = new AWS.EC2();

const startInstances = pify(ec2.startInstances.bind(ec2));

export async function start(ctx, instanceIds: number[]) {
	const params = {
		InstanceIds: instanceIds
	};

	return await startInstances(params);
}
