# Problem 6: Architecture

This document specifies the backend module responsible for managing user scores and providing a live-updating top 10 scoreboard.

The system has the following responsibilities:

- Receive a request when a user completes an action.
- Authenticate and authorize the user.
- Validate that the action is legitimate and can be rewarded.
- Prevent duplicate or unauthorized score increases.
- Update the user's score atomically.
- Return the current top 10 users.

The client must never be trusted to determine the score value. Score calculation and authorization must be performed on the server.

## Requirements

Functional Requirements

- The website displays the top 10 users based on their scores.
- The scoreboard should be updated in real time.
- Completing a valid action increases the user's score.
- Completing an action triggers an API request to the backend.
- Unauthorized users must not be able to increase their scores.

Non-Functional Requirements

- Prevent duplicate score rewards.
- Handle concurrent score updates safely.
- Keep score updates consistent with action completion.

## Main Flow

When a user completes an action:

- The website sends an authenticated request to the API.
- The API authenticates the user.
- The API verifies that the user is authorized to perform the action.
- The API validates that the action is eligible for a score reward.
- The API checks whether the action has already been completed by the user.
- A database transaction records the action completion and increments the user's score.
- The server publishes a ScoreUpdated event.

## API Specification
### Get Top 10 Scoreboard
Endpoint: 

```GET /v1.0/scoreboard```

Response: 
```json
{
    "code": 200,
    "message": "OK",
    "data": [
        {
            "rank": 1, 
            "userId": "acc1ec0e-73f5-4cce-bf4b-4d77d8d4c73a", 
            "username": "rizkylaleur1988",
            "score": 100
        },
        {
            "rank": 2, 
            "userId": "a1062f81-9926-4310-b1d9-4c9979f6672b", 
            "username": "laleur1988",
            "score": 99
        }
    ]
}
```

The API returns a maximum of 10 users ordered by:
- score DESC
- updatedAt ASC as a deterministic tie breaker

### Complete Action
Endpoint: 

```POST /v1.0/actions/{actionId}/complete```

Authentication:

```Authorization: Bearer <accessToken>```

Request: 

```json
{
    "uuid": "cfb8e310-e3a1-4a84-b6bf-1c38b185719f"
}
```
Response: 
```json
{
    "code": 200,
    "message": "OK",
    "data": {
        "actionId": "submit-score",
        "scoreAwarded": 10,
        "totalScore": 100
    }
}
```

## Preventing Duplicate Score Rewards

A malicious user may attempt to submit the same action repeatedly:

```
Request 1 -> submit-score -> +10
Request 2 -> submit-score -> +10
Request 2 -> submit-score -> +10
```
The backend must ensure that an action can only be rewarded according to its business rules. A database constraint should be used as an additional protection.

```UNIQUE (userId, actionId)```

## Database Design
```
create table users {
    id varchar(36) not null,
    username varchar(255) not null,
    createdAt bigint unsigned not null,
    updatedAt bigint unsigned not null,
    primary key (id),
    unique (username)
};
create table userScores {
    userId varchar(36) not null,
    score integer not null,
    updatedAt bigint unsigned not null,
    primary key (userId),
    constraint fk_user_userScores foreign key (userId) references users (id)
};
create table actionCompletions {
    id bigint unsigned not null auto_increment,
    userId varchar(36) not null,
    actionId varchar(50) not null,
    uuid varchar(36) not null,
    scoreAwarded integer not null,
    completedAt bigint unsigned not null,
    primary key (id),
    unique (userId, actionId),
    unique (userId, uuid),
    constraint fk_user_actionCompletions foreign key (userId) references users (id)
};
```

## Score Update Transaction
The score update and action completion should be handled in the same database transaction.

```
BEGIN TRANSACTION
1. Validation action
2. Check/create action completion (actionCompletions)
3. Calculate score
4. Record action completion (actionCompletions)
5. Increment user score (userScores)
COMMIT
if any step fails:
ROLLBACK
```

## Live Scoreboard
The scoreboard should not require the browser to continuously poll the API. Instead, the backend can use Server-Sent Events (SSE) for server-to-client updates.

Event: 

```scoreboard.updated```

Response:
```json
{
    "code": 200,
    "message": "OK",
    "data": [
        {
            "rank": 1, 
            "userId": "acc1ec0e-73f5-4cce-bf4b-4d77d8d4c73a", 
            "username": "rizkylaleur1988",
            "score": 100
        },
        {
            "rank": 2, 
            "userId": "a1062f81-9926-4310-b1d9-4c9979f6672b", 
            "username": "laleur1988",
            "score": 99
        }
    ]
}
```