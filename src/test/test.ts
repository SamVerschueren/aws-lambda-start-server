import ava from 'ava';
import { ec2 } from './fixtures/mock/ec2';
import { bootstrap } from './fixtures/bootstrap';
import { createCronRequest } from './fixtures/utils';

const test = ava.serial;

bootstrap(test);

test('start instances', async t => {
	await t.context.fn(createCronRequest('Foo'));

	t.deepEqual(ec2.startInstances.lastCall.args[0], {
		InstanceIds: ['1']
	});
});

test('only start stopped instances', async t => {
	await t.context.fn(createCronRequest('Unicorn'));

	t.deepEqual(ec2.startInstances.lastCall.args[0], {
		InstanceIds: ['6']
	});
});

test('only start stopped instances', async t => {
	await t.context.fn('Rainbow');

	t.deepEqual(ec2.startInstances.lastCall.args[0], {
		InstanceIds: ['9', '14']
	});
});
