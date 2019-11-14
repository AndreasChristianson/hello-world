# equation-expander

We'd like an app that takes user input and displays a clever tree of the expressions involved. 

## Phase one: api
provide an endpoint that takes in a string and returns the json representation of the expression.
 - the objects should be shaped as an expression with an operator and a list of arguments
 - arguments can be expressions
 - the leaves of the json object should be the first expression to be evaluated
 - supported operators
   - equals
   - additions
   - subtraction
   - multiplication
   - division
   - power

### example 1:
input:
```
curl localhost:5555/api/expression -d '"1+1=2"' -H 'Content-Type: application/json' -v
```
output:
```
{
    "operator": "equals",
    "arguments": [
        {
            "operator": "addition",
            "arguments": [
                1,
                1
            ]
        },
        2
    ]
}
```

### example 2:
input:
```
curl localhost:5555/api/expression -d '"x^2 + 2x + 10"' -H 'Content-Type: application/json' -v
```
output:
```
{
    "operator": "addition",
    "arguments": [
        {
            "operator": "power",
            "arguments": [
                "x",
                2
            ]
        },
        {
            "operator": "addition",
            "arguments": [
                {
                    "operator": "multiplication",
                    "arguments": [
                        2,
                        "x"
                    ]
                },
                10
            ]
        }
    ]
}
```
