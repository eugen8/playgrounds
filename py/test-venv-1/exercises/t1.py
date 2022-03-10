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


class MyT1Class:
    def __init__(self, name):
        self.name = name + "_named"

    def myFunction(self):
        return "Hello world, myFunction called on name=" + self.name

    @staticmethod  # if missing then TypeError: unbound method myStaticNoArgFun() must be called with MyT1Class instance as first argument (got nothing instead)
    def myStaticNoArgFun():
        return "Hello world, no arg fun"


mc = MyT1Class("Gene")
print(mc.name)  # Gene_named
print(mc.myFunction())  # Hello world, myFunction called on name=Gene_named
print(MyT1Class.myStaticNoArgFun())  # Hello world, no arg fun

try:
    print(x123)
except NameError:
    print("Variable x123 is not defined")  # will print
except:
    print("Something else went wrong")
finally:
    print("and we are done trying and excepting")  # will print

notify_re = re.compile(r"Result of calling WmsService wmsClient\.(?P<propKey>[\w]+)")
props = notify_re.search("Result of calling WmsService wmsClient.submitShipment and so forth")
print(props)
if not props:
    raise Exception("Expected to find something")
print(props[0])  # Result of calling WmsService wmsClient.submitShipment
print(props[1])  # submitShipment
