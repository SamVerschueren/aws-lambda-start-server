# AWS Lambda Start Server

> AWS Lambda function that starts a server.

## Usage

Download the zip file and deploy it as a lambda function. The name of the lambda function can be something like `OfficeHoursLauncher`.

After you deployed the lambda function, you navigate to `Event sources` and choose for the `Scheduled Event`. Provide a name for your scheduled event,
for instance `OfficeHoursLaunchSchedular`. The following expression will run the lambda function every weekday at 7:45 AM.

```
cron(45 7 ? * MON-FRI *)
```

The lambda function will start all the instances that have a tag `LaunchGroup` with the value being the name of your lambda function, in this case for instance
`OfficeHoursLauncher`.

## Author

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
