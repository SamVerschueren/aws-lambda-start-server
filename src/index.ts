import * as path from 'path';
import * as bragg from 'bragg';
import * as cron from 'bragg-cron';
import * as braggRouter from 'bragg-router';

// Controllers
import { start } from './lib/controllers/start';

// Middlewares
import { runningInstanceIds } from './lib/middlewares/ec2';

// Create all the routes
function routes() {
	const router = braggRouter();

	router.post('cron:{group}', runningInstanceIds, start);

	return router.routes();
}

// Create app and bootstrap middleware
const app = bragg();
app.use(cron());
app.use(ctx => {
	if (!ctx.path && typeof ctx.req === 'string') {
		// If the request is purly a string, the function was invoked manually and the data should be used as group name
		ctx.path = `cron:${ctx.req}`;
		ctx.method = 'POST';
	}
});
app.use(routes());

// Listen for requests
export const handler = app.listen();
