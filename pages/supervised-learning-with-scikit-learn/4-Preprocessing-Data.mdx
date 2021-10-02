# Pre-processing data

## Dealing with categorical features

Example 'red' or 'blue' - as these are not numerical values, you will need to preprocess these features.

Our goal is to encode these categorical features numerically.

You'll need to convert to `dummy variables`:

- 0: Observation was NOT that category
- 1: Observation was that category

## Dummy variables

Example: `Origin` that can be the values `US`, `Europe` or `Asia`.

We create binary features for each of the origins:

| Origin |
| ------ |
| US     |
| Europe |
| Asia   |

This will become ...

| origin_Asia | origin_Europe | origin_US |
| ----------- | ------------- | --------- |
| 0           | 0             | 1         |
| 0           | 1             | 0         |
| 1           | 0             | 0         |

Each of the columns is a binary feature and will have `1` if the observation was from that origin.

Not that if a car is not from US and not from Asia, then implicitly it is from Europe. Therefore, we can remove that column. See [this post](https://inmachineswetrust.com/posts/drop-first-columns/) for more details.

If we do not do this, then we can be duplicating information which will become an issue for some models.

| origin_Asia | origin_US |
| ----------- | --------- |
| 0           | 1         |
| 0           | 0         |
| 1           | 0         |

There are some ways to create dummy variables in Python.

1. Pandas: `pd.get_dummies`
2. Scikit Learn: `OneHotEncoder()`

In this example, we'll use Pandas. For an `automobile` dataset, we have `mpg` as the target variable and `Origin` as the categorical feature.

```py
import pandas as pd
df = pd.read_csv('automobile.csv')
df_origin = pd.get_dummies(df)
print(df_origin.head())

# ... Prints dataframe with dummy variables
```

Because this data will have the "repeated" values we spoke about previously, we need to drop a column.

```py
df_origin = df_origin.drop('origin_Asia', axis=1)
print(df_origin.head())

# ... Prints dataframe with dummy variables without origin_Asia column
```

> You could also use the `.drop_first()` function as well.

## Challenge

Creating a box plot:

```py
# Import pandas
import pandas as pd

# Read 'gapminder.csv' into a DataFrame: df
df = pd.read_csv('gapminder.csv')

# Create a boxplot of life expectancy per region
df.boxplot('life', 'Region', rot=60)

# Show the plot
plt.show()

# ... outputs boxplot
```

Creating dummy variables:

```py
# Create dummy variables: df_region
df_region = pd.get_dummies(df)

# Print the columns of df_region
print(df_region.columns)

# Index(['population', 'fertility', 'HIV', 'CO2', 'BMI_male', 'GDP',
#        'BMI_female', 'life', 'child_mortality', 'Region_America',
#        'Region_East Asia & Pacific', 'Region_Europe & Central Asia',
#        'Region_Middle East & North Africa', 'Region_South Asia',
#        'Region_Sub-Saharan Africa'],
#       dtype='object')

# Create dummy variables with drop_first=True: df_region
df_region = pd.get_dummies(df, drop_first=True)

# Print the new columns of df_region
print(df_region.columns)

# Index(['population', 'fertility', 'HIV', 'CO2', 'BMI_male', 'GDP',
#        'BMI_female', 'life', 'child_mortality', 'Region_East Asia & Pacific',
#        'Region_Europe & Central Asia', 'Region_Middle East & North Africa',
#        'Region_South Asia', 'Region_Sub-Saharan Africa'],
#       dtype='object')
```

Regression with categorical features:

```py
# Import necessary modules
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score

# Instantiate a ridge regressor: ridge
ridge = Ridge(alpha=0.5, normalize=True)

# Perform 5-fold cross-validation: ridge_cv
ridge_cv = cross_val_score(ridge, X, y, cv=5)

# Print the cross-validated scores
print(ridge_cv) # [0.86808336 0.80623545 0.84004203 0.7754344  0.87503712]
```

## Handling missing data

Missing data is not always `null`, it could also be things such as `0` or `-1`.

We can handle missing data in a number of ways:

1. Drop all rows with missing data. (example using data frame function `df.dropna()`)
2. Impute missing data (making an educated guess). A common strategy is to use the mean.

```py
from sklearn.preprocessing import Imputer

# missing_values is our target variable
# stategy is how to impute the missing values
# axis `0` is columns while `1` is rows
imp = Imputer(missing_values="NaN", strategy="mean", axis=0)
imp.fix(X)
X = imp.transform(X)
```

Imputers are known as `transforms`. Anything that has a `transform` method is known as a tranformer.

Imputing with a pipeline:

```py
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import Imputer

imp = Imputer(missing_values="NaN", strategy="mean", axis=0)
logreg = LogisticRegression()
steps = [('imputation', imp), ('logistic_regression', logreg)]

pipeline = Pipeline(steps)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)
pipeline.score(X_test, y_test) # 0.75
```

Each step (except for the last) must be a transformer. The last must be an estimator such as a classifier, an estimator or a transformer.

### Missing data challenge

Replacing `?` with `NaN` then dropping all missing values:

```py
# Convert '?' to NaN
df[df == '?'] = np.nan

# Print the number of NaNs
print(df.isnull().sum())

# Print shape of original DataFrame
print("Shape of Original DataFrame: {}".format(df.shape))

# Drop missing values and print shape of new DataFrame
df = df.dropna()

# Print shape of new DataFrame
print("Shape of DataFrame After Dropping All Rows with Missing Values: {}".format(df.shape))

# Shape of Original DataFrame: (435, 17)
# Shape of DataFrame After Dropping All Rows with Missing Values: (232, 17)
```

### Imputing missing data in a ML Pipeline:

```py
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import Imputer
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Setup the Imputation transformer: imp
imp = Imputer(missing_values='NaN', strategy='most_frequent', axis=0)

# Instantiate the SVC classifier: clf
clf = SVC()

# Setup the pipeline with the required steps: steps
steps = [('imputation', imp),
        ('SVM', clf)]

# Create the pipeline: pipeline
pipeline = Pipeline(steps)

# Create training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Fit the pipeline to the train set
pipeline.fit(X_train, y_train)

# Predict the labels of the test set
y_pred = pipeline.predict(X_test)

# Compute metrics
print(classification_report(y_test, y_pred))
```

Output:

```s
						 precision    recall  f1-score   support

   democrat       0.99      0.96      0.98        85
 republican       0.94      0.98      0.96        46

avg / total       0.97      0.97      0.97       131
```

## Centering and scaling

Data imputation is one of several import preprocessing steps.

This will focus on the next.

We will use some form of distance to inform them - if some are on far larger scales, then they can unduly influence the model.

We want features to be on a similar scale, and we do that by normalizing (scaling and centering).

There are different ways to normalize your data:

1. Standardization, which scales each feature to have a mean of 0 and a standard deviation of 1.
2. Subtract the minimum value and divide by the range (min 0 and max 1).
3. Normalize so data ranges from -1 to +1

Here we will learn to do standardization (but not the others).

```py
from sklearn.preprocessing import scale
X_scaled = scale(X)

print(np.mean(X), np.std(X))
# (8. 134, 16.726)

print(np.mean(X_scaled), np.std(X_scaled))
# (2.546e-15, 1.0)
```

## Scaling in a pipeline

```py
from sklearn.preprocessing import StandardScaler
steps = [('scaler', StandardScaler()),('knn', KNeighborsClassifier())]

pipeline = Pipeline(steps)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

knn_scaled = pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)
accuracy_score(y_test, y_pred) # 0.956

knn_unscaled = KNeighborsClassifier().fit(X_train, y_train)
knn_unscaled.score(X_test, y_test) # 0.928
```

Note how scaling did improve our model.

## CV and scaling in a pipeline

```py
steps = [('scaler', StandardScaler()),('knn', KNeighborsClassifier())]
pipeline = Pipeline(steps)
parameters = {knn__n_neighbors: np.arange(1,50)}

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

cv = GridSearchCV(pipeline, param_grid=parameters)
cv.fit(X_train, y_train)
y_pred = cv.predict(X_test)

print(cv.best_params_) # {'knn__n_neighbors': 41}

print(cv.score(X_test, y_test)) # 0.956

print(classification_report(y_test, y_pred)) # prints report
```

## Scaling challenge

```py
# Import scale
from sklearn.preprocessing import scale

# Scale the features: X_scaled
X_scaled = scale(X)

# Print the mean and standard deviation of the unscaled features
print("Mean of Unscaled Features: {}".format(np.mean(X)))
print("Standard Deviation of Unscaled Features: {}".format(np.std(X)))

# Print the mean and standard deviation of the scaled features
print("Mean of Scaled Features: {}".format(np.mean(X_scaled)))
print("Standard Deviation of Scaled Features: {}".format(np.std(X_scaled)))

# Mean of Unscaled Features: 18.432687072460002
# Standard Deviation of Unscaled Features: 41.54494764094571
# Mean of Scaled Features: 2.7314972981668206e-15
# Standard Deviation of Scaled Features: 0.9999999999999999
```

Centering and scaling in a pipeline:

```py
# Import the necessary modules
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

# Setup the pipeline steps: steps
steps = [('scaler', StandardScaler()),
        ('knn', KNeighborsClassifier())]

# Create the pipeline: pipeline
pipeline = Pipeline(steps)

# Create train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Fit the pipeline to the training set: knn_scaled
knn_scaled = pipeline.fit(X_train, y_train)

# Instantiate and fit a k-NN classifier to the unscaled data
knn_unscaled = KNeighborsClassifier().fit(X_train, y_train)

# Compute and print metrics
print('Accuracy with Scaling: {}'.format(knn_scaled.score(X_test, y_test)))
print('Accuracy without Scaling: {}'.format(knn_unscaled.score(X_test, y_test)))

# Accuracy with Scaling: 0.7700680272108843
# Accuracy without Scaling: 0.6979591836734694
```

Bringing it all together:

```py
# Setup the pipeline
steps = [('scaler', StandardScaler()),
         ('SVM', SVC())]

pipeline = Pipeline(steps)

# Specify the hyperparameter space
parameters = {'SVM__C':[1, 10, 100],
              'SVM__gamma':[0.1, 0.01]}

# Create train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=21)

# Instantiate the GridSearchCV object: cv
cv = GridSearchCV(pipeline, param_grid=parameters)

# Fit to the training set
cv.fit(X_train, y_train)

# Predict the labels of the test set: y_pred
y_pred = cv.predict(X_test)

# Compute and print metrics
print("Accuracy: {}".format(cv.score(X_test, y_test)))
print(classification_report(y_test, y_pred))
print("Tuned Model Parameters: {}".format(cv.best_params_))

# Accuracy: 0.7795918367346939
#              precision    recall  f1-score   support

#       False       0.83      0.85      0.84       662
#        True       0.67      0.63      0.65       318

# avg / total       0.78      0.78      0.78       980

# Tuned Model Parameters: {'SVM__C': 10, 'SVM__gamma': 0.1}
```

Bringing it all together part two:

```py
# Setup the pipeline steps: steps
steps = [('imputation', Imputer(missing_values='NaN', strategy='mean', axis=0)),
         ('scaler', StandardScaler()),
         ('elasticnet', ElasticNet())]

# Create the pipeline: pipeline
pipeline = Pipeline(steps)

# Specify the hyperparameter space
parameters = {'elasticnet__l1_ratio': np.linspace(0,1,30)}

# Create train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=42)

# Create the GridSearchCV object: gm_cv
gm_cv = GridSearchCV(pipeline, param_grid=parameters)

# Fit to the training set
gm_cv.fit(X_train, y_train)

# Compute and print the metrics
r2 = gm_cv.score(X_test, y_test)
print("Tuned ElasticNet Alpha: {}".format(gm_cv.best_params_))
print("Tuned ElasticNet R squared: {}".format(r2))

# Tuned ElasticNet Alpha: {'elasticnet__l1_ratio': 1.0}
# Tuned ElasticNet R squared: 0.8862016570888217
```
