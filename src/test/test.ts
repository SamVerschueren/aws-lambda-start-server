import ava from 'ava';
import { ec2 } from './fixtures/mock/ec2';
import { bootstrap } from './fixtures/bootstrap';

const test = ava.serial;

bootstrap(test);

test('start instances', async t => {
	await t.context.fn('Foo');

	t.deepEqual(ec2.startInstances.lastCall.args[0], {
		InstanceIds: ['1']
	});
});

test('only start stopped instances', async t => {
	await t.context.fn('Unicorn');

	t.deepEqual(ec2.startInstances.lastCall.args[0], {
		InstanceIds: ['6']
	});
});
