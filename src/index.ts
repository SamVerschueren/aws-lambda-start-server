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
app.use(routes());

// Listen for requests
export const handler = app.listen();
