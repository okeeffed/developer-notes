---
menu: Flask
name: Hello World!
---

# Flask Hello World

## Prereqs

```shell
pip install Flask
```

## The Basic Code

First, create `hello.py`.

```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()
```

Now run `python hello.py` in the terminal. Once the server is up and running you can `curl http://localhost:5000`.
