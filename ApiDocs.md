# Attributes

## AttachmentInfo
```
"FileSetId": <number>,
"Files": [<FileInfo>]
```

## Answer
```
"QuestionId": <number>,
"Text": <string>,
"AnswerId": <number>
```

## AnswerPostData
```
"AnswerText": <string>,
"QuestionId": <number>
```

## CpdUserInfo
```
"UserId": <number:D2LID>,
"ManagerUserId": <number:D2LID>,
"JobTitle": <string>,
"DisplayName": <string>,
"HasDirectReports": <boolean>,
```

## DismissedAward
```
"AwardId": <number>,
"UserId": <number:D2LID>,
```

## FileInfo
```
"Id": <number>,
"Name": <string>,
"Size": <number>,
"Href": <string>
```

## JobTitleInfo
```
"HasDefaults": <boolean>,
"JobTitle": <string>
```

## Method
```
"Id": <number>,
"InUse": <boolean>,
"Name": <string>,
"SortOrder": <number>
```

## PagedRecordSummary
```
"RecordSummaries": [<RecordSummary>],
"PageNumber": <number>,
"PageSize": <number>,
"TotalCount": <number>,
"TotalPages": <number>
```

## Progress
```
"Denominator": <number>,
"Numerator": <number>
```

## Record
```
"Id": <number>,
"Name": <string>,
"User": <number>,
"Subject": <Subject>,
"Method": <Method>,
"IsStructured": <boolean>,
"AwardId": <number>|null,
"AwardOrgUnitId": <number>|null,
"DateCompleted": <UtcDateTime>,
"Grade": <decimal>|null,
"GradeObjectId": <number>|null,
"CreditMinutes": <number>
"Attachments": <AttachmentInfo>,
"Answers": [<Answer>]
```

## RecordPostData
```
"Name": <string>,
"SubjectId": <string>,
"IsStructured": <boolean>,
"MethodId": <number>,
"CreditMinutes": <number>,
"IssuedAwardId": <number>|null,
"Grade": <number>|null,
"Answers": [<AnswerPostData>],
"DateCompleted": <UtcDateTime>
```

## RecordSummary
```
"RecordId": <number>,
"RecordName": <string>,
"SubjectName": <string>,
"MethodName": <string>,
"IsStructured": <boolean>,
"CreditMinutes": <number>,
"DateCompleted": <UTCDateTime>
```

## Subject
```
"Id": <number>,
"InUse": <boolean>,
"Name": <string>,
"SortOrder": <number>
```

## SubjectTarget
```
"StructuredMinutes": <number>,
"Subject": <Subject>,
"UnstructuredMinutes": <number>
```

## SubjectTargetPostData
```
"StructuredMinutes": <number>,
"SubjectId": <number>,
"UnstructuredMinutes": <number>
```

## Target
```
"JobTitle": <number>|null,
"StartDate": <UtcDateTime>,
"Subjects": [<SubjectTarget>],
"TargetId": <number>,
"Type": <string>,
"UserId": <number>|null
```

## TargetProgress
```
"EndDate": <UtcDateTime>|null,
"StartDate": <UtcDateTime>|null,
"Structured": <Progress>,
"SubjectProgress": [<SubjectProgress>],
"Unstructured": <Progress>,
```

## Question
```
"Id": <number>,
"InUse": <boolean>,
"QuestionText": <string>,
"SortOrder": <number>
```

## QuestionPostData
```
"QuestionText": <string>
```

## SortOrderPostData
```
"NewSortOrder": <number>
```

## SubjectMethodPostData
```
"Name": <string>
```

# Actions

# Method

## DELETE /d2l/api/customization/cpd/(version)/method/(methodId)
Delete an existing method
### Parameters
- version (D2LVERSION) – API version
- methodId (Number) - Method ID
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3

## GET /d2l/api/customization/cpd/(version)/method
Retrieve the list of methods
### Parameters
- version (D2LVERSION) – API version
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.19.12
### Return
- This action returns a JSON array of Method data blocks

## GET /d2l/api/customization/cpd/(version)/method/(methodId)
Retrieve a single method
### Parameters
- version (D2LVERSION) – API version
- methodId (Number) - Method ID
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.19.12
### Return
- This action returns a Method JSON block or null

## POST /d2l/api/customization/cpd/(version)/method
Create a new Method
### Parameters
- version (D2LVERSION) – API version
### JSON Parameters
- SubjectMethodPostData - data for a new method
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3
### Return
- This action returns a Method JSON block for the newly created method

## PUT /d2l/api/customization/cpd/(version)/method/(methodId)
Update an existing method
### Parameters
- version (D2LVERSION) – API version
- methodId (Number) - Method ID
### JSON Parameters
- SubjectMethodPostData - data for a new method
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3
### Return
- This action returns a Method JSON block for the updated method

## PUT /d2l/api/customization/cpd/(version)/method/(methodId)/sortorder
Update an existing Method sort order
### Parameters
- version (D2LVERSION) – API version
- methodId (Number) - Method ID
### JSON Parameters
- SortOrderPostData - data to update the method sort order
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3

# Pending

## DELETE /d2l/api/customization/cpd/(version)/pending/dismiss/(awardId)
Removes the dismissed status of a record, thereby returning the record to a pending state
### Parameters
- version (D2LVERSION) – API version
- awardId (Number) - Award ID
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.5

## POST /d2l/api/customization/cpd/(version)/pending/dismiss/(awardId)
Dismiss a pending record
### Parameters
- version (D2LVERSION) – API version
- awardId (Number) - Award ID
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.5
### Return
- This action returns a DismissedAward JSON block for the dismissed pending record

# Question

## DELETE /d2l/api/customization/cpd/(version)/question/(questionId)
Delete an existing question
### Parameters
- version (D2LVERSION) – API version
- questionId (Number) - Question ID
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3

## GET /d2l/api/customization/cpd/(version)/question
Retrieve the list of questions
### Parameters
- version (D2LVERSION) – API version
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3
### Return
- This action returns a JSON array of Question data blocks

## GET /d2l/api/customization/cpd/(version)/question/(questionId)
Retrieve a single question
### Parameters
- version (D2LVERSION) – API version
- questionId (Number) - Question ID
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3
### Return
- This action returns a Question JSON block or null

## POST /d2l/api/customization/cpd/(version)/question
Create a question
### Parameters
- version (D2LVERSION) – API version
### JSON Parameters
- QuestionPostData - data for a new question
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3
### Return
- This action returns a Question JSON block for the newly created question

## PUT /d2l/api/customization/cpd/(version)/question/(questionId)
Update an existing question
### Parameters
- version (D2LVERSION) – API version
- questionId (Number) - Question ID
### JSON Parameters
- QuestionPostData - data to update the question
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3
### Return
- This action returns a Question JSON block for the updated question

## PUT /d2l/api/customization/cpd/(version)/question/(questionId)/sortorder
Update an existing Method sort order
### Parameters
- version (D2LVERSION) – API version
- questionId (Number) - Question ID
### JSON Parameters
- SortOrderPostData - data to update the method sort order
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3

# Record

## DELETE /d2l/api/customization/cpd/(version)/record/(recordId)
Delete a record
### Parameters
- version (D2LVERSION) – API version
- recordId (number) - Record Id
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.19.12

## GET /d2l/api/customization/cpd/(version)/record
Retrieve the list of records
### Parameters
- version (D2LVERSION) – API version
### Query Parameters
- method (Number) - Optional. Method to look for
- name (String) - Optional. Record Name to look for
- pageNumber (Number) - Optional. Page number to retrieve
- pageSize (Number) - Optional. Number of elements per page
- subject (Number) - Optional. Subject to look for
- startDate (UTCDateTime) - Optional. Retrieve records with a date time that is greater than or equal this
- endDate (UTCDateTime) - Optional. Retrieve records with a date time that is less than or equal this
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.19.12
### Return
- This action returns a PagedRecordSummary JSON block.

## GET /d2l/api/customization/cpd/(version)/record/user/(userId)
Retrieve the list of records for a user
### Parameters
- version (D2LVERSION) – API version
- userId (Number) - User ID
### Query Parameters
- method (Number) - Optional. Method to look for
- name (String) - Optional. Record Name to look for
- pageNumber (Number) - Optional. Page number to retrieve
- pageSize (Number) - Optional. Number of elements per page
- subject (Number) - Optional. Subject to look for
- startDate (UTCDateTime) - Optional. Retrieve records with a date time that is greater than or equal this
- endDate (UTCDateTime) - Optional. Retrieve records with a date time that is less than or equal this
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.1
### Return
- This action returns a PagedRecordSummary JSON block

## GET /d2l/api/customization/cpd/(version)/record/(recordId)
Get a record
### Parameters
- version (D2LVERSION) – API version
- recordId (number) - Record Id
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.19.12
### Return
- This action returns a Record JSON block

## GET /d2l/api/customization/cpd/(version)/record/(recordId)/attachment/(attachmentId)
Get a record attachment
### Parameters
- version (D2LVERSION) – API version
- recordId (number) - Record Id
- attachmentId (number) - Attachment Id
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.20.1
### Return
- This action returns an attachment file

## POST /d2l/api/customization/cpd/(version)/record
Create a new record
### Parameters
- version (D2LVERSION) – API version
### JSON Parameters
- record (RecordPostData) - data for a new record
- file (FileBlob) - attachment data
### Status Codes
- 200 OK – Action succeeded
- 400 Bad Request
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.19.12
### Return
- This action returns a Record JSON block for the newly created record
### Input
The record and file data should be provided as formdata; up to 20 files can be uploaded at a time

## POST /d2l/api/customization/cpd/(version)/record/user/(userId)
Create a new record for a user
### Parameters
- version (D2LVERSION) – API version
- userId (Number) - User ID
### JSON Parameters
- record (RecordPostData) - data for a new record
- file (FileBlob) - attachment data
### Status Codes
- 200 OK – Action succeeded
- 400 Bad Request
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.1
### Return
- This action returns a Record JSON block for the newly created record
### Input
The record and file data should be provided as formdata; up to 20 files can be uploaded at a time

## PUT /d2l/api/customization/cpd/(version)/record/(recordId)
Update an existing record
### Parameters
- version (D2LVERSION) – API version
- recordId (number) - Record Id
### JSON Parameters
- record (RecordPostData) - data for a new record
- file (FileBlob) - Optional. attachment data
- deletedFiles ([number]) - Optional. list of deleted file ids
### Status Codes
- 200 OK – Action succeeded
- 400 Bad Request
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.19.12
### Input
The record and file data should be provided as formdata; up to 20 files can be uploaded at a time

# Report

## GET /d2l/api/customization/cpd/(version)/report
Get a record report
### Parameters
- version (D2LVERSION) – API version
### Query Parameters
- method (Number) - Optional. Method to look for
- recordName (String) - Optional. Record Name to look for
- subject (Number) - Optional. Subject to look for
- startDate (UTCDateTime) - Optional. Retrieve records with a date time that is greater than or equal this
- endDate (UTCDateTime) - Optional. Retrieve records with a date time that is less than or equal this
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.20.2
### Return
- This action returns a csv file

## GET /d2l/api/customization/cpd/(version)/report/user/(userId)
Get a user's record report
### Parameters
- version (D2LVERSION) – API version
- userId (number) - User Id
### Query Parameters
- method (Number) - Optional. Method to look for
- recordName (String) - Optional. Record Name to look for
- subject (Number) - Optional. Subject to look for
- startDate (UTCDateTime) - Optional. Retrieve records with a date time that is greater than or equal this
- endDate (UTCDateTime) - Optional. Retrieve records with a date time that is less than or equal this
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.20.2
### Return
- This action returns a JSON array of Record data blocks

## GET /d2l/api/customization/cpd/(version)/report/csv
Get a csv record report
### Parameters
- version (D2LVERSION) – API version
### Query Parameters
- method (Number) - Optional. Method to look for
- recordName (String) - Optional. Record Name to look for
- subject (Number) - Optional. Subject to look for
- startDate (UTCDateTime) - Optional. Retrieve records with a date time that is greater than or equal this
- endDate (UTCDateTime) - Optional. Retrieve records with a date time that is less than or equal this
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.20.4
### Return
- This action returns a JSON array of Record data blocks

## GET /d2l/api/customization/cpd/(version)/report/csv/user/(userId)
Get a user's csv record report
### Parameters
- version (D2LVERSION) – API version
- userId (number) - User Id
### Query Parameters
- method (Number) - Optional. Method to look for
- recordName (String) - Optional. Record Name to look for
- subject (Number) - Optional. Subject to look for
- startDate (UTCDateTime) - Optional. Retrieve records with a date time that is greater than or equal this
- endDate (UTCDateTime) - Optional. Retrieve records with a date time that is less than or equal this
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.20.4
### Return
- This action returns a JSON array of Record data blocks

# Subject

## DELETE /d2l/api/customization/cpd/(version)/subject/(subjectId)
Delete an existing subject
### Parameters
- version (D2LVERSION) – API version
- subjectId (Number) - Subject ID
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3

## GET /d2l/api/customization/cpd/(version)/subject
Retrieve the list of subjects
### Parameters
- version (D2LVERSION) – API version
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.19.12
### Return
- This action returns a JSON array of Subject data blocks

## GET /d2l/api/customization/cpd/(version)/subject/(subjectId)
Retrieve a single subject
### Parameters
- version (D2LVERSION) – API version
- subjectId (Number) - Subject ID
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.19.12
### Return
- This action returns a Subject JSON block or null

## POST /d2l/api/customization/cpd/(version)/subject
Create a new Subject
### Parameters
- version (D2LVERSION) – API version
### JSON Parameters
- SubjectMethodPostData - data for a new subject
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3
### Return
- This action returns a Subject JSON block for the newly created subject

## PUT /d2l/api/customization/cpd/(version)/subject/(subjectId)
Update an existing subject
### Parameters
- version (D2LVERSION) – API version
- subjectId (Number) - Subject ID
### JSON Parameters
- SubjectMethodPostData - data for a new subject
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3
### Return
- This action returns a Subject JSON block for the updated subject

## PUT /d2l/api/customization/cpd/(version)/subject/(subjectId)/sortorder
Update an existing Subject sort order
### Parameters
- version (D2LVERSION) – API version
- subjectId (Number) - Subject ID
### JSON Parameters
- SortOrderPostData - data to update the subject sort order
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.20.3

# Target

## GET /d2l/api/customization/cpd/(version)/target/user
Retrieve the user targets
### Parameters
- version (D2LVERSION) – API version
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.1
### Return
- This action returns a Target JSON blocks

## GET /d2l/api/customization/cpd/(version)/target/job
Retrieve the job targets
### Parameters
- version (D2LVERSION) – API version
### Query Parameters
- jobTitle (string) - Job Title
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.1
### Return
- This action returns a Target JSON blocks

## GET /d2l/api/customization/cpd/(version)/target/jobtitles
Retrieve the list of job titles
### Parameters
- version (D2LVERSION) – API version
### Query Parameters
- pageNumber (number) - Optional. page number to retrieve
- searchText (string) - Optional. job title search text
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.1
### Return
- This action returns a JSON array of JobTitleInfo data blocks

## GET /d2l/api/customization/cpd/(version)/target/progress
Retrieve the target progress information
### Parameters
- version (D2LVERSION) – API version
### Query Parameters
- method (Number) - Optional. Method to look for
- recordName (String) - Optional. Record Name to look for
- subject (Number) - Optional. Subject to look for
- startDate (UTCDateTime) - Optional. Retrieve records with a date time that is greater than or equal this
- endDate (UTCDateTime) - Optional. Retrieve records with a date time that is less than or equal this
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.20.1
### Return
- This action returns a TargetProgress JSON block

## GET /d2l/api/customization/cpd/(version)/target/progress/user/userId
Retrieve a User's target progress information
### Parameters
- version (D2LVERSION) – API version
- userId (number) - user Id
### Query Parameters
- method (Number) - Optional. Method to look for
- recordName (String) - Optional. Record Name to look for
- subject (Number) - Optional. Subject to look for
- startDate (UTCDateTime) - Optional. Retrieve records with a date time that is greater than or equal this
- endDate (UTCDateTime) - Optional. Retrieve records with a date time that is less than or equal this
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.20.2
### Return
- This action returns a TargetProgress JSON block

## POST /d2l/api/customization/cpd/(version)/target/user
Create a user target
### Parameters
- version (D2LVERSION) – API version
### JSON Parameters
- SubjectTargetPostData - data for a new target
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.1
### Return
- This action returns a SubjectTarget JSON block for the created target

## POST /d2l/api/customization/cpd/(version)/target/job
Create a job target
### Parameters
- version (D2LVERSION) – API version
### Query Parameters
- jobTitle (string) - Job Title
### JSON Parameters
- SubjectTargetPostData - data for a new target
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.1
### Return
- This action returns a SubjectTarget JSON block for the created target

## POST /d2l/api/customization/cpd/(version)/target/user/startdate
Create a job target
### Parameters
- version (D2LVERSION) – API version
### JSON Parameters
- UtcDateTime - the start date of the job target
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.1
### Return
- This action returns a Target JSON block for the created target

## POST /d2l/api/customization/cpd/(version)/target/job/startdate
Create a job target
### Parameters
- version (D2LVERSION) – API version
### Query Parameters
- jobTitle (string) - Job Title
### JSON Parameters
- UtcDateTime - the start date of the job target
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.20.1
### Return
- This action returns a Target JSON block for the created target



# Team

## GET /d2l/api/customization/cpd/(version)/team
Retrieve the employees on a manager's team
### Parameters
- version (D2LVERSION) – API version
### Query Parameters
- searchTerm (string) - Optional. User name to look for
- managingUserId (int) - Optional. Manager whose team to retrieve
- pageNumber (Number) - Optional. page number
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
### API Versions
- 1.0 - Route first appeared in LMS v20.19.12
### Return
- This action returns a JSON array of CpdUserInfo data blocks

# UserName

## GET /d2l/api/customization/cpd/(version)/username/user
Retrieve a username
### Parameters
- version (D2LVERSION) – API version
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.20.2
### Return
- This action returns a string

## GET /d2l/api/customization/cpd/(version)/username/user/(userId)
Retrieve a user's username
### Parameters
- version (D2LVERSION) – API version
- UserId (number) - User Id
### Status Codes
- 200 OK – Action succeeded
- 403 Forbidden
- 404 Not Found
### API Versions
- 1.0 - Route first appeared in LMS v20.20.1
### Return
- This action returns a string
