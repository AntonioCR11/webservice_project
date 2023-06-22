# webservice_project

The Comment Service API is designed to be integrated into software or applications that have content uploading and comment systems. This API provides a set of endpoints that enable the creation, retrieval, updating, and deletion of comments in both text and image forms. It also offers additional features such as a reply comment system, comment translation, word cloud generation from uploaded content, and an explicit image filter.

## Developer:

- [@AntonioCR11](https://www.github.com/AntonioCR11)
- [@marcoruslie](https://www.github.com/marcoruslie)
- [@andrewloekito123](https://www.github.com/andrewloekito123)
- [@DraSelXL ](https://www.github.com/DraSelXL )


## Key Features of the Comment Service API:

1. CRUD Operations for Comments: The API allows users to perform CRUD operations (Create, Read, Update, Delete) on comments. Developers can create new comments, retrieve existing comments, update comment content, and delete comments as needed.
2. Support for Text and Image Comments: The API supports both text-based comments and comments with attached images. Developers can include text descriptions or upload images to enhance user engagement and interaction within the application.
3. Reply Comment System: The API includes functionality for implementing a reply comment system. Users can respond to specific comments, creating threaded conversations and facilitating better engagement and communication among users.
4. Comment Translation: The API offers the ability to translate comments into different languages. This feature enables users from diverse backgrounds to understand and interact with comments in their preferred language, promoting inclusivity and accessibility.
5. Word Cloud Generator: Developers can utilize the API's word cloud generation feature to extract popular keywords or tags from the uploaded content. This can be used for searching purposes, similar to popular tags used on social media platforms like Instagram. The generated word cloud provides insights into trending topics or interests among users.
6. Explicit Image Filter: The API incorporates an explicit image filter that analyzes and detects explicit or inappropriate content within uploaded images. This helps maintain a safe and respectful environment within the application by preventing the dissemination of explicit material.

By integrating the Comment Service API into their software or application, developers can enhance user engagement, improve communication among users, provide multilingual support, generate meaningful insights from user-generated content, and ensure a safe and inclusive commenting experience.

## Third Party API

- [Open AI](https://rapidapi.com/openai-api-openai-api-default/api/openai80/)
- [NSFW Detector](https://rapidapi.com/smartclick-smartclick-default/api/nsfw-images-detection-and-classification/)
- [Translator](https://rapidapi.com/ayfie-ayfie-default/api/translator82/)

## Endpoint:

POSTMAN : [@postman_collection](https://documenter.getpostman.com/view/11549557/2s93z58Q7a)

// Endpoints
1. [POST]  /api/comments
 - Create comment to a specific content id

2. [GET]  /api/comments?onlyDate=...&startDate=...&endDate=...&contentId=...
 - Get a list of paginated comments, with a filter:
  - Only in a certain date (onlyDate)
  - In a range of date  (startDate & endDate)
  - In a specific content  (contentId)
  
3. [GET]  /api/comments/:id
 - Get a specific comment.
  
4. [PUT]  /api/comments/:id
 - Update a comment.

5. [DELETE] /api/comments/:id
 - Delete a specific comment.
 
6. [POST]  /api/comments/:id/replies
 - Reply to a specific comment.

7. [GET]  /api/comments/:id/replies?onlyDate=...&startDate=...&endDate=...
 - Get all replies of a comment, with a filter:
  - Only in a certain date (onlyDate)
  - In a range of date  (startDate & endDate)

8. [GET]  /api/comments/:commentId/replies/:replyId
 - Get a specific reply from a comment.

9. [PUT]  /api/comments/:commentId/replies/:replyId
 - Update a reply of a comment.
 
10. [DELETE] /api/comments/:commentId/replies/:replyId
 - Delete a user reply.
 
11. [GET]  /api/comments/search?keyword=...
 - Search for a specific comments or replies that contains the specific keyword in the query.
 
12. [GET]  /api/users/:userId/comments
 - Get a paginated comments made by a user.
 
13. [GET]  /api/users/:userId/replies
 - Get a paginated replies made by a user.
 
14. [GET]  /api/users/:userId/replies/received
 - Get a paginated replies received by a user.

15. [GET]  /api/users/:userId/comments-and-replies
 - Get a paginated list of all the comments and replies made by a user.
 
16. [GET]  /api/users/:userId/likes
 - Get a paginated list of all the comments and replies that a user liked.
 
17. [POST]  /api/users/:userId/likes
 - Create a like for a user towards a comment
 
18. [GET]  /api/comments/stats?contentId=...
 - Get the data of the highest replied comments, the most liked comments, with a filter:
  - Get a specific highest replied comments and the most liked comments from a content (contentId).

19. [GET]  /api/users/:userId
 - Get a user details.
 
20. [PUT]  /api/users/:userId
 - Update a user details.
 
21. [DELETE] /api/users/:userId
 - Soft delete a user.
