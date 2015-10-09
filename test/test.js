import test from 'ava';
import pify from 'aws-lambda-pify';
import index from '../';

const fn = pify(index.handler);

test('result', async t => {
	const result = await fn({hello: 'world'});

    t.same(result, {hello: 'world'});
});
