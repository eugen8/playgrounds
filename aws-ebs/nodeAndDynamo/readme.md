# Deploying a Node.js application with DynamoDB to Elastic Beanstalk


Tutorial From

https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-dynamodb-tutorial.html

Prereqs: 
* aws cli
* default aws profile needs setup to desired profile (for some reason)


```
eb init --platform node.js --region us-east-1

eb create --sample nodejs-example-dynamo

eb open

``` 

Attach AmazonSNSFullAccess policy to the role that was created with the EBS deployment aws-elasticbeanstalk-ec2-role [using CLI v2](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/attach-role-policy.html)

```
aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/AmazonSNSFullAccess --role-name aws-elasticbeanstalk-ec2-role

aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess --role-name aws-elasticbeanstalk-ec2-role

```

Then you can list roles https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/list-roles.html
`aws iam list-roles`


These are AWS managed policies, to list them we can use:
`aws iam list-attached-role-policies --role-name aws-elasticbeanstalk-ec2-role`
(`iam list-role-policies` doesn't work for aws managed policies)

