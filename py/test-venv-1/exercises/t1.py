import re

x = 12

print("x is ", x, 1020)  # x is  12 1020

y = {
    "a": "hello",
    "name": "Gene"
}
print(y)  # {'a': 'hello', 'name': 'Gene'}

aDictionary = dict(
    x=3,
    y=4
)
print("dict initialized", aDictionary)

otherDict = dict(y)  # dict initialized {'x': 3, 'y': 4}
print("other dictionary", otherDict)  # ther dictionary {'a': 'hello', 'name': 'Gene'}

print(type(y) == type(otherDict), type(y))  # True <class 'dict'>
print("access aDictionary element like this: ", aDictionary["x"])  # access aDictionary element like this:  3
# print("can't do this", aDictionary.x) # AttributeError: 'dict' object has no attribute 'x'


class MyT1Class:
    def __init__(self, name):
        self.name = name + "_named"

    def myFunction(self):
        return "Hello world, myFunction called on name=" + self.name

    @staticmethod  # if missing then TypeError: unbound method myStaticNoArgFun() must be called with MyT1Class instance as first argument (got nothing instead)
    def myStaticNoArgFun():
        return "Hello world, no arg fun"

    @classmethod
    def class_foo(cls, x):
        print(f"executing class_foo({cls}, {x})")

print("\nFUN WITH CLASSES MyT1Class")
mc = MyT1Class("Gene")
print(mc.name)  # Gene_named
print(mc.myFunction())  # Hello world, myFunction called on name=Gene_named
print(MyT1Class.myStaticNoArgFun())  # Hello world, no arg fun
MyT1Class.class_foo(123) #executing class_foo(<class '__main__.MyT1Class'>, 123)

print("\nException handing")
try:
    print(x123)
except NameError:
    print("Variable x123 is not defined")  # will print
except Exception as x:
    print(f"Something else went wrong, exception is {x}")
finally:
    print("and we are done trying and excepting")  # will print

print("\n and regex")
notify_re = re.compile(r"Result of calling WmsService wmsClient\.(?P<propKey>[\w]+)")
props = notify_re.search("Result of calling WmsService wmsClient.submitShipment and so forth")
print(props)
if not props:
    raise Exception("Expected to find something")
print(props[0])  # Result of calling WmsService wmsClient.submitShipment
print(props[1])  # submitShipment

print("\nSOME JSON")
import json
res = dict(statusCode=200, body=json.dumps({'Success': 'true'}) )
print(res)