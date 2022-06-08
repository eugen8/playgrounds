
Starting customizing it to get to  understand kinesis:
https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis-example.html

Create role (for some reason it fails in cli) docs url: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_CreateStack.html 
```
aws cloudformation create-stack \
--stack-name kinesis-lambda-plain \
--template-body file://cf1.json \
--capabilities CAPABILITY_NAMED_IAM
``` 

later: 
`aws cloudformation describe-stacks --stack-name kinesis-lambda-plain`

`zip function.zip index.js`


`export my_aws_acct=$(aws sts get-caller-identity | jq ".Account" | xargs echo )`

```
aws lambda create-function --function-name ProcessKinesisRecords \
--zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x \
--role arn:aws:iam::${my_aws_acct}:role/lambda-kinesis-role
```

`aws lambda invoke --function-name ProcessKinesisRecords --payload file://test_lambda_input_1.txt --cli-binary-format raw-in-base64-out  out.txt`
(added cli-binary-format otherwise failing)

Create kinesis
`aws kinesis create-stream --stream-name lambda-stream --shard-count 1`

Check on it with `aws kinesis describe-stream --stream-name lambda-stream`

Add an event source in AWS Lambda
```
aws lambda create-event-source-mapping --function-name ProcessKinesisRecords \
--event-source  arn:aws:kinesis:us-east-1:${my_aws_acct}:stream/lambda-stream \
--batch-size 100 --starting-position LATEST
```

Note the mapping ID = "UUID": "160b4bd4-de57-4ca1-85f7-09646422c921",
-- To see the event sources later (and if value is enabled): 
`aws lambda list-event-source-mappings --function-name ProcessKinesisRecords  --event-source arn:aws:kinesis:us-east-1:${my_aws_acct}:stream/lambda-stream`


To test the event source mapping, add event records to your Kinesis stream. The --data value is a string that the CLI encodes to base64 prior to sending it to Kinesis. You can run the same command more than once to add multiple records to the stream. (The raw-in-base64-out needed for CLI 2.0)
```
aws kinesis put-record --stream-name lambda-stream --partition-key 1 --data "Hello, this is a test 123" --cli-binary-format raw-in-base64-out
``` 


View logs here: https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups
(/aws/lambda/ProcessKinesisRecords)
It did contain INFO Decoded payload: Hello, this is a test 123


Access the stream:
https://us-east-1.console.aws.amazon.com/kinesis/home

Clean-up details in: 
https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis-example.html