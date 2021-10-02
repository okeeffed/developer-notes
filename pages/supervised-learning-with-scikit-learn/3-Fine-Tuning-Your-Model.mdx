# Fine tuning your model

What are the classification metrics?

- Measuring model perf with accuracy.
  - Fraction of correctly classified samples.
  - Accuracy is not always a use metric.
  - The example given gives the spam accuracy (but horrible at actually predicting spam)

The spam example is a common problem and we need a more nuanced metric to assert performance of model.

## Confusion matrix

We can create a confusion matrix to help with this.

It is an `actual values` vs `predicted values` matrix.

In the spam example, correct predicted spam emails are `True Positive` while correctly predicted emails are `True Negatives`.

| Confusion Matrix   | Predicted: Spam Email | Predicted: Real Email |
| ------------------ | --------------------- | --------------------- |
| Actual: Spam Email | True Positive         | False Negative        |
| Actual: Real Email | False Positive        | True Negative         |

> The class of interest is normally denoted as the `Positive` class, but really it is up to you.

Why do we care about the confusing matrix?

1. We can retrieve accuracy from the confusion matrix. (sum of diagonal divided by sum of all values).
2. We cab also calculate precision. (True Positive / (True Positive + False Positive))
3. Recall (True Positive / (True Positive + False Negative)) - also known as sensitivity, hit rate or true positive hit rate.
4. F1score (2 _ (precision _ recall) / (precision + recall)) - the harmonic mean of precision and recall.

High precision = not many real emails predicted as spam.
High recall = Predicted most spam emails correctly.

```py
from sklearn.metrics import confusion_matrix, classification_report

knn = KNeighborsClassifier(n_neighbors=8)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

knn.fit(X_train, y_train)

y_pred = knn.predict(X_test)

print(confusion_matrix(y_test, y_pred))
# [[52 7
# 	3 112]]

print(classification_report(y_test, y_pred))

# Note: these numbers are made up for demonstraction purposes.
#							precision    recall  f1-score   support
# 0									1.00      1.00      1.00        52
# 1									1.00      1.00      1.00         7
# avg/total					0.75      0.75      0.75       112
```

## Logistic Regression and the ROC curve

Despite its name, it is actually used in classification problems.

We are exploring the use with binary classification problems.

- Logistic regression outputs probabilities
- If the probably `p` is > 0.5, it is predicted to be `1`
- If the probability `p` is < 0.5, it is predicted to be `0`

Log reg produces a linear decision boundary.

```py
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

logreg = LogisticRegression()

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=42)

logreg.fit(X_train, y_train)
y_reg_pred = logreg.predict(X_test)
```

> By default, Log Reg threshold is 0.5. This is no specific to log reg but also for things such as KNN.

The set of points we get from trying all possible thresholds is call the Receiver Operating Characteristic (ROC) curve.

Classification reports and confusion matrices are great methods to quantitatively evaluate model performance, while ROC curves provide a way to visually evaluate models.

To plot the curve, do the following:

```py
from sklearn.metrics import roc_curve
y_pred_prob = logreg.predict_proba(X_test)[:,1]
# false-positive rate, true-positive rate, thresholds
fpr, tpr, thresholds = roc_curve(y_test, y_pred_prob)

plt.plot([0, 1], [0, 1], 'k--')])
plt.plot(fpr, tpr, label='Logistic Regression')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Logistic Regression ROC Curve')
plt.show()

# Returns 2-column array with probabilities
logreg.predict_proba(X_test)[:,1])
```

## ROC Curve challenge

```py
# Import necessary modules
from sklearn.metrics import roc_curve

# Compute predicted probabilities: y_pred_prob
y_pred_prob = logreg.predict_proba(X_test)[:,1]

# Generate ROC curve values: fpr, tpr, thresholds
fpr, tpr, thresholds = roc_curve(y_test, y_pred_prob)

# Plot ROC curve
plt.plot([0, 1], [0, 1], 'k--')
plt.plot(fpr, tpr)
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve')
plt.show()
```

## Area under the ROC curve

Given the ROC curve, can we extract a metric of interest?

The larger the area under the ROC curve = better model. (Know as AUC = Area Under the Curve)

```py
from sklearn.metrics import roc_auc_score

logreg = LogisticRegression()

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=42)

logreg.fit(X_train, y_train)

y_pred_prob = logreg.predict_proba(X_test)[:,1]
roc_auc_score(y_test, y_pred_prob) # e.g. 0.997
```

We can also compute the AUC using cross-validation:

```py
from sklearn.model_selection import cross_val_score
cv_scores = cross_val_score(logreg, X, y, cv=5, scoring='roc_auc')

print(cv_scores) # eg [ 0.996 0.988  0.988  0.988  0.988]
```

## AUC Cross-Validation challenge

```py
# Import necessary modules
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import cross_val_score

# Compute predicted probabilities: y_pred_prob
y_pred_prob = logreg.predict_proba(X_test)[:,1]

# Compute and print AUC score
print("AUC: {}".format(roc_auc_score(y_test, y_pred_prob)))

# Compute cross-validated AUC scores: cv_auc
cv_auc = cross_val_score(logreg, X, y, cv=5, scoring='roc_auc')

# Print list of AUC scores
print("AUC scores computed using 5-fold cross-validation: {}".format(cv_auc))
```

## Hyperparameter tuning

Previously we saw that:

- When fitting linear regression, we are choosing parameters that fit data the best.
- We had to choose our own alpha for ridge/lasso regression.
- k-Neart Neighbors required us to choose the number of neighbors.

Paramaters like `alpha` and `k` are called hyperparameters. They cannot be learned by fitting the model.

The fundamental key for the right model is to choose the correct hyperparameter. Selecing it by fitting them all separately and seeing how it performs is known as hyperparameter tuning.

It is essential to use cross-validators for tuning our hyperparameters.

## Grid search cross-validation

We choose a grid of possible values that we want try choose for the hyperparameter(s).

Example, if we have two hyperparameters tochoose (ie C and Alpha), we could have a grid of values for each of those hyperparameters.

We could run cross-validation across each combination, and then choose the combination that works the best - this is known as `Grid search`.

```py
from sklearn.model_selection import GridSearchCV

# Based on arg required for each model parameter
# @see https://numpy.org/doc/stable/reference/generated/numpy.arange.html
param_grid = { 'n_neighbors': np.arange(1,50) }
knn = KNeighborsClassifier()

# Grid search cross validation
knn_cv = GridSearchCV(knn, param_grid, cv=5)
knn_cv.fit(X, y)
knn_cv.best_params_ # { 'n_neighbors': 12 }
knn_cv.best_score_ # 0.933
```

## Grid search challenge

```py
# Import necessary modules
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV

# Setup the hyperparameter grid
# Args for log space are (base ** start, base ** stop, num of samples to generate) where base default is 10.0
c_space = np.logspace(-5, 8, 15) # @see https://numpy.org/doc/stable/reference/generated/numpy.logspace.html
param_grid = {'C': c_space}

# Instantiate a logistic regression classifier: logreg
logreg = LogisticRegression()

# Instantiate the GridSearchCV object: logreg_cv
logreg_cv = GridSearchCV(logreg, param_grid, cv=5)

# Fit it to the data
logreg_cv.fit(X, y)


# Print the tuned parameters and score
print("Tuned Logistic Regression Parameters: {}".format(logreg_cv.best_params_))
print("Best score is {}".format(logreg_cv.best_score_))
```

## Tuning with RandomizedSearchCV

> GridSearchCV can be computationally expensive, especially if you are searching over a large hyperparameter space and dealing with multiple hyperparameters.

```py
# Import necessary modules
from scipy.stats import randint
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import RandomizedSearchCV

# Setup the parameters and distributions to sample from: param_dist
param_dist = {"max_depth": [3, None],
              "max_features": randint(1, 9),
              "min_samples_leaf": randint(1, 9),
              "criterion": ["gini", "entropy"]}

# Instantiate a Decision Tree classifier: tree
tree = DecisionTreeClassifier()

# Instantiate the RandomizedSearchCV object: tree_cv
tree_cv = RandomizedSearchCV(tree, param_dist, cv=5)

# Fit it to the data
tree_cv.fit(X, y)

# Print the tuned parameters and score
print("Tuned Decision Tree Parameters: {}".format(tree_cv.best_params_))
print("Best score is {}".format(tree_cv.best_score_))

# Tuned Decision Tree Parameters: {'criterion': 'gini', 'max_depth': 3, 'max_features': 5, 'min_samples_leaf': 2}
# Best score is 0.7395833333333334
```

## Hold-out set reasoning

How can the model perform on data never seen before?

> Using ALL data for cross-validation is not ideal.

It is important to split all data into a training and hold-out set at the beginning of the experiment.

- Perform a grid search cross-validation on the training set.
- Choose best hyperparameters and evaluate on hold-out set.

```py
# Import necessary modules
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV

# Create the hyperparameter grid
c_space = np.logspace(-5, 8, 15)
param_grid = {'C': c_space, 'penalty': ['l1', 'l2']}

# Instantiate the logistic regression classifier: logreg
logreg = LogisticRegression()

# Create train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=42)

# Instantiate the GridSearchCV object: logreg_cv
logreg_cv = GridSearchCV(logreg, param_grid, cv=5)

# Fit it to the training data
logreg_cv.fit(X_train, y_train)

# Print the optimal parameters and best score
print("Tuned Logistic Regression Parameter: {}".format(logreg_cv.best_params_))
print("Tuned Logistic Regression Accuracy: {}".format(logreg_cv.best_score_))

# Tuned Logistic Regression Parameter: {'C': 0.4393970560760795, 'penalty': 'l1'}
# Tuned Logistic Regression Accuracy: 0.7652173913043478
```

## Hold-out set in practice II: Regression

This works with another type of regularization known as `elastic net`. The penalty term for this is `a * L1 + b * L2`.

```py
# Import necessary modules
from sklearn.linear_model import ElasticNet
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split, GridSearchCV

# Create train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=42)

# Create the hyperparameter grid
l1_space = np.linspace(0, 1, 30)
param_grid = {'l1_ratio': l1_space}

# Instantiate the ElasticNet regressor: elastic_net
elastic_net = ElasticNet()

# Setup the GridSearchCV object: gm_cv
gm_cv = GridSearchCV(elastic_net, param_grid, cv=5)

# Fit it to the training data
gm_cv.fit(X_train, y_train)

# Predict on the test set and compute metrics
y_pred = gm_cv.predict(X_test)
r2 = gm_cv.score(X_test, y_test)
mse = mean_squared_error(y_test, y_pred)
print("Tuned ElasticNet l1 ratio: {}".format(gm_cv.best_params_))
print("Tuned ElasticNet R squared: {}".format(r2))
print("Tuned ElasticNet MSE: {}".format(mse))

# Tuned ElasticNet l1 ratio: {'l1_ratio': 0.20689655172413793}
# Tuned ElasticNet R squared: 0.8668305372460283
# Tuned ElasticNet MSE: 10.05791413339844
```
