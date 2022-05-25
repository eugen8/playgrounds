# Cloudformation templates

Location of this: https://github.com/eugen8/playgrounds/tree/main/cloudformations

From tutorials: 

* https://catalog.workshops.aws/cfn101/en-US/introduction with code here: https://github.com/aws-samples/cfn101-workshop 

* O'Reilly book: AWS CloudFormation Master Class
 https://www.oreilly.com/library/view/aws-cloudformation-master/9781789343694/
with code: https://github.com/PacktPublishing/AWS-CloudFormation-Master-Class-V- 



## template-and-stack.yml
```
aws cloudformation create-stack --stack-name s3stacktest  --template-body file://template-and-stack.yml 


aws cloudformation describe-stack-events \
    --stack-name s3stacktest \
    --max-items 2

```

Cost estimation `aws cloudformation estimate-template-cost \
    --template-body file://template-and-stack.yml 
`

