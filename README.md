# AWS Lambda Start Server [![Build Status](https://travis-ci.org/SamVerschueren/aws-lambda-start-server.svg?branch=master)](https://travis-ci.org/SamVerschueren/aws-lambda-start-server)

> AWS Lambda function that will start servers that have a tag with the key `LaunchGroup` and the value the name of the lambda function.

## Usage

Download the [zip](https://github.com/SamVerschueren/aws-lambda-stop-server/releases) file and deploy it as a lambda function.

After you deployed the lambda function, you navigate to `Event sources` and choose for the `Scheduled Event`. After naming your event, you can provide
the following schedule expression.

```
cron(45 7 ? * MON-FRI *)
```

This expression wil launch the servers every weekday, from monday to friday, at 7:45 AM.

### Tags

Tagging your instance is very important in order for the lambda function to work properly. The lambda function will retrieve all the instances that have a tag with a key `LaunchGroup`,
and a value being the name of the lambda function you provided.

For instance, if you named your lambda function `OfficeHoursLauncher`, make sure you add a tag with key-value `LaunchGroup=OfficeHoursLauncher` to all the instances you want to launch
at the provided schedule.

### IAM Roles

Make sure your lambda function is able to describe and start instances.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "MyStatementId",
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances",
                "ec2:StartInstances"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

## Author

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
