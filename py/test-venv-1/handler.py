import json
import boto3

s3 = boto3.resource('s3')


def hello(event, context):
    print("calling hello lambda")
    print(json.dumps(event))
    try:
        return dict(
            statusCode=200,
            body=json.dumps({
                'access_token': '90e3j2oilkfdasjllkfdasj90re3jf',
                '.expires': '2022-03-03T23:55:15Z'
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
    print(json.dumps(event))
    req = json.loads(event["body"])
    code = req[0]["Code"]
    if code == "65001":
        res = dict(statusCode=200, body=json.dumps({'Success': 'true'}))
    else:
        res = dict(statusCode=200, body=json.dumps(
            {
                "Code": None,
                "Errors": ["Carrier Package Type cannot be found : PB5 24x36. Column : WAOR_CARRIERPACKAGETYPEID"],
                'Success': False
            }))

    return res


def warehouseOrderGetId(event, context):
    req = json.loads(event["body"])
    code = req["Code"]
    return dict(
        statusCode=200,
        body=json.dumps({
            'Data': [
                {
                    'Code': code,
                    'ID': '12345'
                }
            ]
        })
    )
