import * as pify from 'aws-lambda-pify';
import * as sinon from 'sinon';
import { ec2 } from './mock/ec2';

export function bootstrap(test: any) {
	const sandbox = sinon.sandbox.create();

	test.before(() => {
		const describeInstances = sandbox.stub(ec2, 'describeInstances');
		describeInstances.withArgs({ Filters: [{ Name: 'tag:LaunchGroup', Values: ['Foo'] }] }).yields(undefined, {
			Reservations: [
				{
					Instances: [
						{
							InstanceId: '1',
							State: {
								Code: 80
							}
						}
					]
				}
			]
		});

		describeInstances.withArgs({ Filters: [{ Name: 'tag:LaunchGroup', Values: ['Unicorn'] }] }).yields(undefined, {
			Reservations: [
				{
					Instances: [
						{
							InstanceId: '1',
							State: {
								Code: 0
							}
						},
						{
							InstanceId: '2',
							State: {
								Code: 16
							}
						},
						{
							InstanceId: '3',
							State: {
								Code: 32
							}
						},
						{
							InstanceId: '4',
							State: {
								Code: 48
							}
						},
						{
							InstanceId: '5',
							State: {
								Code: 64
							}
						},
						{
							InstanceId: '6',
							State: {
								Code: 80
							}
						}
					]
				}
			]
		});

		describeInstances.withArgs({ Filters: [{ Name: 'tag:LaunchGroup', Values: ['Rainbow'] }] }).yields(undefined, {
			Reservations: [
				{
					Instances: [
						{
							InstanceId: '9',
							State: {
								Code: 80
							}
						},
						{
							InstanceId: '14',
							State: {
								Code: 80
							}
						}
					]
				}
			]
		});

		describeInstances.yields(undefined, {
			Reservations: [
				{
					Instances: []
				}
			]
		});

		const startInstances = sandbox.stub(ec2, 'startInstances');
		startInstances.yields();
	});

	test.after(() => {
		sandbox.restore();
	});

	test.beforeEach(t => {
		t.context.fn = (request: any) => {
			const index = require('../..');
			return pify(index.handler)(request);
		};
	});
}
