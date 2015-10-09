import test from 'ava';
import pify from 'aws-lambda-pify';
import AWS from 'aws-sdk';
import sinon from 'sinon';
import {ec2} from './fixtures/stubs';
import index from '../';
import * as data from './fixtures/describeInstances.json';

const fn = pify(index.handler);

test.serial('Filters the instances with the correct tag', async t => {
	sinon.stub(ec2, 'describeInstances').yields(undefined, data.noReservations);
	sinon.stub(ec2, 'startInstances').yields();

	try {
		await fn();

		t.true(ec2.describeInstances.calledWith({
			Filters: [
				{
					Name: 'tag:LaunchGroup',
					Values: [
						'aws-lambda-mock-context'
					]
				}
			]
		}));
	} finally {
		ec2.describeInstances.restore();
		ec2.startInstances.restore();
	}
});

test.serial('no instances are started because reservations are empty', async t => {
	sinon.stub(ec2, 'describeInstances').yields(undefined, data.noReservations);
	sinon.stub(ec2, 'startInstances').yields();

	try {
		await fn();

		t.true(ec2.startInstances.notCalled);
	} finally {
		ec2.describeInstances.restore();
		ec2.startInstances.restore();
	}
});

test.serial('starts one instance', async t => {
	sinon.stub(ec2, 'describeInstances').yields(undefined, data.oneInstance);
	sinon.stub(ec2, 'startInstances').yields();

	try {
		await fn();

		t.true(ec2.startInstances.calledWith({
			InstanceIds: [
				'i-abc123'
			]
		}));
	} finally {
		ec2.describeInstances.restore();
		ec2.startInstances.restore();
	}
});

test.serial('starts only the stopped instances', async t => {
	sinon.stub(ec2, 'describeInstances').yields(undefined, data.multipleInstances);
	sinon.stub(ec2, 'startInstances').yields();

	try {
		await fn();

		t.true(ec2.startInstances.calledWith({
			InstanceIds: [
				'i-abc123',
				'i-ghi789'
			]
		}));
	} finally {
		ec2.describeInstances.restore();
		ec2.startInstances.restore();
	}
});
