---
menu: Machine Learning
name: Practical Deep Learning
---

# Practical Deep Learning

## Resources

1. [FE Masters Course](https://frontendmasters.com/courses/practical-machine-learning/)
2. [Practical Deep Learning](https://github.com/Vadikus/practicalDL)
3. [Install Jupyter Notebook](https://jupyter.readthedocs.io/en/latest/install.html)
4. [TFJS Examples](https://github.com/tensorflow/tfjs-examples)
5. [PoseNet website](https://storage.googleapis.com/tfjs-models/demos/posenet/camera.html)
6. [Deep Learning With Python Book](https://www.manning.com/books/deep-learning-with-python)
7. [Deep Learning With Python GitHub Notebooks](https://github.com/fchollet/deep-learning-with-python-notebooks)
8. [Keras Website](https://keras.io/)
9. [Hands-on ML with Scikit-Learn, Keras and TF](https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/)
10. [Hands-on ML GitHub Notebooks](https://github.com/ageron/handson-ml2)
11. [Hands-on Neural Networks w/ TF 2.0](https://github.com/PacktPublishing/Hands-On-Neural-Networks-with-TensorFlow-2.0)
12. [TF Website](https://www.tensorflow.org/)
13. [Normal distribution](https://mathworld.wolfram.com/NormalDistribution.html)
14. [Linear Equations](https://mathworld.wolfram.com/LinearEquation.html)
15. [Polynomials](https://mathworld.wolfram.com/Polynomial.html)
16. [CPU vs GPU](https://www.geeksforgeeks.org/difference-between-cpu-and-gpu/)
17. [Understanding TPU](https://www.geeksforgeeks.org/understanding-tensor-processing-units/)
18. [Computational Graphs](https://colah.github.io/posts/2015-08-Backprop/)
19. [Heterogenous Programming](https://mcai.github.io/resources/papers/2017_0007364_reading/2017_Communications%20of%20ACM_Heterogeneous%20Computing_Here%20to%20Stay.pdf)
20. [Parallel Programming](https://www.geeksforgeeks.org/introduction-to-parallel-computing/)
21. [Math Kernel Library](https://software.intel.com/en-us/mkl)
22. [Matplotlib](https://matplotlib.org/)

## Introduction

The course itself will run through a Jupyter notebook.

Be sure to install the requirements using `pip install -r requirements.txt` to get all the prerequisite Python packages.

## Jupyter

Pressing `shift + enter` on a Jupyter notebook code will execute the code and move to the next cell for you.

## Statistics, Machine Learning and Deep Learning

The example given is that he collates data from people about shoe sizes people have and then using statistics to find the avg mean to get the most people the right size.

ML came about from statics and helps with distribution. ML tries to find the distributions and the values that decribe that distribution. At this point, you don't need much compute.

So people came up with the idea about being able to reproduce what we do in our brain. We have neurons that you can think of "chains" that process the input.

What is the input? It could just be any channels of data (ie x1, x2, x3 etc with associated data values). Each of our channels can then have `weights` ie w1, w2 etc and use these with the channel values to amplify or ignore the "weights" of importance of the data coming though the channel. This value could equate to the `sum of x(i) * w(i) + b` (where b is the bias).

This summation converts the channel into one input channel. If the neuron is activated, then it will output 1 and 0 if not. We use the `sigmoid` function to take a domain of negative infinity to infinity and scale it between 0 and 1 for the range.

Now, we can stack the neurons into layers that all "do something" with the inputs of information. We can also have multiple layers of these neurons. The "deep" part of deep learning comes from this layout.

> At the end we are basically looking for an output that is "spam or not spam".

This "spam or not spam" could be applied in an example to determine if a picture is something like "hotdog or not hotdog".

> Having multiple layers helps you jump from linearity to polynomials.

So how are the weights and biases selected? They are trained. That's how we get the magic of deep learning.

## Neurons and Model Training

> Each neuron has its own weights and biases.

To train, we need images of "what is a hotdog" and "what is not a hot dog" and we created the training dataset this way.

We do `forward progation` through the layers until it is activated or not activated. The magic comes in from our predication and whether or not it was correct or not. It uses that information to reinforce the weights and biases through a process call `backward propagation`.

## Training Model

In Machine learning, the idea is that we now have the "out" data coming from the processor with the "algo" that normally goes in as interchangeable, we get a generally idea of how we compute for training our neural network.

## Deep Learning & AI

Again, with in mind that statistics lead to ML, and DL became a progression of ML for information transformation.

> Reducing our input to one bit through the neural network.

> AI still cannot build something from scratch. You need to use those building blocks to generate the output.

## AI Modelling demo

> Something interesting about the "sunglasses" that we shown in the diagram is that the righthand side was referred to as deconvolution.

## Combining Neural Networks & AI

1. Convolutional Neural Networks (CNN): Used for images.
2. Recurrent Neural Networks (RNN): Used for data series, for example sound, text.

You can use a combination of both to try to answer the question from the input. What is interesting is that the training itself will be similar.

## Linear Regression

This section doesn't require TF, but it is used to demonstrate interesting answers.

```python
import matplotlib.pyplot as plt
from tensorflow.keras import Model

def make_noisy_data(w=0.1, b=0.3, n=100):
    # generates random dataco
    x = tf.random.uniform(shape=(n, ))
    noise = tf.random.normal(shape=(len(x), ), stddev=0.01)
    y = w * x + b + noise
    return x, y

X, Y = make_noisy_data()

plt.plot(X, Y, 'go')
plt.plot(X, 0.1*X+0.3)
```

> Note: writing `tf.random.uniform?` and executing will bring up the docs on the method.

## TensorFlow Architecture

TensorFlow attempts to optimise the hardware. TensorFlow is written in C and C++ and uses Python as the interface the "description of the model". The user "describes" models in Python, and then hands it off to C and C++ for the implementation of particular reverberations.

TF 1 was using (by default) building a computational graph.

> A computational graph here is basically all the code in Python being rebuilt as a computation graph with nodes being your operations and links between those graphs ease the opeartion. ie `a + b` in Python (or `tf.constant(a) + tf.constant(b)` for RF) will become two nodes of `a` and `b` connected by node `+` - similar to AST. TF was doing this (and still can) is because it allows it to optimise for a number of things. An example given was then taking the previous operation and then multiplying it by another value etc. It allows it to figure out things like required memory, if we can paralellize calls etc. It does this as one of the slowest processes is memory allocation.

### Cuda

Cuda can be used which was designed to program GPUs (NVIDIA to be specific) and NVIDIA also created CuDNN, which is heavily optimised library for paralellism. CuDNN has the basic building block of neural networks.

It's optimising a lot of the neural network operatiions that rely heavily on matrix-matrix multiplication or matrix-vector multiplication.

> GMM is general matrix-matrix multiplication.

For CPUs, there is MKL which is the math kernel library created by Intel. There is an abstraction using this called NumPy (numerical python package) is what TensorFlow is using. NumPy is a way to link your Python and C.

### Finalizing Everything

1. TF creates computational graph
2. It will try to use libraries based on available architectures (CuDNN of GPUs or MKL for CPUs)
3. TF is simply looking at Python description of the model and then figuring out which optimised C routines it should use to get the best speed out of the hardware that you have.

TF is swapping out their default behaviour. In TF 2 they use "eager execution". It means we will have all access to variables and that access will not be in the lazy form. It makes debugging significantly easier (which was a big benefit of PyTorch).

> Don't be surprised if the executed code on TF2 is somewhat slow. It is because TF1 uses the optimisation from the get go. TF2 provides the "development" environment.

## Plotting Uniform Data

```python
import tensorflow as tf

# showing how random works
var = tf.random.uniform([1])
print(var.numpy()) # [0.5515773]

# w weight, b bias, n number
def data_creation(w=0.1, b=0.5, n=100):
  X = tf.random.uniform(shape=(n,))
  print(X)
  return X

data_creation(n=10000)
```

`X` will print out 100 uniformly distributed numbers between 0 and 1 in the above code.

> With Jupyter notebooks, you can use `%matplotlib inline` where `%` for Jupyter is a "magic command".

```python
%matplotlib inline
import matplotlib.pyplot as mpl # common alias for pyplot

mpl.hist(X.numpy())
mpl.show()
```

## Plotting those points

```python
import tensorflow as tf
import matplotlib.pyplot as mpl

# showing how random works
var = tf.random.uniform([1])
print(var.numpy()) # [0.5515773]

# w weight, b bias, n number
def data_creation(w=0.1, b=0.5, n=100):
  X = tf.random.uniform(shape=(n,))
  print(X)
  noise = tf.random.normal(shape=(n,), mean=0.0, stddev=0.01)
  Y = X*w + b + noise
  return X.numpy(), Y.numpy()

X, Y = data_creation(n=10000)

mpl.plot(X, Y, 'bo')
mpl.plot([0,1], [0*w+b,1*w+b], 'g:') # g: is green dashed-line
```

> What the aim of this is that we want to learn what the "weights" and "biases" are to fit that kind of distribution of data.

The green dashed line produced is our ideal solution.

Here we will create a red line to illustrate the problem we are trying to solve.

```python
w_guess = 0.0
b_guess = 0.0

mpl.plot(X, Y, 'bo')
mpl.plot([0,1], [0*w_guess+b_guess,1*w_guess+b_guess], 'r:')
```

> Say we're trying to find the correlation between x and y, that could be represented by the data we just created. The green line will show the true dependency between those, while our red line is our prediction that we can create from that generated data.

We get the red line there by playing around with "w's" and "b's". We need to figure out the error for how far away we are.

```python
def predict(x):
  y = w_guess * x + b_guess
  return y

def mean_squared_error(y_pred, Y):
  return tf.reduce_mean(tf.square)

def loss():

```
