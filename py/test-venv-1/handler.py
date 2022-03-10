import json
import boto3

s3 = boto3.resource('s3')

def hello(event, context):
    try:
        return dict(
        statusCode=200,
         body = json.dumps({
             'access_token' : '90e3j2oilkfdasjllkfdasj90re3jf',
             '.expires' : '2022-03-03T23:55:15Z'
         })
    )
    except Exception as e:
        return dict(
            statusCode=200,
            body=json.dumps(event)
        )
def submitShipment(event, context):
    #  return dict(
    #     statusCode=200,
    #     body=json.dumps(event)
    # )
    return dict(
            statusCode= 200,
            body= json.dumps({
                'Success': 'true'
            })
        )
def warehouseOrderGetId(event, context):
    return dict(
        statusCode = 200,
        body = json.dumps({
            'Data': [
                {
                    'Code': '65001',
                    'ID': '12345'
                }
            ]
        })
    )