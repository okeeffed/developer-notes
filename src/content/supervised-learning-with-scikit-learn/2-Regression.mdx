# Regression

The target value is a continually varying variable in a regression problem.

## Example

```py
boston = pd.read_csv('boston.csv')
print(boston.head())

# ... output
```

We want to create features and target arrays, so we can split out data.

```py
# Drop the target variable for the features
X = boston.drop(['MEDV'], axis=1).values

# Focus only on the target variable
y = boston['MEDV'].values

X_rooms = X[:, 5]
type(X_rooms), type(y) # (numpy.ndarray, numpy.ndarray)

# Turn them into the desired shape to keep first dimension but add another of size 1 to X
y = y.reshape(-1, 1)
X_rooms = X_rooms.reshape(-1, 1)
```

Plotting the house value vs number of rooms:

```py
plt.scatter(X_rooms, y)
plt.ylabel('Value of house /1000 ($)')
plt.xlabel('Number of rooms')
plt.show()

# ... output
```

> As you could expect, the output graph shows a strong linear relationship between the number of rooms and the house value.

## Fitting a regression model

```py
import numpy as np
from sklearn.linear_model import LinearRegression

reg = LinearRegression()

# Fit the regressor to the data
reg.fit(X_rooms, y)

prediction_space = np.linspace(min(X_rooms), max(X_rooms)).reshape(-1, 1)
```

To plot that line:

```py
plt.scatter(X_rooms, y, color='blue')
plt.plot(prediction_space, reg.predict(prediction_space), color='black', linewidth=3)
plt.show()
```

## Importing data challenge

```py
# Import numpy and pandas
import numpy as np
import pandas as pd

# Read the CSV file into a DataFrame: df
df = pd.DataFrame(pd.read_csv('gapminder.csv'))

# Create arrays for features and target variable
y = df['life'].values
X = df['fertility'].values

# Print the dimensions of y and X before reshaping
print("Dimensions of y before reshaping: ", y.shape)
print("Dimensions of X before reshaping: ", X.shape)

# Reshape X and y
y_reshaped = y.reshape(-1, 1)
X_reshaped = X.reshape(-1, 1)

# Print the dimensions of y_reshaped and X_reshaped
print("Dimensions of y after reshaping: ", y_reshaped.shape)
print("Dimensions of X after reshaping: ", X_reshaped.shape)
```

## The basics of Linear Regression

We want to fit a line to the data (where the line is `y = ax + b`).

| Variable/Statement | Description             |
| ------------------ | ----------------------- |
| `y = ax + b`       | Line equation           |
| `y`                | Target variable         |
| `x`                | Single feature          |
| `a,b`              | Parameters of the model |

How do we choose `a` and `b`?

We need to define an error function for any line and choose the line that minimizes the error function.

> Error function is also know as a cost function or loss function.

We want to minimize the vertical line between the fit and the data point.

The distance between them is known as the `residual`. Because a positive and negative residual will cancel each other out, we use the sum of the squares of the residuals.

This will be the loss function, and using that is called `ordinary least squares` (OLS): minimize sum of squares of residuals.

When you call `fit` on a linear regression model, it performs OLS under the hood.

In higher dimensions, the linear regression equation becomes `y = a1x1 + a2x2 + ... + anxn + b`. We need to specify the parameters `a1, a2, ..., an, b` to fit the model.

The Scikit-learn API works the same way. We pass two arrays:

1. With the features.
2. With the target variable.

```py
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

reg_all = LinearRegression()
reg_all.fit(X_train, y_train)
y_pred = reg_all.predict(X_test)

reg_all.score(X_test, y_test)
```

The default score method for linear regression is `R squared`. For more details, see the documentation.

> Note: You will never use Linear Regression out of the box like this. You will almost always want to use regularization.

## Fit and predict regressor challenge

```py
# Import LinearRegression
from sklearn.linear_model import LinearRegression

# Create the regressor: reg
reg = LinearRegression()

# Create the prediction space
prediction_space = np.linspace(min(X_fertility), max(X_fertility)).reshape(-1,1)

# Fit the model to the data
reg.fit(X_fertility, y)

# Compute predictions over the prediction space: y_pred
y_pred = reg.predict(prediction_space)

# Print R^2
print(reg.score(X_fertility, y))

# Plot regression line
plt.plot(prediction_space, y_pred, color='black', linewidth=3)
plt.show()
```

## Test/train for regression challenge

```py
# Import necessary modules
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import numpy as np

# Create training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3, random_state=42)

# Create the regressor: reg_all
reg_all = LinearRegression()

# Fit the regressor to the training data
reg_all.fit(X_train, y_train)

# Predict on the test data: y_pred
y_pred = reg_all.predict(X_test)

# Compute and print R^2 and RMSE
print("R^2: {}".format(reg_all.score(X_test, y_test)))
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

# @see https://www.statisticshowto.com/probability-and-statistics/regression-analysis/rmse-root-mean-square-error/
print("Root Mean Squared Error: {}".format(rmse))
```

Root Mean Square Error (RMSE) is the standard deviation of the residuals (prediction errors).

In statistics, the standard deviation is a measure of the amount of variation or dispersion of a set of values. A low standard deviation indicates that the values tend to be close to the mean of the set, while a high standard deviation indicates that the values are spread out over a wider range. See [Wikipedia](https://en.wikipedia.org/wiki/Standard_deviation).

## Cross-validation

What is a potential pitfall of what we have done?

If we calculate `R^2` on the test set, the value is dependent on how we split up data. The test set may have peculiarities that may make is hard to generalize.

We use a technique called `cross-validation` to solve this problem.

We split the dataset into 5 groups (or 5 folds).

For split one, we hold out the first fold as a test set, and fit our model on the remaining 4 folds, predict on the test set and compute the metric of interest.

For split two, we hold out on the second fold as the test set and fit our model on the remaining 4 folds, predict on the test set and compute the metric of interest.

We repeat this for all splits.

We end up with 5 values of `R^2`. From here, we could calculate mean, median as well as 95% confidence interals.

This is known as `5-fold cross-validation`. In general, `k` folds is known as `k-fold cross-validation`.

The trade off is that more folds = more computationally expensive.

This method prevents us from becoming dependent on the train/test split for our metric of interest.

```py
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LinearRegression

reg = LinearRegression()

# cv defines the number of folds
# the score reported is R^2
cv_results = cross_val_score(reg, X, y, cv=5)

print(cv_results) # Example output [ 0.87878787  0.87878787  0.87878787  0.87878787  0.87878787]
np_mean(cv_results) # prints mean of results
```

## Cross-validation challenge

```py
# Import the necessary modules
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LinearRegression

# Create a linear regression object: reg
reg = LinearRegression()

# Compute 5-fold cross-validation scores: cv_scores
cv_scores = cross_val_score(reg, X, y, cv=5)

# Print the 5-fold cross-validation scores
print(cv_scores) # [0.81720569 0.82917058 0.90214134 0.80633989 0.94495637]

print("Average 5-Fold CV Score: {}".format(np.mean(cv_scores))) # Average 5-Fold CV Score: 0.8599627722793232
```

## K-Fold CV comparison challenge

The challenge helps us to time the execution of the code.

```py
# Import necessary modules
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LinearRegression

# Create a linear regression object: reg
reg = LinearRegression()

# Perform 3-fold CV
cvscores_3 = %timeit cross_val_score(reg, X, y, cv=3) # 100 loops, best of 3: 6.78 ms per loop
print(np.mean(cvscores_3)) # 0.8718712782622108

# Perform 10-fold CV
cvscores_10 = %timeit cross_val_score(reg, X, y, cv=10) # 10 loops, best of 3: 21 ms per loop
print(np.mean(cvscores_10)) # 0.8436128620131201
```

## Regularized regression

Linear regression minimizes a loss function.

It chooses a different co-efficient for each feature.

Large coefficients lead to overfitting. This is harder to see in a higher-dimensional space.

It is common to regularize the coefficients.

We will look first at ["Ridge regression"](https://en.wikipedia.org/wiki/Ridge_regression).

With the Ridge regression, we ourselves need to pick the value of `alpha`. It is similar to picking the value `k` for k-Nearest Neighbors.

Finding the `alpha` which works best is known as `hyperparameter tuning`.

Alpha controls model complexity. Alpha = 0: We get back OLS (which can lead to overfitting). Alpha being large means that large residuals are being over-penalized. This can lead to underfitting.

```py
from sklearn.linear_model import Ridge
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
# Normalize = True will ensure all values are between 0 and 1
ridge = Ridge(alpha=0.1, normalize=True)
ridge.fit(X_train, y_train)
ridge_pred = ridge.predict(X_test)
ridge.score(X_test, y_test) # Example output: 0.87878787
```

There is another method for Regularized regression called ["Lasso regression"](https://en.wikipedia.org/wiki/Lasso_regression). Similar to Ridge, but using absolute values in the sum of coefficients as opposed to the squared value.

```py
from sklearn.linear_model import Lasso
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
# Normalize = True will ensure all values are between 0 and 1
lasso = Lasso(alpha=0.1, normalize=True)
lasso.fit(X_train, y_train)
lasso_pred = ridge.predict(X_test)
lasso.score(X_test, y_test) # Example output: 0.87878787
```

Lasso can be used to select import features of a dataset. It shrinks the coefficients of less important features to exactly 0.

```py
from sklearn.linear_model import Lasso

names = boston.drop('MEDV', axis=1).columns

lasso = Lasso(alpha=0.1)

# Extract coef_
lasso_coef.fit(X_train, y_train).coef_

_ = plt.plot(range(len(names)), lasso_coef)
_ = plt.xticks(range(len(names)), names, rotation=60)
_ = plt.ylabel('Coefficients')
plot.show()
```

Using this, we are able to see immediately the most import predictor for our target variable "housing price" is "number of rooms".

## Lasso regularization challenge

```py
# Import Lasso
from sklearn.linear_model import Lasso

# Instantiate a lasso regressor: lasso
lasso = Lasso(alpha=0.4, normalize=True)

# Fit the regressor to the data
lasso_fit = lasso.fit(X, y)

# Compute and print the coefficients
lasso_coef = lasso_fit.coef_
print(lasso_coef)

# Plot the coefficients
plt.plot(range(len(df_columns)), lasso_coef)
plt.xticks(range(len(df_columns)), df_columns.values, rotation=60)
plt.margins(0.02)
plt.show()
```

According to the lasso algorithm, it seems like 'child_mortality' is the most important feature when predicting life expectancy.

## Ridge regularization challenge

Lasso is great for feature selection, but when building regression models, Ridge regression should be your first choice.

Recall that lasso performs regularization by adding to the loss function a penalty term of the absolute value of each coefficient multiplied by some alpha. This is also known as `L1` regularization because the regularization term is the `L1` norm of the coefficients. This is not the only way to regularize, however.

If instead you took the sum of the squared values of the coefficients multiplied by some alpha - like in Ridge regression - you would be computing the `L2` norm. In this exercise, you will practice fitting ridge regression models over a range of different alphas, and plot cross-validated `R2` scores for each, using this function that we have defined for you, which plots the `R2` score as well as standard error for each alpha

```py
def display_plot(cv_scores, cv_scores_std):
    fig = plt.figure()
    ax = fig.add_subplot(1,1,1)
    ax.plot(alpha_space, cv_scores)

    std_error = cv_scores_std / np.sqrt(10)

    ax.fill_between(alpha_space, cv_scores + std_error, cv_scores - std_error, alpha=0.2)
    ax.set_ylabel('CV Score +/- Std Error')
    ax.set_xlabel('Alpha')
    ax.axhline(np.max(cv_scores), linestyle='--', color='.5')
    ax.set_xlim([alpha_space[0], alpha_space[-1]])
    ax.set_xscale('log')
    plt.show()
```

The motivation behind this exercise is for you to see how the `R2` score varies with different alphas, and to understand the importance of selecting the right value for alpha.

```py
# Import necessary modules
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score

# Setup the array of alphas and lists to store scores
alpha_space = np.logspace(-4, 0, 50)
ridge_scores = []
ridge_scores_std = []

# Create a ridge regressor: ridge
ridge = Ridge(normalize=True)

# Compute scores over range of alphas
for alpha in alpha_space:

    # Specify the alpha value to use: ridge.alpha
    ridge.alpha = alpha

    # Perform 10-fold CV: ridge_cv_scores
    ridge_cv_scores = cross_val_score(ridge, X, y, cv=10)

    # Append the mean of ridge_cv_scores to ridge_scores
    ridge_scores.append(np.mean(ridge_cv_scores))

    # Append the standard deviation of ridge_cv_scores to ridge_scores_std
    ridge_scores_std.append(np.std(ridge_cv_scores))

# Display the plot
display_plot(ridge_scores, ridge_scores_std)
```

Notice how the cross-validation scores change with different alphas. Which alpha should you pick? How can you fine-tune your model?

The next section will reveal answers to those questions.
