const log = require('log-to-file');
const unhandledRejections = new Map();
module.exports = (client) => {
	client.antiCrash = async () => {
		process.on('beforeExit', (code) => {
			log(`Process beforeExit event with code: ${code}`, `./logs/process-logs.log`);
		});

		process.on('exit', (code) => {
			log(`Process exit event with code: ${code}`, `./logs/process-logs.log`);
		});

		process.on('disconnect', () => {
			log(`Process disconnected`, `./logs/process-logs.log`);
		});
		
		process.on('unhandledRejection', (reason, promise) => {
			unhandledRejections.set(promise, reason);
			log(`Unhandled rejection\n${promise}\n${reason}`, `./logs/process-logs.log`);
		});

		process.on('rejectionHandled', (promise) => {
			unhandledRejections.delete(promise);
			log(`Rejection handled\n${promise}`, `./logs/process-logs.log`);
		});

		process.on("uncaughtException", (err, origin) => {
			log(`Caught exception: ${err}\nException origin: ${origin}`, `./logs/process-logs.log`);
		});

		process.on("uncaughtExceptionMonitor", (err, origin) => {
			log(`[MONITOR] Caught exception: ${err}\nException origin: ${origin}`, `./logs/process-logs.log`);
		});

		process.on("unhandledRejection", (reason, promise) => {
			log(`Unhandled rejection at: ${promise}\nReason: ${reason}`, `./logs/process-logs.log`);
		});

		process.on("warning", (warning) => {
			log(`[Warning]: ${warning}`, `./logs/process-logs.log`);
		});
		
		process.on("worker", (worker) => {
			log(`Worker created: ${worker}`, `./logs/process-logs.log`);
		});
	}
};
