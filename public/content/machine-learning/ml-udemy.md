---
name: ML Udemy
menu: Machine Learning 
---
# Machine Learning - Udemy A-Z

---

<!-- TOC -->

- [Machine Learning - Udemy A-Z](#machine-learning---udemy-a-z)
	- [Part 1 - Data Preprocessing](#part-1---data-preprocessing)
	- [1. The initial data](#1-the-initial-data)
		- [Importing the Libraries](#importing-the-libraries)
		- [Importing the Dataset](#importing-the-dataset)
		- [Missing Data](#missing-data)
		- [Catagorical Variables](#catagorical-variables)
		- [Splitting the data into a Training Set and Test Set](#splitting-the-data-into-a-training-set-and-test-set)
		- [Feature Scaling](#feature-scaling)
		- [Templating Data Preprocessing](#templating-data-preprocessing)
	- [2. Regression](#2-regression)
	- [2.1: Simple Linear Regression](#21-simple-linear-regression)
		- [Intuition](#intuition)
		- [IN PYTHON](#in-python)
	- [2.2 Multiple Linear Regression](#22-multiple-linear-regression)
		- [Intuition](#intuition)
		- [How to build MLR models (step-by-step)](#how-to-build-mlr-models-step-by-step)
		- [IN PYTHON](#in-python)
		- [Backward Elimination - Multiple Linear Regression](#backward-elimination---multiple-linear-regression)
	- [2.3 Polynomial Linear Regression](#23-polynomial-linear-regression)
		- [Interpretation](#interpretation)
	- [2.4 Support Vector Regression](#24-support-vector-regression)
	- [3. Classification](#3-classification)
		- [3.1 Logistical Regression](#31-logistical-regression)
			- [Fitting LR to the training set](#fitting-lr-to-the-training-set)
			- [Making the prediction](#making-the-prediction)
			- [Investigating the confusion matrix](#investigating-the-confusion-matrix)
			- [Visualising the results](#visualising-the-results)
	- [3.2 K-Nearest Neighbours Algorith](#32-k-nearest-neighbours-algorith)
		- [Intuition](#intuition)
		- [K-NN in Python](#k-nn-in-python)
			- [Final Code](#final-code)
	- [3.3 Support Vector Machine (SVM)](#33-support-vector-machine-svm)
		- [SVM Intuition](#svm-intuition)
		- [SVM in Python](#svm-in-python)
	- [3.4 Kernel SVM](#34-kernel-svm)
		- [Kernel SVM Intuition](#kernel-svm-intuition)
			- [Mapping to a higher dimension](#mapping-to-a-higher-dimension)
			- [The Kernel trick](#the-kernel-trick)
			- [Types of Kernal Functions](#types-of-kernal-functions)
		- [Kernel SVM Example](#kernel-svm-example)
	- [3.5 Naive Bayes](#35-naive-bayes)
		- [Bayes Theorem](#bayes-theorem)
		- [Naive Bayes Intuition](#naive-bayes-intuition)
		- [Naive Bayes Example](#naive-bayes-example)
	- [3.6 Decision Trees Classification](#36-decision-trees-classification)
		- [Decision Tree Intuition](#decision-tree-intuition)
		- [Decision Tree Classification example](#decision-tree-classification-example)
	- [3.7 Random Forest Classification](#37-random-forest-classification)
		- [Random Forest Intuition](#random-forest-intuition)
		- [Random Forest Classification Example](#random-forest-classification-example)
	- [3.8 Evaluating Classification Model Performance](#38-evaluating-classification-model-performance)
		- [False Positives and False Negatives](#false-positives-and-false-negatives)
		- [Confusion matrix](#confusion-matrix)
		- [Accuracy Paradox](#accuracy-paradox)
		- [Cumulative Accuracy Profile (CAP)](#cumulative-accuracy-profile-cap)
		- [CAP Curve Analysis](#cap-curve-analysis)
	- [Classification Summary](#classification-summary)
		- [How do I know which model to choose for my problem?](#how-do-i-know-which-model-to-choose-for-my-problem)
		- [How can I improve each of these models?](#how-can-i-improve-each-of-these-models)
	- [4. Clustering](#4-clustering)
	- [4.1 K-Means Clustering](#41-k-means-clustering)
		- [K-Means Clustering Intuition](#k-means-clustering-intuition)
		- [K-Means Random Initialization Trap](#k-means-random-initialization-trap)
		- [Choosing the right number of clusters](#choosing-the-right-number-of-clusters)
		- [K-Means Clustering Example](#k-means-clustering-example)
	- [4.2 Hierarchichal Clustering](#42-hierarchichal-clustering)
		- [HC Intuition](#hc-intuition)
			- [Agglomerative HC](#agglomerative-hc)
			- [Calculating distance between clusters](#calculating-distance-between-clusters)
		- [How dendrograms work](#how-dendrograms-work)
		- [HC Using Dendrograms](#hc-using-dendrograms)
		- [HC Example](#hc-example)
			- [Determining optimum clusters](#determining-optimum-clusters)
		- [HC Full example](#hc-full-example)
	- [5. Associate Rule Learning](#5-associate-rule-learning)
	- [5.1 Apriori](#51-apriori)
		- [Apriori Intuition](#apriori-intuition)
			- [Steps](#steps)
			- [Support](#support)
			- [Confidence](#confidence)
			- [Lift](#lift)
		- [Apriori](#apriori)
	- [6. Reinforcement Learning](#6-reinforcement-learning)
	- [6.1 Upper Confidence Bound (UCB)](#61-upper-confidence-bound-ucb)
		- [The Multi-Armed Bandit Problem](#the-multi-armed-bandit-problem)
		- [UCB Intuition](#ucb-intuition)
		- [Help and Issue Tracking](#help-and-issue-tracking)

<!-- /TOC -->

## Part 1 - Data Preprocessing

## 1. The initial data

| Dataset   | Example set |
| --------- | ----------- |
| Country   | String      |
| Age       | Int         |
| Salary    | Int         |
| Purchased | Boolean     |

This dataset also has `independent vs dependent` variables, with the `dependent` variable being the Purchased data.

So using the first three variables, we will predict the fourth column.

### Importing the Libraries

**In Python**

| Libraries  | What for?                                      |
| ---------- | ---------------------------------------------- |
| matplotlib | Has a bunch of very useful and intuitive tools |
| numpy      | Help with math                                 |
| pandas     | Imports and manages data sets                  |

```python
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
```

**In R**

Here, we don't need to import any libraries since R Studio comes with a bunch of them!

### Importing the Dataset

Here, we will import the variables and create a matrix of observations.

**In Python**

Set the working directory to where we need to be.

```python
# given the pandas import
dataset = pd.read_csv('Data.csv')
# iloc[lines, columns] -> :-1 all columns except last
X = dataset.iloc[:, :-1].values
# if we print X, it will create a matrix of the data and give a datatype
y = dataset.iloc[:, 3].values
# printing y will give the last column values
```

**In R**

REMEMBER - R Arrays begin from 1

```r
#importing the dataset
dataset = read.csv('Data.csv');
```

### Missing Data

How can handle the problem when there is null data for where the is missing data?

One way to get around this is to take the mean of the columns.

For these dataset in `Age`, we will replace that data with the mean.

**In Python**

The library will will use is `sklearn`.

`sklearn` is SideKick learn and is an amazing library. We import Imputer to help with the preprocessing.

```python
from sklean.preprocessing import Imputer
# set NaN and we will see that the missing values are NaN
# strategy default is mean anyway but we'll be verbose
# axis = 0
imputer = Imputer(missing_values = 'NaN', strategy = 'mean', axis = 0)
# lowerbound included, upperbound is excluded
imputer = imputer.fit(X[:, 1:3])
# tranform method replaces the missing data
X[:, 1:3] = imputer.tranform(X[:, 1:3])
```

**In R**

```r
# ifelse is like a ternary
# is.na is to check if value is missing or not
dataset$Age = ifelse(is.na(dataset$Age),
						ave(dataset$Age, FUN = function(x) mean(x, na.rm = TRUE)),
						dataset$Age)

dataset$Salary = ifelse(is.na(dataset$Salary),
						ave(dataset$Salary, FUN = function(x) mean(x, na.rm = TRUE)),
						dataset$Salary)
```

### Catagorical Variables

What happens when we have strings instead of numbers for defining data? We must convert them to numbers. Example, we have country strings and a bool column in the data given.

```python
# encoding catagorical data
from sklearn.preprocessing import LabelEncoder
labelencoder_X = LabelEncoder()
# put in index for country column
X[:, 0] = labelencoder_X.fit_transform(X[:, 0])
```

However, the problem is that since the encodings are of int values, we could actually have the computer consider that the higher integer is of greater importance where it is not.

Instead, what we will do is essentially set up three columns that work like an `adjacency list`.

`1` where the country is correlated to the row, `0` otherwise.

```python
# encoding catagorical data
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
labelencoder_X = LabelEncoder()
# put in index for country column
X[:, 0] = labelencoder_X.fit_transform(X[:, 0])
onehotencoder = OneHotEncoder(catergorical_features = [0])
# ensure that X is transformed
X = onehotencoder.fit_transform(X).toarray()
```

However, we will need to understand which variable we know are which.

Let's look at the encoding for the `dependent` variable, where we only need the LabelEncoder.

```python
# ...
labelencoder_y = LabelEncoder()
y = labelencoder_y.fit_transform(y)
```

In the case of the boolean, we basically want to numbers to be encoded to 0 and 1.

**In R**

For R, we just need to factor the way we want to.

Since we have the factor function, the number encoding themselves don't need to be setup in the same way that it was for Python.

```r
# Encoding catergorical data
# remember c() is a Vector!
dataset$Country = factor(dataset$Country,
							levels = c('France', 'Spain', 'Germany'),
							labels = c(1,2,3))

dataset$Purchased = factor(dataset$Purchased,
							levels = c('No', 'Yes')
							labels = c(0, 1))
```

### Splitting the data into a Training Set and Test Set

With any model, we should split the data into the training set and the test set.

We need to build our models on the set and then test it on a new set against which we used certain data for that model.

The performance should not differ too much.

For this section, we use `from sklearn.model_selection import train_test_split` to do the training, testing and splitting.

`train_test_split(*arrays, test_size, train_size)`

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, train_size=0.8, random_state=0)

# use below if using python-shell in node
res = X_train.tolist()
send(res, 0)
res = X_test.tolist()
send(res, 0)
```

### Feature Scaling

With two variables, we can find the Euclidean Distance between point one and point two as `sqroot((x[1] - x[0])^2 + (y[1] - y[0])^2)`

However, with two very contrasting sizes of variables, the difference may be so ridiculous due to the square difference. Basically, the smaller, less dominant one may not exist.

```python
#
# FEATURE SCALING
#

from sklearn.preprocessing import StandardScaler

sc_X = StandardScaler()
X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)
```

How about the Dummy Variables? It won't break the Model if you don't scale it, but you might lose how we can intepret which country is which.

Even when no Euclidean distance is required, Feature scaling allows the execution to be much faster.

### Templating Data Preprocessing

```python
# Importing the libraries
import numpy as mp
import mapplotlib.pypot as plt
import pandas as pd

# Importing the dataset
dataset = pd.read_csv('Data.csv')
x = dataset.iloc[:, :-1].values
y = dataset.iloc[:, 3].values

# Taking care of missing data
# Not compulsary - only if data is missing
from sklearn.preprocessing import Imputer
imputer = Imputer(missing_values = 'NaN', strategy = 'mean', axis = 0)
imputer = Imputer.fit(X[: 1:3])
X[: 1:3] = imputer.transform(X[:, 1:3])

# Encoding categorical data
# Not compulsary - only if we need to convert the data
from sklearn.preprocessing import LabelEncoder, OneHotEncoder

# Encode Strings
# Think example of countries to [0|1] matrix
# Encoding the Independent Variable
labelencoder_X = LabelEncoder()
# put in index for country column
X[:, 0] = labelencoder_X.fit_transform(X[:, 0])
onehotencoder = OneHotEncoder(categorical_features = [0])
# ensure that X is transformed
# details here http://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OneHotEncoder.html
X = onehotencoder.fit_transform(X).toarray()
# Encoding the Dependent Variable
labelencoder_y = LabelEncoder()
y = labelencoder_y.fit_transform(y)

#
# SPLITTING THE SET INTO THE TRAINING AND TEST SET
#
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2)

#
# FEATURE SCALING
#

from sklearn.preprocessing import StandardScaler

sc_X = StandardScaler()
X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)
```

## 2. Regression

Regression models (both linear and non-linear) are used for predicting a real value, like salary for example. If your independent variable is time, then you are forecasting future values, otherwise your model is predicting present but unknown values. Regression technique vary from Linear Regression to SVR and Random Forests Regression.

In this part, you will understand and learn how to implement the following Machine Learning Regression models:

Simple Linear Regression
Multiple Linear Regression
Polynomial Regression
Support Vector for Regression (SVR)
Decision Tree Classification
Random Forest Classification

## 2.1: Simple Linear Regression

Looking at years of experience vs salary.

The issue - what is the correlation between `Years of experience` and `Salary`.

Ask the questions, what are the values that we get from this model? We could have a business go back to this model and apply it to help get an idea of salaries you are willing to give out.

### Intuition

Simple linear regression is basically `y = b[0] + b[1]*x[1]` (even y = mx + c)

```
# Example - How does salary change with years of experience?
y - dependent variable (DV) eg. (y = salary change)
x - independent variable(IV) eg. years of experience
b[1] - coefficient of IV (unit changes in x[1] how it affects y)
b[0] - constant
```

Regression - look at the hard facts.

The simple linear regression will basically be a best fit for the data.

In the case of `b[0]`, that will be the `y-intercept`. `b[1]` being the point at y.

On the `XY Graph` the datapoints will all end up being the independent variables. If we draw lines from these points to the model linear regression line, we can see where that person should be sitting. If `y[i]` is the data point, `y[hat][i]` is the point is modelled that is should be.

To get the best fitting line, we just `sum(y - y[hat])^2` to get the `min`.

### IN PYTHON

In this example, `YourExperience` is the independent value and `Salary` is the dependent value.

```python
# Importing the libraries
import sys, json
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

def send(arg, type):
	if type == 1:
		print json.dumps(json.loads(arg))
	elif type == 2:
		print arg
	else:
		print json.dumps(arg)

# Importing the dataset
dataset = pd.read_csv('data/Salary_Data.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, 1].values
send(X.tolist(), 0);
send(y.tolist(), 0);

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)
```

If we run the above, we may get an error from `sklearn.preprocessing` that is that 1d arrays need to be reshaped.

In simple linear regression, we also don't need to worry about `Feature Scaling`.

**Fitting Simple Linear Regression to the Training Set**

*   `fit` the `regressor`

```python
# Add to the above code
# Fitting simple ;inear Regression to the Training Set
from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(X_train, y_train)
send(str(regressor), 0);
```

Now that we have the `regressor`, we can start making basic predictions! With the Linear Regression object, we can now do this using the `predict` method.

```python
# Add to code above

# Prediciting the test set results
y_pred = regressor.predict(X_test)
# send(X_test.tolist(), 0) # see test set years for IV
# send(y_test.tolist(), 0) # check what the results were
# send(y_pred.tolist(), 0) # check the predictions
```

**Visualizing the Model**

This will be training set to train a line and now we can see how it goes against first - the training set, and then secondly, the test set!

Note the blue line being the prediction while the red dots are what give the actual plot points.

```python
# Visualizing the Training Set results
plt.scatter(X_train, y_train, color = 'red')
plt.plot(X_train, regressor.predict(X_train), color = 'blue')
plt.title('Salary vs Experience (Training Set)')
plt.xlabel('Years of Experience')
plt.ylabel('Salary')
plt.show()
# plt.savefig('plot.png')
```

As for checking the test set:

```python
# Visualizing the Test Set results
plt.scatter(X_test, y_test, color = 'red')
# We do not change this since the regressor is already trained
# with the training set
plt.plot(X_train, regressor.predict(X_train), color = 'blue')
plt.title('Salary vs Experience (Test Set)')
plt.xlabel('Years of Experience')
plt.ylabel('Salary')
plt.show()
# plt.savegit('plot.png')
```

## 2.2 Multiple Linear Regression

The challenge: you have 50 companies that all have extracts from `Profit` and the independent variables that it depends on `R&D Spend`, `Administration`, `Markerting Spend`.

### Intuition

Multiple where there are multiple IVs of causation.

```
# Simple Linear Regression
y = b[0] + b[1]*x[1]

# Multiple Linear Regression
y = b[0] + b[1]*x[1] + b[2]*x[2] + ... + b[n]*x[n]

# Multiple Linear Regression after replacing categorical data
y = b[0] + b[1]*x[1] + b[2]*x[2] + ... + b[n]*x[n] + b[n+1]*D[1] + ... + b[n+m]*D[m]
```

**The Assumptions of Linear Regression**

1.  Linearity
2.  Homoscedasticity
3.  Multivariate normality
4.  Independence of errors
5.  Lack of mulicollinearity

**Dummy Variables**

With the data that has categorical data, we actually use the `LabelEncoder` and `OneHotEncoder` to allow the expansion of the column into the total different values of of `state` and make a binary matrix for those columns and rows.

**Note:** There is a dummy variable trap we will talk about later.

We can also think this to be biased, however by default we will have the correct coefficient for the category that will help alter the state to be for the correct category.

You cannot have the default b[0] + all dummy varibles. You should always omit one dummy varible.

### How to build MLR models (step-by-step)

Back with one IV and one DV, life was great, but now that we have many columns we need to decide what we can use as useful predictors.

**Why throw out columns and use everything?**

1.  Garbage in -> Garbage out. If you throw everything in, you may also add in garbage.
2.  Shows an understanding of variables

**5 Methods of Building Models**

1.  All-in
2.  Backward Elimination
3.  Forward Selection
4.  Bidirectional Elimination
5.  Score Comparison

`2, 3 and 4` are sometimes referred to as `Stepwise Regression` or sometimes just `4`.

**All in**

Throw in `everything`. When to do it?

*   You have prior knowledge that these are the true predictors
*   You have to: maybe a framework where you have to use them
*   Preparing for `Backward Elimination` type of regression

**Backward Elimination**

1.  Select a significance level to stay in the model (eg SL = 0.05)
2.  Fit the full model with all possible predictors
3.  Consider the predictor with the `highest P-value` - if `P > SL`, go to step 4, else fin
4.  Remove the predictor
5.  Fit model without this variable\*, rebuild the entire model with the other vars
6.  Return to step 3 with the new model
    FIN. When `P > SL`, you come here and the model is ready

**Forward Elimination**

1.  Select a significance level to stay in the model (eg SL = 0.05)
2.  Fit all simple regression models `y ~ x[n]` - select the one with the lower P-value
3.  Keep this variable and fit all possible models with one extra predictor added to the one(s) you already have
4.  Consider the predictor with the `lowest P-value`. `If P < SL`, go to Step 3, otherwise go to `FIN`
    FIN. Keep the previous model

**Bidirectional Elimination**

1.  Select a significance level to enter and one to stay in the model (eg SLENTER, SLSTAY = 0.05)
2.  Perform the next step of `Forward Selection` (new variables must have: `P < SLENTER` to enter)
3.  Perform ALL steps of Backward Elimination (old variables must have `P < SLSTAY` to stay) - very iterative process
4.  No new variables can enter and no old variables can exit, go to FIN
    FIN. Model is ready

**All Possible Models**

Most thorough approach, but also the most consuming.

1.  Select a criterion of goodness of fit (eg. Akaike criterion)
2.  Construct All Possible Regression Models: `(2^N) - 1` total combinations
3.  Select the one with the best criterion
    FIN. Your model is ready

If you have 10 columns in your data, that means 1023 models (ridiculous)

### IN PYTHON

```python
# Data Preprocessing Template

# Importing the libraries
import sys, json
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# send() for Node.js Python Shell lib
def send(arg, type):
	if type == 1:
		print json.dumps(json.loads(arg))
	elif type == 2:
		print arg
	else:
		print json.dumps(arg)

# Importing the dataset
dataset = pd.read_csv('data/50_Startups.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, 4].values
# send(X.tolist(), 0);
# send(y.tolist(), 0);

# # Taking care of missing data
# from sklearn.preprocessing import Imputer
# imputer = Imputer(missing_values = 'NaN', strategy = 'mean', axis = 0)
# imputer = imputer.fit(X[:, 1:3])
# X[:, 1:3] = imputer.transform(X[:, 1:3])

# Encoding categorical data
# Encoding the Independent Variable
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
labelencoder_X = LabelEncoder()
X[:, 3] = labelencoder_X.fit_transform(X[:, 3])
onehotencoder = OneHotEncoder(categorical_features = [3])
X = onehotencoder.fit_transform(X).toarray()
send(X.tolist(), 0);

# Avoiding the Dummy Variable Trap
# Lib in this case takes care of it
# for us in this case
# X = X[:, 1:]
# send(X.tolist(), 0);

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)
```

**Library for Multiple Linear Regression**

Add this following to the above

```python
# Fitting simple ;inear Regression to the Training Set
from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(X_train, y_train)

# Prediciting the test set results
y_pred = regressor.predict(X_test)
```

### Backward Elimination - Multiple Linear Regression

To get it ready, you need to import the required library. Add the follwoing to the previous code.

The library that we use doesn't take into account the `x[0]` constant = 1, so we will need to add this. Most other libraries normally will include this.

```python
# Backward Elimination Preparation
import statsmodels.formula.api as sm
# Add in column for X[0]
X = np.append(arr = np.ones((50, 1)).astype(int), values = X, axis=1)
send(X.tolist(), 0)
```

Now that we are ready to start Backward Elimination, we can go ahead and begin with this...

The following table shows us some useful information about the multiple linear regression model - the `R-squared`, the `Adjusted R-squared`, `P` values and more.

The lower the `P` value in this case, the more important.

```python
# Backward Elimination Preparation
import statsmodels.formula.api as sm
# Add in column for X[0]
X = np.append(arr = np.ones((50, 1)).astype(int), values = X, axis=1)
X_opt = X[:, [0,1,2,3,4,5]]

# Stay if < SL
SL = 0.05

# Create a new regressor
regressorOLS = sm.OLS(endog=y, exog=X_opt).fit()
send(str(regressorOLS.summary()), 0)
```

In the case of the first run through, get rid of the variable with the highest `P` value. We need to continue this until we are under the `0.05` SL value.

```python
# Because of how everything went, we iterate through the BE algorithm iteratively
# For now, we are not focused on improving the model

# Create a new regressor and run iteration
X_opt = X[:, [0,1,2,3,4,5]]
regressorOLS = sm.OLS(endog=y, exog=X_opt).fit()
send(str(regressorOLS.summary()), 0)

# Create a new regressor and run iteration
X_opt = X[:, [0,1,3,4,5]]
regressorOLS = sm.OLS(endog=y, exog=X_opt).fit()
send(str(regressorOLS.summary()), 0)

# Create a new regressor and run iteration
X_opt = X[:, [0,3,4,5]]
regressorOLS = sm.OLS(endog=y, exog=X_opt).fit()
send(str(regressorOLS.summary()), 0)

# Create a new regressor and run iteration
X_opt = X[:, [0,3,5]]
regressorOLS = sm.OLS(endog=y, exog=X_opt).fit()
send(str(regressorOLS.summary()), 0)

# Create a new regressor and run iteration
X_opt = X[:, [0,3]]
regressorOLS = sm.OLS(endog=y, exog=X_opt).fit()
send(str(regressorOLS.summary()), 0)
```

## 2.3 Polynomial Linear Regression

```
# Simple Linear Regression
y = b[0] + b[1]*x[1]

# Multiple Linear Regression
y = b[0] + b[1]*x[1] + b[2]*x[2] + ... + b[n]*x[n]

# Multiple Linear Regression after replacing categorical data
y = b[0] + b[1]*x[1] + b[2]*x[2] + ... + b[n]*x[n] + b[n+1]*D[1] + ... + b[n+m]*D[m]

# Polynomial Linear Regression
y = b[0] + b[1]*x[1] + b[2]*x[1]^2 + ... + b[n]*x[1]^n
```

### Interpretation

Depending on the power, we begin to have a parabolic shape - think of how it all graphs and the amount of min/max for each power.

Use cases could be things such as understanding how epidemics have spread etc.

**Why is it still called Linear?**

The trick here is that we're not talking about the X variables. When talking about the class of the regression, we're talking about the coefficients.

These models aren't necessarily more advanced than the other linear regression models that we have looked at so far.

In this model, we will basically only require 1 independent variable `level` and the `salaries` column will becoome the DV y.

**Note:** always ensure that X is a vector of matrices and that y is a vector.

We also won't need to split the data into a training and test set simply because we don't have enough data to train one and test the performance of the other. We also want to make an accurate prediction, and not miss the target.

```python
# Importing the libraries
import sys, json
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# send() for Node.js Python Shell lib
def send(arg, type):
	if type == 1:
		print json.dumps(json.loads(arg))
	elif type == 2:
		print arg
	else:
		print json.dumps(arg)

# Importing the dataset
dataset = pd.read_csv('data/Position_Salaries.csv')
X = dataset.iloc[:, 1:2].values
y = dataset.iloc[:, 2].values
send(X.tolist(), 0);
send(y.tolist(), 0);

# Fitting simple Linear Regression to the Training Set
# Feature Scaling not required with the following library
from sklearn.linear_model import LinearRegression
lin_reg = LinearRegression()
lin_reg.fit(X, y)

# Fitting Polynomial Regression to the dataset
# This is transform the original features to have
# associated polynomial terms
from sklearn.preprocessing import PolynomialFeatures
poly_reg = PolynomialFeatures(degree=2)
X_poly=poly_reg.fit_transform(X)

# Fit the poly to another lin reg
# to have eg. two independent vars
# etc - using the Poly
lin_reg2 = LinearRegression()
lin_reg2.fit(X_poly, y)

# Visualising the Linear Regression results
plt.scatter(X, y, color = 'red')
plt.plot(X, lin_reg.predict(X), color = 'blue')
plt.title('Truth or Bluff for salary for job (LR)')
plt.xlabel('Position Level')
plt.ylabel('Salary')
plt.savefig('SalaryLR.png')
plt.close()
```

In order to plot and predict polynomial regressions, we need to use the `fit_transform` method within the `LinearRegression.predict()` method.

```python
# Data Preprocessing Template

# Importing the libraries
import sys, json
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# send() for Node.js Python Shell lib
def send(arg, type):
	if type == 1:
		print json.dumps(json.loads(arg))
	elif type == 2:
		print arg
	else:
		print json.dumps(arg)

# Importing the dataset
dataset = pd.read_csv('data/Position_Salaries.csv')
X = dataset.iloc[:, 1:2].values
y = dataset.iloc[:, 2].values
send(X.tolist(), 0);
send(y.tolist(), 0);

# Fitting simple Linear Regression to the Training Set
# Feature Scaling not required with the following library
from sklearn.linear_model import LinearRegression
lin_reg = LinearRegression()
lin_reg.fit(X, y)

# Fitting Polynomial Regression to the dataset
# This is transform the original features to have
# associated polynomial terms
from sklearn.preprocessing import PolynomialFeatures
poly_reg = PolynomialFeatures(degree=4)
X_poly=poly_reg.fit_transform(X)
poly_reg.fit(X_poly, y)

# Fit the poly to another lin reg
# to have eg. two independent vars
# etc - using the Poly
lin_reg2 = LinearRegression()
lin_reg2.fit(X_poly, y)

# Visualising the Linear Regression results
plt.scatter(X, y, color = 'red')
plt.plot(X, lin_reg.predict(X), color = 'blue')
plt.title('Truth or Bluff for salary for job (LR)')
plt.xlabel('Position Level')
plt.ylabel('Salary')
plt.savefig('SalaryLR.png')
plt.close()

# Visualising the Poly Regression results
# For higher res
X_grid = np.arange(min(X), max(X), 0.1)

plt.scatter(X, y, color = 'red')
plt.plot(X_grid, lin_reg2.predict(poly_reg.fit_transform(X_grid)), color = 'green')
plt.title('Truth or Bluff for salary for job (PR)')
plt.xlabel('Position Level')
plt.ylabel('Salary')
plt.savefig('SalaryPR-x.png')
plt.close()

prediction = lin_reg2.predict(X_poly)
send(prediction.tolist(), 0)

# Prediciting a new result with the Linear Regression model
y_pred = lin_reg.predict(6.5)
# This will be an awful result
send(y_pred.tolist(), 0)

# Prediciting a new result with the Polynomial Regression model
y_pred_poly = lin_reg2.predict(poly_reg.fit_transform(6.5))
# This will be a great result!
send(y_pred_poly.tolist(), 0)
```

## 2.4 Support Vector Regression

Very similar to Polynomial Linear Regression in regards to code, but we use Feature Scaling and the SVR class for the regressor. The kernel refers to the type of fit eg poly, rbf etc.

```python
# Data Preprocessing Template

# Importing the libraries
import sys, json
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# send() for Node.js Python Shell lib
def send(arg, type = 0):
	if type == 1:
		print json.dumps(json.loads(arg))
	elif type == 2:
		print arg
	else:
		print json.dumps(arg)

# Importing the dataset
dataset = pd.read_csv('data/Position_Salaries.csv')
X = dataset.iloc[:, 1:2].values
y = dataset.iloc[:, 2].values

# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()
sc_y = StandardScaler()
X = sc_X.fit_transform(X)
y = sc_y.fit_transform(y)

# Create the SVR regressor
# SVR doesn't auto Feature Scale
from sklearn.svm import SVR
# kernel for linear, poly, rbf etc
regressor = SVR(kernel='rbf')
regressor.fit(X, y)

# Prediciting the test set results
y_pred = regressor.predict(6.5)
# We have to do this because of feature scaling
y_pred = sc_y.inverse_transform(y_pred)
send(y_pred.tolist())

# Visualising the SVR results
plt.scatter(X, y, color = 'red')
plt.plot(X, regressor.predict(X), color = 'blue')
plt.title('Truth or Bluff (SVR)')
plt.xlabel('Position level')
plt.ylabel('Salary')
plt.show()
# plt.savefig('svr.png')
# plt.show()
# plt.close()
```

## 3. Classification

### 3.1 Logistical Regression

The code can be found in `~/Learning/ML-Course/ml-a-z-course/part-3-classification/1-logistical-regression/`.

First, start by adding in the Python Preprocessing template (search SnippetsLab).

In this first example, we are going to see if we can predict the purchase of an SUV given the `Age` and `EstimatedSalary`. 

Since we are using columns `2,3` and we are attempting to predict `4`, update the import of the dataset to look like the following:

```python
# Importing the dataset
dataset = pd.read_csv('Social_Network_Ads.csv')
X = dataset.iloc[:, [2,3]].values
y = dataset.iloc[:, 4].values
```

Since there are 400 observations, let's use 300 for the training set and the rest for the test set.

```python
# Splitting the dataset into the Training set and Test set
from sklearn.cross_validation import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)
```

Because we want an accurate prediction of whether or not a user is going buy an SUV, we WANT feature scaling. Just uncommenting this will be enough to include feature scaling.

For an intuitive example of the "why" behind feature scaling, checkout [Stack Overflow](https://stackoverflow.com/questions/26225344/why-feature-scaling).

```python
# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()
X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)
```

#### Fitting LR to the training set

We import the `LogisticRegression` class from `sklearn.linear_model` to and use the constructor to build the object that we will fit and use for predictions.

```python
# Fitting Logistic Regression to the Training Set
from sklearn.linear_model import LogisticRegression
classifier = LogisticRegression(random_state=0)
classifier.fit(X_train, y_train)  # teach the correlations
```

#### Making the prediction

Here, we can just need use our `X_test` variable with the methond `predict`.

```python
# Predicting the results
y_pred = classifier.predict(X_test)
print(y_pred)
```

#### Investigating the confusion matrix

A confusion matrix is a specific table layout that allows visualization of the performance of an algorithm. [See more here](https://www.wikiwand.com/en/Confusion_matrix).

Import the `function` (not a class) from `sklearn.metrics`.

```python
# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)
print(cm)

# prints [[65  3]
#         [ 8 24]]
```

Note: From the above, 65 and 24 are the _correct_ predictions, and 3 and 8 are the _incorrect_ predictions.

#### Visualising the results

The best way to check the results are to use a graph!

To intepret the graph, you will have a split of red and green points. All the points themselves represent each of our data points on a X/Y graph of the to IVs on the axis. The colour of the point itself references whether the predictions were to buy or not buy with the background colour representing the "prediction regions".

What is the goal for this? Since we want to classify the right users and put them into the right category, we can help use that to help target a particular demographic. 

The line inbetween the regions is called a prediction boundary. What is it a straight line? That is because we are using a _linear_ logistic classifier.

The last part that is important, is that the graph is a representation of the _training_ set.

```python
# Visualizing the Training set results
from matplotlib.colors import ListedColormap
X_set, y_set = X_train, y_train

# 0.01 pixel resolution and apply classifier on it
# min - 1 and max + 1 for range
X1, X2 = np.meshgrid(np.arange(start=X_set[:, 0].min() - 1, stop=X_set[:, 0].max() + 1, step=0.01),
                     np.arange(start=X_set[:, 1].min() - 1, stop=X_set[:, 1].max() + 1, step=0.01))

# create the plt contour split
plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(X1.shape),
             alpha=0.75, cmap=ListedColormap(('red', 'green')))
# set x and y limits
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())

# for each element in set, create a scatter element
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                c=ListedColormap(('red', 'green'))(i), label=j)
plt.title('Logistic Regression (Training set)')
plt.xlabel('Age')
plt.ylabel('Estimated Salary')
plt.legend()
plt.show()

# Visualizing the Test set results
from matplotlib.colors import ListedColormap
X_set, y_set = X_test, y_test
X1, X2 = np.meshgrid(np.arange(start=X_set[:, 0].min() - 1, stop=X_set[:, 0].max() + 1, step=0.01),
                     np.arange(start=X_set[:, 1].min() - 1, stop=X_set[:, 1].max() + 1, step=0.01))

plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(X1.shape),
             alpha=0.75, cmap=ListedColormap(('red', 'green')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                c=ListedColormap(('red', 'green'))(i), label=j)
plt.title('Logistic Regression (Test set)')
plt.xlabel('Age')
plt.ylabel('Estimated Salary')
plt.legend()
plt.show()
```

## 3.2 K-Nearest Neighbours Algorith

### Intuition

What K-NN does for you: help define if a new data point added should fall into the red category or into the green category.

How does it work?

1. K-NN works by choosing the number K of nearest neighbours. One of the most common default values is 5. 
2. These neighbours are chosen with Euclidean distance.
3. Among the K neighbours, count the number of data points in each category.
4. Assign new data point to category based on most neighbours.

It is a very simple model.

### K-NN in Python

Using our classification template, we can just add the necessary lines to import to classifier and use the `fit` method.

```python
# Fitting classifier to the Training set
from sklearn.neighbors import KNeighborsClassifier
classifier = KNeighborsClassifier(n_neighbors=5, metric='minkowski', p=2)
classifier.fit(X_train, y_train)
```

The confusion matrix for this data using the K-NN method has some more success than the linear classifier!

```python
[[64  4]
 [ 3 29]]
```

#### Final Code

```python
# Classification template

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
dataset = pd.read_csv('Social_Network_Ads.csv')
X = dataset.iloc[:, [2, 3]].values
y = dataset.iloc[:, 4].values

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=0)

# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

# Fitting classifier to the Training set
from sklearn.neighbors import KNeighborsClassifier
classifier = KNeighborsClassifier(n_neighbors=5, metric='minkowski', p=2)
classifier.fit(X_train, y_train)

# Predicting the Test set results
y_pred = classifier.predict(X_test)

# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)
print(cm)

# Visualising the Training set results
from matplotlib.colors import ListedColormap
X_set, y_set = X_train, y_train
X1, X2 = np.meshgrid(np.arange(start=X_set[:, 0].min() - 1, stop=X_set[:, 0].max() + 1, step=0.01),
                     np.arange(start=X_set[:, 1].min() - 1, stop=X_set[:, 1].max() + 1, step=0.01))
plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(X1.shape),
             alpha=0.75, cmap=ListedColormap(('red', 'green')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                c=ListedColormap(('red', 'green'))(i), label=j)
plt.title('K-NN Classifier (Training set)')
plt.xlabel('Age')
plt.ylabel('Estimated Salary')
plt.legend()
plt.show()

# Visualising the Test set results
from matplotlib.colors import ListedColormap
X_set, y_set = X_test, y_test
X1, X2 = np.meshgrid(np.arange(start=X_set[:, 0].min() - 1, stop=X_set[:, 0].max() + 1, step=0.01),
                     np.arange(start=X_set[:, 1].min() - 1, stop=X_set[:, 1].max() + 1, step=0.01))
plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(X1.shape),
             alpha=0.75, cmap=ListedColormap(('red', 'green')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                c=ListedColormap(('red', 'green'))(i), label=j)
plt.title('K-NN Classifier (Test set)')
plt.xlabel('Age')
plt.ylabel('Estimated Salary')
plt.legend()
plt.show()
```

## 3.3 Support Vector Machine (SVM)

### SVM Intuition

SVM searches for the `maximum margin` which is the line that separates the two classes of points with the largest distance between them. The two points are called the `support vectors` - they are the only two points that contribute to the results of the algorithm. 

The line in the middle is called the `maximum margin hyperplane/classifier`.

So why SVM? As opposed to most machine learning algorithms that will try to use the most common elements of a set of information, SVM will try to find the extreme elements close to being classified as the other at the boundary. This in itself makes SVMs both special and very different. At times, this means that they could work a lot better because of this ignorance of other data points.

### SVM in Python

Again, the important part is importing the classifier, creating the instance and running the `fit` method:

```python
# Fitting SVM to the Training set
from sklearn.svm import SVC
# specify "linear" since that is what we want
classifier = SVC(kernel='linear', random_state=0)
classifier.fit(X_train, y_train)
```

In this case, the CM comes as the following:

```python
[[66  2]
 [ 8 24]]
```

In the case of the model, the SVM actually turns out pretty good for this training set!

## 3.4 Kernel SVM

### Kernel SVM Intuition

Think about a situation with not linearly seperable data (ie data in circles etc). This is not possible to set a useful boundary with SVM.

#### Mapping to a higher dimension

We map the data to a higher dimension in order to then use linear separation. 

After we add the linear separator to this higher dimension, we use projection to again bring it back down a dimension and we will have our non-linear separator.

Warning: this could require a whole bunch of compute power.

#### The Kernel trick

It uses some intense looking math function with Euler's number. This function calculated is the _Gaussian RBF Kernel_ and worth noting to revisit down the track. To visualise, think of a 3d plane and what the calculated number relates to. The point calculated comes from the central point on the XY plane. A reference to the image [comes from here](https://www.cs.toronto.edu/~duvenaud/cookbook/index.html).

The landmark for the kernel itself is abstracted from the intuition, but it is calculated for us.

Sigma's role in this whole process is defining the circumference of how wide the definition for landmark 0 becomes.

You can also take multiple kernel functions and add them if required. 

Classifications are generally assigned based on the kernel value being = 0 or > 0.

#### Types of Kernal Functions

To see some of these in 3d, head to [this website](https://mlkernels.readthedocs.io/en/latest/kernels.html)

- Gaussian RBG Kernel
- Sigmoid Kernel
- Polynomial Kernel

### Kernel SVM Example

Classification code:

```python
# Fitting classifier to the Training set
from sklearn.svm import SVC
# Set rbf for Gaussian RBF
classifier = SVC(kernel='rbf', random_state=0)
classifier.fit(X_train, y_train)
```

Confusion matrix:

```python
[[64  4]
 [ 3 29]]
```

## 3.5 Naive Bayes

### Bayes Theorem

This is more a prefix to using _Naive Bayes_.

To picture how this works, think of a spanner. There are two machines that both produce spanners, each spanner marked by which machine created it. What we want to find out is that if we go through and throw out the "defects", what is the probability that machine two will have a defect.

```bash
Mach 1: 30 wrenches/hr
Mach 2: 20 wrenches/hr

> Out of all defective parts, 1% are defective
> Out of all defective, 50% from mach1, 50% from mach2
> Question: What is the probability that a part produced by mach2 is defective?

Given that we know the totals
> Probability(Mach1) = 30/50 = 0.6
> P(Mach2) = 20/50 = 0.4

And for defects
# Prob of part being defective
> P(Defect) = 1%
# Prob of defect picking up from defect pile
> P(Mach1 | Defect) = 50%
> P(Mach2 | Defect) = 50%
# Therefore
> P(Defective | Mach2) = (P(Mach2 | Defect) * P(Defect)) / P(Mach 2)
= 0.0125
```

### Naive Bayes Intuition

Given our graph with two (can be more!) labeled categories (Walks and Drives) and axes labeled `Salary` and `Age`.

Armed with the knowledge of `Bayes Theorem` and the previous datapoints, what is the likelyhook with some person with these features walking?

```bash
> Posterior Probability = (Likelihood * Prior Probability) / Marginal Likelihood
> P(Walks|X) = (P(X|Walks) * P(Walks)) / P(X)
> P(Drives|X) = (P(X|Drives) * P(Drives)) / P(X)

# After calculating
> P(Walks|X) vs P(Drives|X)
```

### Naive Bayes Example

Classifier code:

```python
# Fitting Naive Bayes to the Training set
# Create your Naive Bayes here
from sklearn.naive_bayes import GaussianNB
classifier = GaussianNB()
classifier.fit(X_train, y_train)
```

Confusion matrix:

```python
[[65  3]
 [ 7 25]]
```

With Naive Bayes, you'll have a nice curve without irregularities. 

## 3.6 Decision Trees Classification

### Decision Tree Intuition

CART = Classification and Regression Trees. This is an umbrella terms for:

1. Classification trees ie red/green apples
2. Regression trees ie temperature outside, cost for things etc

For the intuition behind it, the graph looks as if the graph is based on _splits_ which are based on maximising the number of a certain category. That's a simple explanation, although there is some complex mathematics behind how it is working.

During the initial split, we begin making a decision tree. Ie first split a 60, is `X2 < 60`, then second might be `X1 < 50` for split two on a particular branch. The final leaves on the branch are called the _terminal leaves_ and these leaves are the final classification.

Decision trees are also old. They've started to die off since more sophisticated methods have come to replace them. Recently, they were "reborn" with additional methods like `random forest`, `gradient boosting` etc that have brought it back into the game. While not very powerful on their own, they are leveraged on for other methods.

### Decision Tree Classification example

Classification code:

```python
# Fitting decision tree to the Training set
from sklearn.tree import DecisionTreeClassifier
# To be as homogeneous as possible, we want to use entropy as we are looking to reduce this
# information gain is what we want to improve after the split
classifier = DecisionTreeClassifier(criterion='entropy', random_state=0)
classifier.fit(X_train, y_train)
```

As for the confusion matrix:

```python
[[62  6]
 [ 3 29]]
```

Checking the visualisation of the output is pretty intuitive if you understand the idea of the decision trees and splitting used.

## 3.7 Random Forest Classification

### Random Forest Intuition

_Ensemble Learning_ is when you take multiple ML algorithms to come out with a final one. The _random forest_ method using a number of _random forest_ algorithms.

Steps:

1. Pick at random K data points from Training set.
2. Build `Decision Tree` associated at these K data points.
3. Choose the number `Ntree` of trees you want to build and repeat steps 1 and 2.
4. For a new data point, make each one of your Ntree trees predict the category to which the data point belongs and assign the new data point to the category that wins the majority vote.

With the "power of the crowd", it helps this classification become quite useful to get rid of particular uncertainties. It was used for things such as "Konnect" for Xbox.

### Random Forest Classification Example

Classification code:

```python
# Fitting Random Forest to the Training set
# Create your Random Forest here
from sklearn.ensemble import RandomForestClassifier
classifier = RandomForestClassifier(
    n_estimators=10, criterion='entropy', random_state=0)
classifier.fit(X_train, y_train)
```

Confusion Matrix:

```python
[[63  5]
 [ 4 28]]
```

Be careful - we want to _prevent overfitting_. Remember: Overfitting is an issue within machine learning and statistics. It occurs when we build models that closely explain a training data set, but fail to generalize when applied to other data sets.

## 3.8 Evaluating Classification Model Performance

### False Positives and False Negatives

Given a set of results, we wanted to take what we already know and use that projected data to build out a prediction model.

Example - We started by taking an four random independent variable values, and for anything below a particular value (0.5) we projected to the floor, and the ceiling for any above. Given actual dependent variable data, we project what we know onto the model and seeing what the predicted equilvent would be.

We can get True Positive, False Positive, False Negative and True Negative. In both cases, we want the `True` values!

### Confusion matrix

The y axis is the `Actual DV`, and the x axis is the `Predicted DV`

```markdown
| TP  | FP  |
| --- | --- |
| FN  | TN  |

> accuracy rate = correct / total
> error rate = wrong / total
```

### Accuracy Paradox

If we predicted that nothing would ever equal 0, the confusion matrix could possibly go up even though we just completely stopped using the model. Be wary about this paradox.

### Cumulative Accuracy Profile (CAP)

Image a horizontal axis `Total Contacted` up to 100000, and vertical axis `Purchased` up to 10000.

Can we get more customers to purchase for less contacted customers? How can we pick and choose customers to contact? The area underneath the model increase is better and is known as the CAP.

The ideal line would be having 10% of customer who purchased, all were 100%. Ideal, but unlikely.

### CAP Curve Analysis

Now that we know how it can work, how can analyse the CAP?

The standard approach to calculate the efficiency is this:

```bash
AR = a[r]/a[p] = area under model to random / area under perfect model to random
```

The second approach is to look at the 50% line, then where this intersects the model line, check the intersection to the vertical axis and take this number to use for assessing.

Generally, the numbers go like so:

| X              | Value              |
| -------------- | ------------------ |
| X < 60%        | Rubbish            |
| 60% < X < 70%  | Poor               |
| 70% < X < 80%  | Good               |
| 80% < X < 90%  | Very Good          |
| 90% < X < 100% | Too Good (be wary) |

Be careful if it goes over 90%. You could also be overfitting and the anomolies down the track might not relate to the trained model.

## Classification Summary

### How do I know which model to choose for my problem?

Same as for regression models, you first need to figure out whether your problem is linear or non linear. You will learn how to do that in Part 10 - Model Selection. Then:

If your problem is linear, you should go for Logistic Regression or SVM.

If your problem is non linear, you should go for K-NN, Naive Bayes, Decision Tree or Random Forest.

Then which one should you choose in each case ? You will learn that in Part 10 - Model Selection with k-Fold Cross Validation.

Then from a business point of view, you would rather use:

- Logistic Regression or Naive Bayes when you want to rank your predictions by their probability. For example if you want to rank your customers from the highest probability that they buy a certain product, to the lowest probability. Eventually that allows you to target your marketing campaigns. And of course for this type of business problem, you should use Logistic Regression if your problem is linear, and Naive Bayes if your problem is non linear.

- SVM when you want to predict to which segment your customers belong to. Segments can be any kind of segments, for example some market segments you identified earlier with clustering.

- Decision Tree when you want to have clear interpretation of your model results,

- Random Forest when you are just looking for high performance with less need for interpretation. 

### How can I improve each of these models?

In Part 10 - Model Selection, you will find the second section dedicated to Parameter Tuning, that will allow you to improve the performance of your models, by tuning them. You probably already noticed that each model is composed of two types of parameters:

the parameters that are learnt, for example the coefficients in Linear Regression,
the hyperparameters.
The hyperparameters are the parameters that are not learnt and that are fixed values inside the model equations. For example, the regularization parameter lambda or the penalty parameter C are hyperparameters. So far we used the default value of these hyperparameters, and we haven't searched for their optimal value so that your model reaches even higher performance. Finding their optimal value is exactly what Parameter Tuning is about. So for those of you already interested in improving your model performance and doing some parameter tuning, feel free to jump directly to Part 10 - Model Selection.

## 4. Clustering

## 4.1 K-Means Clustering

### K-Means Clustering Intuition

Think of a scatter plot. K-Means is used to help create _clusters_ of groups. You can have as many IV as required.

Steps:

1. Choose number of clusters K
2. Select at random K points, the centroids (not necessarily from your dataset)
3. Assign each data point to the closest centroid -> this forms K clusters
4. Compute and place the new centroid of each cluster
5. Reassign each data point to the new closest centroid. If any reassignment took place, go back to step 4.

It is basically just an iterative process that you continue until the end centroids converg eto a place that data points are never reassigned.

### K-Means Random Initialization Trap

Think of three easily determined clusters. The question is, if we have a bad randomly initiasation points for the centroids, can we run into an issue with final clusters computed? Yes. This is the initialization trap. 

How can we combat this? It is not so straight forward. The solution is a K-Means++ algorithm. It is quite an involved approach.

### Choosing the right number of clusters

What is the metric to evaluate how a certain number of clusters performs? It's called the _Within Cluster Sum of Squares_ (WCSS).

This is a sum of each point in cluster i where you sum the distance of point i to centroid and then square it. From this, you sum the total for each cluster applying this function.

How do we find the optimal goodness of fit as it keeps improving with more clusters given that it keeps improving? We look at the drop off after incrementing the number of clustesrs. We use the _elbow method_ to see where the drop off goes from dramatic to small. That is a judgement call that you need to make as a data scientist.

### K-Means Clustering Example

```python
# K-Means++ Template

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
dataset = pd.read_csv('Mall_Customers.csv')
X = dataset.iloc[:, [3, 4]].values

# Using the elbow method to find optimal number of clusters
from sklearn.cluster import KMeans
"""
wcss = []
for i in range(1, 11):
    kmeans = KMeans(n_clusters=i, init='k-means++',
                    max_iter=300, n_init=10, random_state=0)
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)
plt.plot(range(1, 11), wcss)
plt.title('The Elbow Method')
plt.xlabel('Number of clusters')
plt.ylabel('WCSS')
# plt.show()
"""

# Applying k-means to the mall dataset
kmeans = KMeans(n_clusters=5, init='k-means++',
                max_iter=300, n_init=10, random_state=0)
y_kmeans = kmeans.fit_predict(X)

# Visualising the cluster
# y_kmeans == 0 is cluster 1
# 0, 1 for second arg are x,y
plt.scatter(X[y_kmeans == 0, 0], X[y_kmeans == 0, 1],
            s=100, c='red', label='Cluster 1 - Careful')
plt.scatter(X[y_kmeans == 1, 0], X[y_kmeans == 1, 1],
            s=100, c='blue', label='Cluster 2 - Standard')
plt.scatter(X[y_kmeans == 2, 0], X[y_kmeans == 2, 1],
            s=100, c='green', label='Cluster 3 - Target')
plt.scatter(X[y_kmeans == 3, 0], X[y_kmeans == 3, 1],
            s=100, c='cyan', label='Cluster 4 - Careless')
plt.scatter(X[y_kmeans == 4, 0], X[y_kmeans == 4, 1],
            s=100, c='magenta', label='Cluster 5 - Sensible')
# Plotting the centroids
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1],
            s=300, c='yellow', label='Centroids')
plt.xlabel('Annual income (k$)')
plt.ylabel('Spending Score (1-100')
plt.legend()
plt.show()
```

## 4.2 Hierarchichal Clustering

### HC Intuition

As for intuition, the before and after HC can end up with similar results to K-Means Clustering.

There are two ways to do this: 

1. Agglomerative
2. Divisive 

#### Agglomerative HC

1. Make each data point a single-point cluster that forms N clusters
2. Take two closest data points and make them one cluster -> N - 1 clusters
3. Take the _two clusters_ and make them one -> N - 2 clusters
4. Repeat step three until there is only one cluster left

#### Calculating distance between clusters

This is a crucial part. Distance between two clusters can be measured as:

1. Closest points
2. Furthest points
3. Average distances
4. Distance between centroids

### How dendrograms work

Dendrograms have all points on the X axis and on the Y axis will have the Euclidean distances. You repeat the process based on the cluster size and the point to connect to.

### HC Using Dendrograms

After setting a Euclidean distance threshold, we always want the similarity to be lower than the threshold to define the clusters.

If you have a dendrogram and reduce the threshold, the number of clusters will be equal to how many vertical lines the threshold goes through.

To decide the distance, generally you will look for when the clustering arm becomes longest.

### HC Example

#### Determining optimum clusters

Plot the dendrogram, then look at it to decide how many clusters there should be by identifiying the longest arm.

```python
# Using the dendrogram to find optimal number of clusters
import scipy.cluster.hierarchy as sch
dendrogram = sch.dendrogram(sch.linkage(X, method='ward'))
plt.title('Dendrogram')
plt.xlabel('Customers')
plt.ylabel('Euclidean distances')
plt.show()
```

### HC Full example

```python
# K-Means++ Template

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
dataset = pd.read_csv('Mall_Customers.csv')
X = dataset.iloc[:, [3, 4]].values

# Using the dendrogram to find optimal number of clusters
import scipy.cluster.hierarchy as sch
dendrogram = sch.dendrogram(sch.linkage(X, method='ward'))
plt.title('Dendrogram')
plt.xlabel('Customers')
plt.ylabel('Euclidean distances')
plt.show()

# Fitting hierarchical clustering to the mall dataset
# Applying k-means to the mall dataset
# Note we use AgglomerativeClustering here
from sklearn.cluster import AgglomerativeClustering
hc = AgglomerativeClustering(
    n_clusters=5, affinity='euclidean', linkage='ward')
y_hc = hc.fit_predict(X)

# Visualising the cluster
# y_hc == 0 is cluster 1
# 0, 1 for second arg are x,y
plt.scatter(X[y_hc == 0, 0], X[y_hc == 0, 1],
            s=100, c='red', label='Cluster 1 - Careful')
plt.scatter(X[y_hc == 1, 0], X[y_hc == 1, 1],
            s=100, c='blue', label='Cluster 2 - Standard')
plt.scatter(X[y_hc == 2, 0], X[y_hc == 2, 1],
            s=100, c='green', label='Cluster 3 - Target')
plt.scatter(X[y_hc == 3, 0], X[y_hc == 3, 1],
            s=100, c='cyan', label='Cluster 4 - Careless')
plt.scatter(X[y_hc == 4, 0], X[y_hc == 4, 1],
            s=100, c='magenta', label='Cluster 5 - Sensible')
plt.xlabel('Annual income (k$)')
plt.ylabel('Spending Score (1-100')
plt.legend()
plt.show()
```

## 5. Associate Rule Learning

## 5.1 Apriori 

### Apriori Intuition

Think of the correlation of why customers would buy nappies and beers.

`People who bought also bought...`

Apriori can also help us build rules based on what else has been done.

#### Steps

1. Set a minimum support and confidence
2. Take all subsets in transactions having higher support than minimum support
3. Take all the rules of these subsets having higher confidence than minimum confidence
4. Sort the rules by decreasing lift

#### Support

```bash
support(M) = number user watchlists containing M / number user watchlists
support(I) = number transactions containing I / number of transactions
```

#### Confidence

```bash
confidence(M1->M2) = number user watchlists containing M1 and M2 / number user watchlists containing M1
confidence(I1->I2) = number transactions containing I1 and I2 / number transactions container I1
```

#### Lift

Chances of people who liked movie 1 liking movie 2.

`What are the chances of recommending Ex Machina if they've seen Interstellar?`

Say 10 out of 100 liked Ex Machina from the total but 17.5% of those who watched Interstellar liked Ex Machina:

```bash
Lift = 17.5% / 10% = 1.75
```

### Apriori

For this example, we will actually use a file instead of a library.

Python code:

```python
# Apriori

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
# 7500 customer and what they had in their basket
dataset = pd.read_csv('Market_Basket_Optimisation.csv', header=None)
print(dataset)

# Need to prepare the data correctly for a list of lists
transactions = []
for i in range(0, 7501):
    transactions.append([str(dataset.values[i, j]) for j in range(0, 20)])

# Training Apriori on dataset
# REMEMBER: this depends on your dataset. You need so spend some time for args here.
from apyori import apriori
rules = apriori(transactions, min_support=0.003,
                min_confidence=0.2, min_lift=3, min_length=2)

# Visualising the results
results = list(rules)
for item in results:

    # first index of the inner list
    # Contains base item and add item
    pair = item[0]
    items = [x for x in pair]
    print("Rule: " + items[0] + " -> " + items[1])

    # second index of the inner list
    print("Support: " + str(item[1]))

    # third index of the list located at 0th
    # of the third index of the inner list

    print("Confidence: " + str(item[2][0][2]))
    print("Lift: " + str(item[2][0][3]))
    print("=====================================")

```

## 6. Reinforcement Learning

Reinforcement Learning is a branch of Machine Learning, also called Online Learning. It is used to solve interacting problems where the data observed up to time t is considered to decide which action to take at time t + 1. It is also used for Artificial Intelligence when training machines to perform tasks such as walking. Desired outcomes provide the AI with reward, undesired with punishment. Machines learn through trial and error.

## 6.1 Upper Confidence Bound (UCB)

### The Multi-Armed Bandit Problem

Think of a robotic dog: We can either give it an algorithm to follow, or we can give it all the options it has and give it a _reward_ or _punishment_ based on the choices it makes.

What is the problem?

A one-armed bandit is a slot machine (there is history behind the name). It is to do with the old levers and bandit comes from the fact that it takes your money. The _multi_ comes into it when you think of many of these machines. How do you play them to maximise your return? Without knowing the distribution of chances how to win, we need to figure this out while spending the least amount of time.

A use case for things like this could be to figure out which ad gives us the best return.

### UCB Intuition

- We have _d_ arms eg ads displayed to user on a page
- Each time a user connects to the page, this makes a round
- At each round _n_, we choose one ad to display to the user
- At each round _n_, ad _i_ gives reward r[i](n) as an element of {0, 1}: r[i](n) = 1 if the user clicked on the ad _i_ and 0 if they did not
- The goal is to maximize the total reward we get over many rounds



For each distribution at the start, we assume that they are all the same. For the first couple of rounds, they are basically all trial runs. We do that to create the initial _**confidence bound**_. As the agent observing the data, the value goes up or down based on the *observed average*.

Because we now have an extra observation, our confidence bound will get smaller as we become more confident.

The confidence bounds only have one task: have the expected value within the box bound.

![Confidence bound](data:image/png;base64,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)

![Confidence bound interval](https://slideplayer.com/slide/4496194/14/images/11/Upper+Confidence+Bound+algo+%5BAuerEtAl%E2%80%9902%5D.jpg)

As time goes on and the confidence bound converges because the result is _good_, it moves on to others to remain unbiased. We continually choose the option with the "upper" confidence bound as the next choice.

### UCB Implementation in Python

Given a scenario of 10000 ads being shown to users, we want to see how many click no a specific ad (denoted 0 and 1). 

Beginning here, we start with a random 10000 iterator as a test, and we see it gets 1246 *rewards* in total. If we keep running the algorithm, you can see we continually get ~1200.

If we run a histogram of a distibution of the ads, we notice that they are almost similar in the number of times chosen since it is random and not using an educated guess.

#### Implementing UCB by scratch

There is no real easy package to implement UCB, so we add this by scratch.

**Steps:**

1. At each round *n*, we consider two numbers for each ad *i*.
   - $N_i(n)$ - the number of times ad *i* was selected up to round *n*
   - $R_i(n)$ - the sum of rewards of the ad *i* up to round *n*
2. From these two numbers we compute:
   - The average rewards of ad *i* up to round *n*
   - The confidence interval at round *n*
3. We select the ad *i* that has the maximum UCB.

```python
# Implemented UCB
import math
N = 10000
d = 10
ads_selected = []
numbers_of_selections = [0] * d
sum_of_rewards = [0] * d
total_reward = 0
for n in range(0, N):
    ad = 0
    max_upper_bound = 0
    for i in range(0, d):
        # if statement for initial conditions
        if (numbers_of_selections[i] > 0):
            average_reward = sum_of_rewards[i] / numbers_of_selections[i]
            delta_i = math.sqrt(3/2 * math.log(n + 1) /
                                numbers_of_selections[i])
            upperbound = average_reward + delta_i
        else:
            # this large value is used to ensure we select the 10 different ads over first 10 rounds
            upperbound = 1e400
        if upperbound > max_upper_bound:
            max_upper_bound = upperbound
            ad = i
    ads_selected.append(ad)
    numbers_of_selections[ad] = numbers_of_selections[ad] + 1
    reward = dataset.values[n, ad]
    # sum of rewards for specific ad
    sum_of_rewards[ad] = sum_of_rewards[ad] + reward
    # sum of all rewards over all ads
    total_reward = total_reward + reward

print(total_reward) # 2178

# Visualising
plt.hist(ads_selected)
plt.title('Histogram of Ad Selections')
plt.xlabel('Ads')
plt.ylabel('Selections')
plt.show()
```

## 6.2 Thompson Sampling

### Thompson Sampling Intuition

![Thompson Sampling](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkydAnQZ10LY1nnmX4NmhrAiQJRQbudRaOabUISCK_70EiOwC7)

### Bayesian Inference

Without delving deep into the math, this requires Bayesian Inference.

### Thompson Sampling Algorithm

Again, we have no prior knowledge of the current situation. What Thompson Sampling will end up doing is actually creating a distribution based on returns.

These distributions are representing where we think the actual expected value might lie. Using this, we can generate our own "bandit" configuration.

**Steps:**

1. At each round $n$, we consider two numbers for each ad $i$

   - $N_i^1(n)$ - the number of times the ad $i$ got rewards 1 up to round $n$ 

   - $N_i^0(n)$ - the number of times the ad $i$ got rewards 0 up to round $n$ 

2. For each ad $i$ we take a random draw from the distribution below:

   -  $\theta_i(n)=\beta(N_i^1(n)+1,N_i^0(n)+1)$

3. We selet the ad that has the highest $\theta_i(n)$ 

### Algorithm Comparison vs UCB

They both do solve the same problem, but there are pros and cons for both.

#### UCB Pros/Cons

- Deterministic
- Requires an update every round

#### Thomspon Samples Pros/Cons

- Probablistic 
- Can accomodate delayed feedback
- Better empirical evidence

### Implementing the algorithm

```python
# Data Preprocessing Template

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
# Note this dataset is just for simulation
# Observing if 10000 users click on an ad (0 or 1)
# We are not showing the ads at random - based on UCB
# This will be chosen after the first 10 in this simulation
dataset = pd.read_csv('Ads_CTR_Optimisation.csv')

# Implemented UCB
import random
N = 10000
d = 10
ads_selected = []
numbers_of_rewards_1 = [0] * d
numbers_of_rewards_0 = [0] * d
total_reward = 0
for n in range(0, N):
    ad = 0
    max_random = 0
    for i in range(0, d):
        random_beta = random.betavariate(
            numbers_of_rewards_1[i] + 1, numbers_of_rewards_0[i] + 1)
        if random_beta > max_random:
            max_random = random_beta
            ad = i
    ads_selected.append(ad)
    reward = dataset.values[n, ad]
    if reward == 1:
        numbers_of_rewards_1[ad] = numbers_of_rewards_1[ad] + 1
    else:
        numbers_of_rewards_0[ad] = numbers_of_rewards_0[ad] + 1
    total_reward = total_reward + reward

print(total_reward)  # 2178

# Visualising
plt.hist(ads_selected)
plt.title('Histogram of Ad Selections')
plt.xlabel('Ads')
plt.ylabel('Selections')
plt.show()
```

## 8. Deep Learning

You need data and a lot of data + a bunch of processing power.

But what is deep learning? A lot of it is based on mimicing the mind. A lot of the terminology is based on terms like "neurons".

Thinking of the network, we can think of the input layer which consists of input values, an output layer at the end with the output value and a hidden layer between. So all the input layers are connected to the hidden layer, the hidden layer is connected to the output layer.

Deep learning occurs when we have lots and lots of hidden layers.

Geoffrey Hinton is a good reference of someone leading the field.

## 8.1 Artificial Neural Networks

### Plan of attack

What will we learn?

- The neuron
- The activation functions and examples
- How neural networks work
- How neural networks learn
- Gradient Descent 
- Stochastic Gradient Descent
- Backpropagation

### The Neuron

How can we recreate the neuron in the machine? We mimic how neurons and their networks look like in the brain. The neuron itself consists of that main body, dendrites and the axon.

![Neuron diagram](https://media.istockphoto.com/vectors/diagram-of-neuron-anatomy-vector-id1010745194)

Conceptionally, the dendrites of a neuron are connected to other axons. The whole concept of a an impulse being passed is the synapse. Synapses is an important term.

The neuron in our case gets a number of input signals, and gives an output signal. For the sake of understanding, input values can be representing in yellow, the neuron in green. The joining between input and neuron is the **synapse**.

Input value can themselves just be a standardized **independent variable**. 

Additional reading: *Efficient BackProp* b Yann LeCun.

What can the output value be? Can be continuous (price), binary (will exit yes/no), categorical.

An important thing to note is that for both the input and output is just for a **single observation**.

On the synpase, there also **weights**. These values are important for the process and it is the weights that are adjusted during the learning process.

![Basic diagram](https://i.stack.imgur.com/VqOpE.jpg)

### Activation functions

#### Threshold function

A simple function that defines that if a value is less than 0, pass a 0, else pass 1.

![Threshold](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUKvWw8jno5pbSKLbPPw0BqInuK6eu2TNilIfrIgYIxu-Ly0g)

#### Sigmoid function

$\phi(x)=\frac{1}{1+e^{-x}}$

What is good about this function is that it is smooth. A gradual progression. It is very useful for the final layer - especially for things like probability.

![Sigmoid](data:image/png;base64,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)

#### Rectifier function

$\phi(x)=max(x,0)$ 

Starts at 0 and then at some point turns towards 1.

![Rectifier](data:image/png;base64,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)

Rectifier function is one of the most used.

#### Hyperbolic Tangent Function (tanh)

$\phi(x)=\frac{1-e^{-2x}}{1+e^{-x}}$

### How do NNs work?

An important part of NNs are training them up, but for now let's just focus on how they work (pretend it is already trained up) so we can see the application we are working towards.

Say we have 4 input variables: Area (feet), Bedrooms, Distanct to city (Miles) and Age.

The output variable we want is the price. So what we want is that the weights that give a price calculation.

#### Hidden layer

The power here comes from that hidden layer.

![Hidden layer](data:image/png;base64,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)

If we walk through this, we assume that some weight will have a zero value and some others will have a non-zero value.

Each neuron itself could pick up all or some of the input values after being trained.

### How do NNs learn?

If you think of a perceptron (single-layer feed forward), think of $y$ as the actual value and $\hat{y}$ is the output value from the output layer. To learn, we need to compare this output value to the actual value. We can plot both on a graph and calculate the cost function $C = 1/2(\hat{y}-y)^2$ - we will then feed this information back into the neural network to adjust the weights. We want the cost function to tend towards zero. 

One **epoch** is when we go through all the data and train based on the rows.

![One epoch](https://res.cloudinary.com/gitgoodclub/image/upload/v1538792014/Screen_Shot_2018-10-06_at_12.12.24_pm.png)

Again, optimal weights are found when you reduce the cost function as much as possible. The whole process is known as **back propagation**.

### Gradient descent 

Gradient decent is finding the lowest **C** value over the iterations. If we map the cost function on a graph, it can look like a parabola. We look at the angle of our cost function along this point for $\hat{y}$.

### Stochastic Gradient Descent

What happens if our cost function is not convexed? Ie not just a parabola? How do we find the minimum for the cost function?

Normal gradient descent is when we take all of our rows and adjust the weights after calculating it all. The is also known as **Batch Gradient Descent**. With **Stochastic Gradient Descent**, we actually take the rows one by one, then run the network, look at the cost function and then adjust the weights.

### Backpropagation

We know there is a process called forward propagation to get our values for our $\hat{y}$'s. Backpropagation is an advanced algorithm that allows us to adjust all the weights simulataneously at the same time.

### Training the ANN with Stochastic Gradient Descent

1.  Randomly initialise the weights to small numbers close to 0 (but not 0)
2. Input the first observation of your dataset in the input layer, each feature in one input node
3. Forward propagation (left to right): neurons activated in a way that the impact of each neuron's actiation is limited by the weights. Propagate the activations until getting the predicted result y.
4. Compare predicted result to the actual test. Measure the generated error.
5. Back-propagation: from right to left, the error is back propagated. Update the weights according to how much they are responsible for the error. The learning rate decides by how much we update the weights.

### Business Problem Description

The Churn_Modelling.csv file is bank data and they're trying to figure out the churn and why customers are leaving at high rates. They want you to assess and address the problem.

They've had 10000 customers and they're basically watching them. If the left, the *exited* field is 1, else 0.

We need to create a model of customers that are at high risk of leaving.

### Installing Theano, Tensorflow and Keras

```bash
pip install --upgrade git+https://github.com/Theano/Theano.git#egg=Theano
pip install --upgrade tensorflow
pip install --upgrade keras

# if conda installing tensorflow
conda install -c conda-forge tensorflow
conda install -c conda-forge keras
```

- **Theano** - a library to help make use of the graphics card
- **Tensorflow** - an opensource numerical computations library
- **Keras** - a library that wraps both Theano and Tensorflow to make it abstracted to build powerful deep learning models with short amounts of code

For install issues, check [Stack Overflow](https://stackoverflow.com/questions/41415527/installing-keras-package-with-conda-install/41415759#41415759)

### Preparing the data for the future deep learning model

Given the answer we are looking for, we are in the middle of a classification problem.

As we look through all the data, we need to decide which independent variables may impact the dependent variable.

For this, we first start by setting our dataframes for our IV and DV.

```python
# Importing the dataset
dataset = pd.read_csv('Churn_Modelling.csv')
X = dataset.iloc[:, [3:13]].values
y = dataset.iloc[:, 13].values
```

Since we have some string categories, we need to encode these categories.

```python
# Clean the categorical variables
# Encoding categorical data
# We need to encode both gender and country
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
# Encode country
labelencoder_X_1 = LabelEncoder()
X[:, 1] = labelencoder_X_1.fit_transform(X[:, 1])
# Encode gender
labelencoder_X_2 = LabelEncoder()
X[:, 2] = labelencoder_X_2.fit_transform(X[:, 2])
# We need to remove dummy variables for one to avoid the dummy variable trap
onehotencoder = OneHotEncoder(categorical_features = [1])
X = onehotencoder.fit_transform(X).toarray()
X = X[:, 1:]
```

A good [link on the Dummy Variable Trap](http://www.algosome.com/articles/dummy-variable-trap-regression.html).

![Dummy Variable Trap](https://slideplayer.com/slide/3117326/11/images/13/THE+DUMMY+VARIABLE+TRAP.jpg)

### Building the ANN

**Steps:**

1. Randomly init weights to small numbers close to 0
2. Input the first observation of your dataset in the input layer, each feature in one input node
3. Forward-Propagation: from left to right, the neurons are activated in a way that the impact of each neuron's activation is limited by the weights. Propagate the activations until getting the predicted result y.
4. Compare predicted result to actual result. Measure generated error.
5. Back-Propagation: from right to left, the error is back-propagated.
6. Repeat steps 1 to 5 and employ either Batch Learning or Reinforcement learning.
7. When the whole training set passed through the ANN, that makes an epoch. Redo more epochs.

```python
# Classification template

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
dataset = pd.read_csv('Churn_Modelling.csv')
X = dataset.iloc[:, 3:13].values
y = dataset.iloc[:, 13].values

# Clean the categorical variables
# Encoding categorical data
# We need to encode both gender and country
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
# Encode country
labelencoder_X_1 = LabelEncoder()
X[:, 1] = labelencoder_X_1.fit_transform(X[:, 1])
# Encode gender
labelencoder_X_2 = LabelEncoder()
X[:, 2] = labelencoder_X_2.fit_transform(X[:, 2])
# Encode one of the categorical features
onehotencoder = OneHotEncoder(categorical_features=[1])
X = onehotencoder.fit_transform(X).toarray()
# We update X to again finish removing a varible for the dummy variable trap
X = X[:, 1:]

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=0)

# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

# Building the ANN
import keras
from keras.models import Sequential
from keras.layers import Dense

# Initialising the ANN
classifier = Sequential()

# Adding in the input layer and the first hidden layer
classifier.add(Dense(units=6, kernel_initializer='uniform',
                     activation='relu', input_shape=(11,)))

# Add second hidden layer
classifier.add(Dense(units=6, init='uniform', activation='relu'))

# Add output layer - softmax for activation if you have more than 2 categories for DV
classifier.add(Dense(units=1, init='uniform', activation='sigmoid'))

# Compiling the ANN
classifier.compile(
    optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])


classifier.fit(X_train, y_train, batch_size=10, epochs=100)

# Predicting the Test set results
y_pred = classifier.predict(X_test)
y_pred = (y_pred > 0.5)

# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)
print(cm)
```

## 8.2 Convolutional Neural Networks

### What are CNNs

The example given is dealing with vague images that could be two images in one. 

![Mixed image](data:image/jpeg;base64,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)

The example above is the rabbit vs duck. The brain changes how it processes the image based on what it sees.

The other example given was the face with four eyes and two mouths to illustrate the point that the brain finds it hard to comprehend certain images.

Yann LeCun is grandfather of CNNs. Big findings from him were made in the 80s/90s.

How does it work? We have an input image that goes through the CNN to an output label (image class). For each pixel, the **computer sees a value between 0 and 255**. For a black and white image, there is only one channel and the computer sees a 2d array, however for coloured images it is a 3d array with a red, blue and green channel.

**Steps**:

1. Convolution
2. Max Pooling
3. Flattening
4. Full Connection

The initial paper [can be found here if you want to read](http://vision.stanford.edu/cs598_spring07/papers/Lecun98.pdf).

### Convolution Operation

$(f*g)(t)=^{def}\int^{\infty}_{-\infty}f(\tau)g(t-\tau)d\tau$

More reading if you want a good intro [can be found here](https://pdfs.semanticscholar.org/450c/a19932fcef1ca6d0442cbf52fec38fb9d1e5.pdf).

What is a convolution in intuitive terms? We have an **input image** and a **feature detector**. Feature detector can also be known as a *kernal* or a *filter*.

![Feature detector](data:image/png;base64,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)

As the filter moves through, we call it a ***stride***.

The **feature map** is calculted by can also be called a *convolved map* or a *feature map*.

Are we losing information when we apply the feature detector? Yes, but we are looking to detect parts of the image that are integral. In our personal life, we don't look at every pixel, we look at features.

To create our first **convolution layer**, we create many feature maps.

![Many maps](data:image/png;base64,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)

Applying these filters actually is what can happen we apply image filters too. Things like *sharpen*, *blur*, *edge detect* etc are basic applications of these filters. The output feature map is the filtered image.

### Rectified Linear Unit (ReLU) Layer

During this small step, you apply a rectifier function to ***increase non-linearity***. The example given was a filter that has an image going from light to dark with white, grey, black. The applied rectifier function breaks up this linearity.

A link to more information on ReLU vs the others can be [found here](https://arxiv.org/abs/1609.04112). For more indepth information on rectifiers, [read here](https://arxiv.org/abs/1502.01852).

### Pooling

What is pooling and why do we need it? Think of a cheetah image where it is positioned properly, one where it is rotated, and another where it is squashed.

In our case, we are going to apply **max pooling**. Max pooling again looks at small sections of the matrix and the **pool feature map** outputs the max of each section. This reduction helps with a number of things, including processing power, parameters (preventing overfitting) and preserving features but account for spatial of featural distortions.

Here is a good read on [max pooling](http://ais.uni-bonn.de/papers/icann2010_maxpool.pdf). Pooling can also be known as *downsampling*.

A great visualiation tool can be [found here](http://scs.ryerson.ca/~aharley/vis/conv/flat.html).

![Max pooling](data:image/png;base64,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)

### Flattening

With the pooled feature map, we flatten it into a column.

![Flattening](data:image/png;base64,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)

### Full Connection

After the flattening, we go back to the fully connected layer (hidden layer - input layer needs to be fully connected for CNNs) and output layer.

![Full connection](https://adeshpande3.github.io/assets/Cover.png)

In the above, we have an example of a classification output layer which can be seen on the output layer above. The layers prior to the classification may, for example, have strong probabilities based on features for each node that contribute towards the weights of the features required for each classification.

### Summary

Link to [The 9 Deep Learning Papers...](https://adeshpande3.github.io/The-9-Deep-Learning-Papers-You-Need-To-Know-About.html)

### Softmax and Cross-Entropy

![Softmax](https://i.stack.imgur.com/0rewJ.png)

The softmax function helps our ***output layer sum to 1***.

The cross-entropy function after applying the softmax function is cross-entropy. This calculates the **loss** function which we want to minimize. 

#### Cross entropy function

$H(p,q) = - \sum_{x}p(x)log{q(x)}$  

Say we have two neural networks and we have a few images of dogs and cats, we want to see what our NN predict. After evaluating, we can check things like the *classification error* (not a great one), *mean squared error* (which is more accurate) and _cross-entropy_ (also more accurate). So why use cross-entropy over mean squared error? The answer is a few advantages. A couple are:

1. At the start of back propagation, the gradient descent will be low if the error is low. Cross-entropy helps with this as it has $log$ in the calculation.

To get a better understanding, check out [this YouTube video](https://www.youtube.com/watch?v=PHP8beSz5o4).

For some reading on cross entropy, checkout [this reading](https://rdipietro.github.io/friendly-intro-to-cross-entropy-loss/).

### CNN in Python

With these images, we cannot put the DV on the same array at the information as the image data. We can instead write some code to instead abstract the word "cat" or "dog" from the file name to create the DV. Another solution (better) is using **Keras**.

The final code looks like so:

```python
# Part 1 - Building CNN

# Importing the dataset structure with Keras
# First structure pillar is to seperate the images into test_set and training_set
# Second within these folders is split into the DV cats and dogs.
from keras.models import Sequential
from keras.layers import Conv2D
from keras.layers import MaxPooling2D
from keras.layers import Flatten
# Dense is used for the fully connected layers
from keras.layers import Dense

# Initialising the ANN
classifier = Sequential()

# Step 1, adding a convolution layer
# kernel_size is the feature detector matrix size
# input_shape is 3d, so we want each channel to point to each array
# 64, 64 is for the colours 2d arrays (not using 255 because of CPU) and 3 for 3 dimensions (for tensorflow backend)
classifier.add(Conv2D(
    filters=32, kernel_size=(3, 3), input_shape=(64, 64, 3), activation='relu'))

# Step 2
# Pool size for how big we want our pooling matrix
# Since we don't set the strides tuple, strides will default
# to the pool_size
classifier.add(MaxPooling2D(pool_size=(2, 2)))

# Optional, create another Conv + Max Pooling layer
classifier.add(Conv2D(
    filters=32, kernel_size=(3, 3), activation='relu'))
classifier.add(MaxPooling2D(pool_size=(2, 2)))

# Step 3 - Flattening
# This huge, flat array will relate to a specific feature
classifier.add(Flatten())

# Step 4 - Full connection
# Adding in the input layer and the first hidden layer
classifier.add(Dense(units=128, activation='relu'))
# If wasn't a binary output, we would use softmax
classifier.add(Dense(units=1, activation='sigmoid'))

classifier.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Part 2 - Fitting CNN to images
from keras.preprocessing.image import ImageDataGenerator

# Some of the args are for applying random transformations for training
train_datagen = ImageDataGenerator(
        rescale=1./255,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True)

# Only requires rescale since the rest doesn't need transforms
test_datagen = ImageDataGenerator(rescale=1./255)

# target_size update for our 64 expectation
training_set = train_datagen.flow_from_directory(
        'dataset/training_set',
        target_size=(64, 64),
        batch_size=32,
        class_mode='binary')


test_set = test_datagen.flow_from_directory(
        'dataset/test_set',
        target_size=(64, 64),
        batch_size=32,
        class_mode='binary')

# steps_per_epochs=number of images in training set
classifier.fit_generator(
        training_set,
        steps_per_epoch=8000,
        epochs=25,
        validation_data=test_set,
        validation_steps=2000)
```

After training the model, if you want to use it and make predictions, you can save and reload that model. [Check here for more information](https://machinelearningmastery.com/save-load-keras-deep-learning-models/).

## 9. Dimensionality reduction

In Classification, we only worked with datasets comprised of **only two independent variables**. This is because:

1. We needed two dimensions to visualise how ML models worked.
2. Because whatever is the original number of IV, we can often end up with two indepent variables by applying an appropriate Dimensionality Reduction technique.

Feature selection techniques covered in Regression (Part 2) included **Backward Elimination, Forward Selection, Bidirectional Elimination, Score Comparison and more**.

In this part, we will cover the following **Feauture Extraction** techniques:

1. Principal Component Anaylsis (PCA)
2. Linear Discriminant Analysis (LDA)
3. Kernel PCA
4. Quadratic Discriminant Analysis (QDA)

## 9.1 Principal Component Analysis - PCA

One of the most used unsupervised algorithms. It is used for features such as:

- Noise filtering
- Visualization
- Feature extraction
- Stock market predictions
- Gene data analysis

It is used to:

1. Identify patterns in data

2. Detect the correlation between variables


![PCA](https://s3.amazonaws.com/files.dezyre.com/images/Tutorials/Principal+Component+Analysis.jpg)

The goal is to reduce the dimensions of a d-dimensional dataset by projecting it onto a (k)-dimensional subspace (where k<d). We want to:

1. Standardize the data.
2. Obtain the **Eigenvectors** and **Eigenvalues** from the covariance matrix or correlation matrix, or perform **Singular Vector Decomposition**. 
3. Sort eigenvalues in descending order and choose the $k$ eigenvectors that correspond to the $k$ largest eigenvalues where $k$ is the number of dimensions of the new feature subspace $(k\le{d})$. 
4. Construct the projection matrix **W** from the selected $k$ eigenvectors.
5. Transform the original dataset **X** via **W**  to obtain a $k$-dimensional feature subspace **Y**.

A great link on the mathematics behind it can be [found here](http://www.math.union.edu/~jaureguj/PCA.pdf).

A great visual link for intuition can be [found here](http://setosa.io/ev/principal-component-analysis/).

For 2D, we can see how the relationship works for dimensionality reduction. The real power can be seen for the 3 dimensional space.

PCA in summary helps us to learn about the relationship between the X and Y values and find the list of principal axes. Be careful though, PCA is **highly affected** by outliers.

### PCA in Python

If we have $n$ independent variables, PCA extracts $p\le{m}$ new independent variables that explain the most of the variance in the dataset *regardless of the dependent variable*. The fact that DV is not considered is what makes PCA an unsupervised model.

What we want to do with the Wine.csv file is take the data and make a classification model like logistical regression. That will help us create a recommended wine. To visualise the predictions, it cannot be done with all the independent variables. We apply dimensionality reductions techniques to show two variables that can help us visualise this instead.

#### Confusion matrix

The CM will end up with 3 dimensions in this case. The diagonal will still contain the correct predictions while the rest will not.

#### Code

```python
# Data Preprocessing Template

# Importing the libraries
import sys
import json
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
dataset = pd.read_csv('Wine.csv')
X = dataset.iloc[:, 0:13].values
y = dataset.iloc[:, 13].values

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=0)

# Feature Scaling - must be applied to PCA and LDA
from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()
X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)

# ! Applying PCA
from sklearn.decomposition import PCA
# n_components is the principal components we want
# Note: use None at first to find what uses the most
pca = PCA(n_components=2)
X_train = pca.fit_transform(X_train)
X_test = pca.fit_transform(X_test)
# We want to find what variables explain the variance
# Check the print out and then use it we need
"""
explained_variance = pca.explained_variance_ratio_
print(explained_variance)
"""

# Fitting Logistic Regression to the Training Set
from sklearn.linear_model import LogisticRegression
regressor = LogisticRegression(random_state=0)
regressor.fit(X_train, y_train)

# Prediciting the test set results
y_pred = regressor.predict(X_test)

# Produce confusion matrix
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)

# Visualising the Training set results
from matplotlib.colors import ListedColormap
X_set, y_set = X_train, y_train
X1, X2 = np.meshgrid(np.arange(start=X_set[:, 0].min() - 1, stop=X_set[:, 0].max()+1, step=0.01),
                     np.arange(start=X_set[:, 1].min() - 1, stop=X_set[:, 1].max()+1, step=0.01))

plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(
    X1.shape), alpha=0.75, cmap=ListedColormap(('red', 'green', 'blue')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_Set[y_set == j, 0], X_set[y_set == j, 1],
                c=ListedColormap(('red', 'green', 'blue'))(i), label=j)
plt.title('Logistic Regression (Training set)')
plt.xlabel('pc1')
plt.ylabel('pc2')
plt.legend()
plt.show()

# Visualizing the Test Set results
from matplotlib.colors import ListedColormap
X_set, y_set = X_test, y_test
X1, X2 = np.meshgrid(np.arange(start=X_set[:, 0].min() - 1, stop=X_set[:, 0].max()+1, step=0.01),
                     np.arange(start=X_set[:, 1].min() - 1, stop=X_set[:, 1].max()+1, step=0.01))

plt.contourf(X1, X2, classifier.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(
    X1.shape), alpha=0.75, cmap=ListedColormap(('red', 'green', 'blue')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_Set[y_set == j, 0], X_set[y_set == j, 1],
                c=ListedColormap(('red', 'green', 'blue'))(i), label=j)
plt.title('Logistic Regression (Training set)')
plt.xlabel('pc1')
plt.ylabel('pc2')
plt.legend()
plt.show()
```

#### Plot

Note that in this example we had to set a third colour for the third recommendation.

![PCA Plot](https://res.cloudinary.com/gitgoodclub/image/upload/v1538971142/Screen_Shot_2018-10-08_at_2.58.28_pm.png)

## 9.2 Linear Discriminant Analysis (LDA)

### LDA Intuition

While it may seem similar to PCA, but there are important differences. LDA is used in preprocessing step for pattern classification. 

LDA differs because in addition to finding the component axises with LDA, we are interested in the axes that maximise the separation between multiple classes.

![LDA](https://sebastianraschka.com/images/blog/2014/linear-discriminant-analysis/lda_1.png)

The goal of LDA is to project a feature space onto a smaller subspace while maintaining the class-discriminatory information.

Here is a [good intro into Linear Discriminant Analysis](https://sebastianraschka.com/Articles/2014_python_lda.html).

### Steps for LDA

1. Compute the $d$-dimensional mean vectors for the different classes from the dataset.
2. Compute the scatter matrices (in-between-class and within-class scatter matrix).
3. Compute the eigenvectors $(e_1,e_2,...,e_d)$ and corresponding eigenvalues $(λ_1,λ_2,...,λ_d)$ for the scatter matrices.
4. Sort the eigenvectors by decreasing eigenvalues and choose $k$ eigenvectors with the largest eigenvalues to form a $d\times{k}$ dimensional matrix $W$ (where every column represents an eigenvector).
5. Use this $d\times{k}$ eigenvector matrix to transform the samples onto the new subspace. This can be summarized by the matrix multiplication: $Y=X\times{Y}$ (where X is a $n\times{d}$-dimensional matrix representing the $n$ samples, and $y$ are the transformed $n\times{k}$-dimensional samples in the new subspace).

### LDA in Python

As opposed to PCA, LDA is a **supervised** model since it takes the dependent variable into consideration.

```python
# Data Preprocessing Template

# Importing the libraries
import sys
import json
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
dataset = pd.read_csv('Wine.csv')
X = dataset.iloc[:, 0:13].values
y = dataset.iloc[:, 13].values

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=0)

# Feature Scaling - must be applied to PCA and LDA
from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()
X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)

# ! Applying PCA
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
# n_components is the principal components we want
# Note: for LDA, we want to include y_train for X_train transform as LDA is supervised
lda = LinearDiscriminantAnalysis(n_components=2)
X_train = lda.fit_transform(X_train, y_train)
X_test = lda.transform(X_test)

# Fitting Logistic Regression to the Training Set
from sklearn.linear_model import LogisticRegression
regressor = LogisticRegression(random_state=0)
regressor.fit(X_train, y_train)

# Prediciting the test set results
y_pred = regressor.predict(X_test)

# Produce confusion matrix
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)

# Visualising the Training set results
from matplotlib.colors import ListedColormap
X_set, y_set = X_train, y_train
X1, X2 = np.meshgrid(np.arange(start=X_set[:, 0].min() - 1, stop=X_set[:, 0].max()+1, step=0.01),
                     np.arange(start=X_set[:, 1].min() - 1, stop=X_set[:, 1].max()+1, step=0.01))

plt.contourf(X1, X2, regressor.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(
    X1.shape), alpha=0.75, cmap=ListedColormap(('red', 'green', 'blue')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                c=ListedColormap(('red', 'green', 'blue'))(i), label=j)
plt.title('Logistic Regression (Training set)')
plt.xlabel('pc1')
plt.ylabel('pc2')
plt.legend()
plt.show()

# Visualizing the Test Set results
from matplotlib.colors import ListedColormap
X_set, y_set = X_test, y_test
X1, X2 = np.meshgrid(np.arange(start=X_set[:, 0].min() - 1, stop=X_set[:, 0].max()+1, step=0.01),
                     np.arange(start=X_set[:, 1].min() - 1, stop=X_set[:, 1].max()+1, step=0.01))

plt.contourf(X1, X2, regressor.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(
    X1.shape), alpha=0.75, cmap=ListedColormap(('red', 'green', 'blue')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                c=ListedColormap(('red', 'green', 'blue'))(i), label=j)
plt.title('Logistic Regression (Training set)')
plt.xlabel('pc1')
plt.ylabel('pc2')
plt.legend()
plt.show()
```



## 9.3 Kernal PCA

Know when to apply it. It is useful when data **is not linearly seperable.**

![Mappingfunc](https://res.cloudinary.com/gitgoodclub/image/upload/v1538976024/Screen_Shot_2018-10-08_at_4.20.07_pm.png)

![Before and after](https://res.cloudinary.com/gitgoodclub/image/upload/v1538976212/Screen_Shot_2018-10-08_at_4.23.11_pm.png)

```python
# Data Preprocessing Template

# Importing the libraries
import sys
import json
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
dataset = pd.read_csv('Social_Network_Ads.csv')
X = dataset.iloc[:, [2, 3]].values
y = dataset.iloc[:, 4].values

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=0)

# Feature Scaling - must be applied to PCA and LDA
from sklearn.preprocessing import StandardScaler
sc_X = StandardScaler()
X_train = sc_X.fit_transform(X_train)
X_test = sc_X.transform(X_test)

# ! Applying PCA
from sklearn.decomposition import KernelPCA
# n_components is the principal components we want
# Note: use None at first to find what uses the most
kpca = KernelPCA(n_components=2, kernel='rbf', random_state=0)
X_train = kpca.fit_transform(X_train)
X_test = kpca.transform(X_test)
# We want to find what variables explain the variance
# Check the print out and then use it we need
"""
explained_variance = pca.explained_variance_ratio_
print(explained_variance)
"""

# Fitting Logistic Regression to the Training Set
from sklearn.linear_model import LogisticRegression
regressor = LogisticRegression(random_state=0)
regressor.fit(X_train, y_train)

# Prediciting the test set results
y_pred = regressor.predict(X_test)

# Produce confusion matrix
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)

# Visualising the Training set results
from matplotlib.colors import ListedColormap
X_set, y_set = X_train, y_train
X1, X2 = np.meshgrid(np.arange(start=X_set[:, 0].min() - 1, stop=X_set[:, 0].max()+1, step=0.01),
                     np.arange(start=X_set[:, 1].min() - 1, stop=X_set[:, 1].max()+1, step=0.01))

plt.contourf(X1, X2, regressor.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(
    X1.shape), alpha=0.75, cmap=ListedColormap(('red', 'green')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                c=ListedColormap(('red', 'green'))(i), label=j)
plt.title('Logistic Regression (Training set)')
plt.xlabel('pc1')
plt.ylabel('pc2')
plt.legend()
plt.show()

# Visualizing the Test Set results
from matplotlib.colors import ListedColormap
X_set, y_set = X_test, y_test
X1, X2 = np.meshgrid(np.arange(start=X_set[:, 0].min() - 1, stop=X_set[:, 0].max()+1, step=0.01),
                     np.arange(start=X_set[:, 1].min() - 1, stop=X_set[:, 1].max()+1, step=0.01))

plt.contourf(X1, X2, regressor.predict(np.array([X1.ravel(), X2.ravel()]).T).reshape(
    X1.shape), alpha=0.75, cmap=ListedColormap(('red', 'green')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1],
                c=ListedColormap(('red', 'green'))(i), label=j)
plt.title('Logistic Regression (Training set)')
plt.xlabel('pc1')
plt.ylabel('pc2')
plt.legend()
plt.show()
```



### Help and Issue Tracking

- If you run into a `MKL` error, check [here](https://github.com/BVLC/caffe/issues/3884).
- Updates to sklearn mean that `train_test_split` comes from `sklearn.model_selection`.