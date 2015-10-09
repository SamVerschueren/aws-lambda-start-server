import AWS from 'aws-sdk';
import sinon from 'sinon';

export const ec2 = {
	describeInstances: () => {},
	startInstances: () => {}
};

sinon.stub(AWS, 'EC2').returns(ec2);
