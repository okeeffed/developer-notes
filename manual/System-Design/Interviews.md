---
menu: System Design
name: Interviews
---

# Interviews

## Steps

Acronym: CASM HDR

1. Clarify requirements
2. API Definition
3. Scale Estimatation
4. Modelling Data
5. High-Level Design
6. Detailed Design
7. Resolve Bottlenecks

## 1. Clarify Requirements

It is always a good idea to ask questions about the exact scope of the problem we are solving.

- Design questions are mostly open-ended, and they don’t have ONE correct answer, that’s why clarifying ambiguities early in the interview becomes critical.
- Candidates who spend enough time to define the end goals of the system always have a better chance to be successful in the interview.
- Also, since we only have 35-40 minutes to design a (supposedly) large system, we should clarify what parts of the system we will be focusing on.

### Twitter Design System Example

- Will users of our service be able to post tweets and follow other people?
- Should we also design to create and display the user’s timeline?
- Will tweets contain photos and videos?
- Are we focusing on the backend only or are we developing the front-end too?
- Will users be able to search tweets?
- Do we need to display hot trending topics?
- Will there be any push notification for new (or important) tweets?

## 2. API Definition

Define the API for the system. This should help establish the exact contract expected.

Examples:

```javascript
postTweet(user_id, tweet_data, tweet_location, user_location, timestamp, ...)

generateTimeline(user_id, current_time, user_location, ...)

markTweetFavorite(user_id, tweet_id, timestamp, ...)
```

## 3. Scale Estimation

It is always a good idea to estimate the scale of the system we’re going to design. This will also help later when we will be focusing on scaling, partitioning, load balancing and caching.

1. What scale is expected from the system (e.g., number of new tweets, number of tweet views, number of timeline generations per sec., etc.)?
2. How much storage will we need? We will have different numbers if users can have photos and videos in their tweets.
3. What network bandwidth usage are we expecting? This will be crucial in deciding how we will manage traffic and balance load between servers.

## 4. Modelling Data

Defining the data model early will clarify how data will flow among different components of the system. Later, it will guide towards data partitioning and management. The candidate should be able to identify various entities of the system, how they will interact with each other, and different aspect of data management like storage, transportation, encryption, etc.

| Entity         | Attributes                                                      |
| -------------- | --------------------------------------------------------------- |
| User           | UserID, Name, Email, DoB, CreationData, LastLogin, etc.         |
| Tweet          | TweetID, Content, TweetLocation, NumberOfLikes, TimeStamp, etc. |
| UserFollowing  | UserdID1, UserID2                                               |
| FavoriteTweets | UserID, TweetID, TimeStamp                                      |

Which database system should we use? Will NoSQL like Cassandra best fit our needs, or should we use a MySQL-like solution? What kind of block storage should we use to store photos and videos?

## 5. High-Level Design

Draw a block diagram with 5-6 boxes representing the core components of our system. We should identify enough components that are needed to solve the actual problem from end-to-end.

For Twitter, at a high-level, we will need multiple application servers to serve all the read/write requests with load balancers in front of them for traffic distributions. If we’re assuming that we will have a lot more read traffic (as compared to write), we can decide to have separate servers for handling these scenarios. On the backend, we need an efficient database that can store all the tweets and can support a huge number of reads. We will also need a distributed file storage system for storing photos and videos.

```shell
# Twitter layout
Clients => Load Balancer => Server <=> Database
                         => Server <=> File System
                         => Server
```

## 6. Detailed Design

Dig deeper into two or three components; interviewer’s feedback should always guide us what parts of the system need further discussion. We should be able to present:

1. Different approaches
2. Their pros and cons
3. Explain why we will prefer one approach on the other.

Remember there is no single answer, the only important thing is to consider tradeoffs between different options while keeping system constraints in mind.

### Example questions to think about

- Since we will be storing a massive amount of data, how should we partition our data to distribute it to multiple databases? Should we try to store all the data of a user on the same database? What issue could it cause?
- How will we handle hot users who tweet a lot or follow lots of people?
- Since users’ timeline will contain the most recent (and relevant) tweets, should we try to store our data in such a way that is optimized for scanning the latest tweets?
- How much and at which layer should we introduce cache to speed things up?
  What components need better load balancing?
