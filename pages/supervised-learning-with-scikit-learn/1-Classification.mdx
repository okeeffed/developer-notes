# Classification

Machine Learning

"Given computers the ability to learn and make decisions from data without being explicitly programmed."

Examples:

1. Assign emails as spam or not spam (labels = supervised learning)
2. Clustering Wikipedia entries into different categories (no labels = unsupervised learning)

## Unsupervised learning

Uncovering hidden patterns from unlabels data.

1. Grouping customers into distinct categories (clustering)

## Reinforcement learning

Software agents interact with an environment by taking actions.

1. Learn how to optimize their behaviour.
2. Given a system of rewards or punishments.
3. Draws inspirations form behavioural psychology.

Applications are economocis, genetics and game playing.

## Supervisted leraning

- Predictor variables/features and a target variable.

Data is commonly represented in a data structure.

We have the predictor variables/features as the independent variables and the target variable as the dependent variable that we wish to make predictions about.

The aim is to predict the target variable, given the predictor variables.

If target variable consists of categories (like spam or not spam), then it is a classification task.

If the target variable is a continuously varying variable (like house pricing), then it is a regression task.

### Naming conventions

- Features == predictor variables == independent variables
- Target variable == dependent variable == response variable

The goal is to:

1. Automate time-consuming or expensive manual tasks.
2. Make predictions about the future ie will a customer click on an ad or not?
3. Need labeled data to train the model. We can get it by:
   - Getting historical data.
   - Perform experiments to get data.
   - Crowd-sourcing labeled data.

These are many ways to do supervised learning in Python. The focus for this will be on `scikit-learn` (also known as `sklearn`).

It integrates well with `SciPy` stack.

Other libraries include Tensorflow and Keras.

## Our first dataset

We will use some `datasets` from `sklearn` for the first exercises.

```py
from sklearn import datasets
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
plt.style.use('ggplot')
iris = datasets.load_iris()
type(iris) # sklearn.datasets.base.Bunch - a dictionary-like object with key-value pairs

print(iris.keys()) # dict_keys(['data', 'target', 'target_names', 'DESCR', 'feature_names'])

type(iris.data) # numpy.ndarray
type(iris.target) # numpy.ndarray)

iris.data.shape # (150, 4) - 150 rows and 4 columns

iris.target_names # array(['setosa', 'versicolor', 'virginica'], dtype='<U10') these will be encoded as 0, 1, 2

X = iris.data
y = iris.target

df = pd.DataFrame(X, columns=iris.feature_names)
print(df.head()) # print the first 5 rows

# Help visualize the data.
# c stands for color so we're all colors by species.
# figsize will be the size of the figure.
# marker is the shape of the points.
_ = pd.plotting.scatter_matrix(df, c = y, figsize = [8,8], s = 150, marker = 'D')
```

## Building a classifier

Take unlabeled data as input and outputs the class label.

We choose a type of classifier that learns from the already labelled data. This is known as `training data`.

We will use the `k-n-neighbors` classifier in today's example (also known as `k-NN`).

The basic idea is that we can predict the label of a data point by looking at the `k` closest labeled data points and taking a "majority vote".

If `k=3`, we would take the 3 latest labeled data points and take the majority vote.

If `k=5`, we would take the 5 latest labeled data points and take the majority vote.

If `k=1`, we would take the closest labeled data point.

What it algorithm does is create a set of decision boundaries. Anything within those decision boundaries are considered to be in the same class.

## Scikit-learn fit and predict

All ML models are implemented as Python classes.

- They implement the algos for learning and predicting.
- They store the information learned from the data.

We can use the `fit` method to train the classifier and `predict` method to assign a label.

To use it, we can do the following:

```py
from sklearn.neighbors import KNeighborsClassifier

# Set this to create boundaries based on 6 closest neight.
knn = KNeighborsClassifier(n_neighbors=6)

knn.fit(iris.data, iris.target)
```

The arguments for `fit` requires both arguments to be a numpy array.

The data for Scikit learn must always be a numpy array or data frame.

It also requires that features take on continuous values as opposed to categories.

There also cannot be any missing data (these will be explored later on how to deal with them).

The scikit learn API requires that features are in an array where each column is a feature and each for is a data point.

The `iris.data.shape` will have the number of data points and the number of features. The `iris.target.shape` requires that the number of data points is the same as the labeled data.

## Using the fit classifier

```py
# A set of unlabeled data.
X_new = np.array([[5.6, 2.8, 3.9, 1.1], [5.7, 2.6, 3.8, 1.3], [4.7, 3.2, 1.3, 0.2]])

prediction = knn.predict(X_new)
X_new.shape # (1, 4) - 1 data point and 4 features (assuming in the example about you just used the first example and not more)

print(prediction) # array([0]) - 0 is the label for the first example which will map to one of the iris labels

# The prediction is [1 1 0] which maps to [versicolor versicolor setosa]
```

## Measuring model performance

How was our classifiers performance? We need a metric. `accuracy` is a common metric to use.

> Accuracy = Fraction of correct predictions

Which data do we use to compute accuray? We want to know how well the model will work on new data. Testing against training data is NOT indicative of ability to generalize.

Generally, we want to train and fit on a training set, then make predications on a test set.

Then, we compare and compute the accuracy of the model on the test set.

It is best practice to perform split so that split reflects labels on the data. We want labels to be split in the test and train set as they are in the original data set. We do this with `stratify=y`.

```py
from sklearn.model_selection import train_test_split

# Use the function to randomly split out data into a training set and a test set.
# We can reproduce the split we did in the first example by setting the random_state keyword arg.
# @see https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=21, stratify=y)

from sklearn.neighbors import KNeighborsClassifier

# Set this to create boundaries based on 6 closest neight.
knn = KNeighborsClassifier(n_neighbors=6)

knn.fit(X_train, y_train)
y_pred = knn.predict(X_test)

# Prints list with predictions of the test set labels (encoded as ints).
print(y_pred)

# Checking the score by printing it out
print(knn.score(X_test, y_test)) # 0.9111111 for 6 neighbors
```

As `k` increases, the decision boundary becomes smoothers (a less complex model).

Smaller `k` is more complex and can lead to `overfitting`.

If you increase `k` even more, you can end up `underfitting`.

There is a sweet spot in the middle that gives us the be fit.

## Calculating accuracy for a classifier

We can check overfitting/underfitting by iterating over a range of `k` and calculating the accuracy.

```py
# Setup arrays to store train and test accuracies
neighbors = np.arange(1, 9)
train_accuracy = np.empty(len(neighbors))
test_accuracy = np.empty(len(neighbors))

# Loop over different values of k
for i, k in enumerate(neighbors):
    # Setup a k-NN Classifier with k neighbors: knn
    knn = KNeighborsClassifier(n_neighbors = k)

    # Fit the classifier to the training data
    knn.fit(X_train, y_train)

    #Compute accuracy on the training set
    train_accuracy[i] = knn.score(X_train, y_train)

    #Compute accuracy on the testing set
    test_accuracy[i] = knn.score(X_test, y_test)

# Generate plot
plt.title('k-NN: Varying Number of Neighbors')
plt.plot(neighbors, test_accuracy, label = 'Testing Accuracy')
plt.plot(neighbors, train_accuracy, label = 'Training Accuracy')
plt.legend()
plt.xlabel('Number of Neighbors')
plt.ylabel('Accuracy')
plt.show()
```
