# Cloudformation templates

Location of this: https://github.com/eugen8/playgrounds/tree/main/cloudformations

From tutorials: 

* https://catalog.workshops.aws/cfn101/en-US/introduction with code here: https://github.com/aws-samples/cfn101-workshop 

* O'Reilly book: AWS CloudFormation Master Class
 https://www.oreilly.com/library/view/aws-cloudformation-master/9781789343694/
with code: https://github.com/PacktPublishing/AWS-CloudFormation-Master-Class-V- 
with Stephane Maarek



## tp1-template-and-stack.yml

Primarily shows how to pass parameters as command line arguments or in a file
and create-stack vs deploy (which both deploy, create-stack will fail if it's already been created).

```
aws cloudformation create-stack --stack-name s3stacktest9329d  \
 --template-body file://tp1-template-and-stack.yml \
 --parameters ParameterKey=S3BucketName,ParameterValue=hello-what-paramspassedin

aws cloudformation create-stack --stack-name s3stacktest223  \
 --template-body file://tp1-template-and-stack.yml \
 --parameters file://tp1-template-and-stack-params.json
```

OR 

```
aws cloudformation deploy --stack-name s3stacktest1 \
 --template-file tp1-template-and-stack.yml \
 --parameter-overrides S3BucketName=hello-what1

aws cloudformation deploy --stack-name s3stacktest1 \
 --template-file tp1-template-and-stack.yml \
 --parameter-overrides $(cat tp1-param-override.json)


aws cloudformation describe-stack-events \
    --stack-name s3stacktest \
    --max-items 2

```

Cost estimation `aws cloudformation estimate-template-cost \
    --template-body file://tp1-template-and-stack.yml 
```

aws cloudformation delete-stack --stack-name s3stacktest

