# Python test project 1

tutorial: https://www.youtube.com/watch?v=KxvKCSwlUv8

To create a virtual environment: 
`python3 -m venv venv`  (or whichever the path to python3 is) where second venv is folder name

to use we need to activate it
`source venv/bin/activate`

create `requirements.txt` 
then to use it: `pip install -r requirements.txt`

Then https://www.youtube.com/watch?v=TOjt6IHGnWw to install serverless python3
`serverless create --template true` - will fail but will list all available templates
`serverless create --template aws-python3`