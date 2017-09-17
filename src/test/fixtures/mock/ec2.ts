import * as AWS from 'aws-sdk';

const stub: any = AWS;

class EC2 {
	describeInstances(params, cb) {
		// Do nothing
	}

	startInstances(params, cb) {
		// Do nothing
	}
}

const ec2: any = new EC2();

stub.EC2 = function () {	// tslint:disable-line:only-arrow-functions
	return ec2;
};

export { ec2 };
