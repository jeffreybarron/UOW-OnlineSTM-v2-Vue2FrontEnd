## Dev Info

http://localhost:3000/ostm/resources/studies/20200103-jeffbarron-01.json

http://localhost:8080/ostm/begin?studyName=20200103-jeffbarron-01&PROLIFIC_PID=f7bc8a4d-e903-4004-97fe-64a393cab003&STUDY_ID=Classroom&SESSION_ID=study

http://localhost:8080/ostm/API/issuecode?studyName=20200103-jeffbarron-01&PROLIFIC_PID=f7bc8a4d-e903-4004-97fe-64a393cab003&STUDY_ID=Classroom&SESSION_ID=study

API/issueCode request.body
{
"studyName": "20200103-jeffbarron-01",
"PROLIFIC_PID""f7bc8a4d-e903-4004-97fe-64a393cab003",
"STUDY_ID":"Classroom"
"SESSION_ID"="study"
}

## 20200206 1812 0.0.1 complete

recieves query string, opens to confimation > consent > instruction > steps through sets, blocks, stimuli then allows for answers and finishs on completion page.

## 20200206 0.0.2

display consent text
display intruciont text
Pass through query string to load study by props

## 20200215 0.0.3

runtime shuffle feature works

## 20200216 0.0.4

build completion code provider, and auto redirect
answers are saved properly

## 20200216 0.0.5

add timed pagedirect to ostmCompletion.vue

## 20200216 0.1.0

format to be near that of previos version
added home page "\"
added ostm home page "\ostm

### To do

Add stimulus counter label to study ticker page
add + next to start button for user to know where to look
display popup at the end of blocks if there is one.
fix study input and button focus problem
Add error handling
Code Review
trial deploy (for documenting not actual deployment)

Rebuild management front end

## Begin API Review... New Project

note changes in current api build from production
strip out API extras.
redocument build process for API
trial deploy new front and back of front end

load first, then add properties
