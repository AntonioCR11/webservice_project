# webservice_project

Web Service Pembanding Barang, Stok, dan Harga Antar Online Shop

### Developer:
==============
- 220116918 - Ian Nathaneil William (Ketua)
- 220116901 - Albertus Marco Penolla Ruslie
- 220116904 - Andrew Anderson
- 220116906 - Antonio Christopher

### Deskripsi API:
==================

Web Service ini bertujuan untuk memudahkan pengguna API untuk mencari barang di berbagai Online Shop. Target pengguna API ini adalah developer yang akan membuat sebuah aplikasi yang membutuhkan data barang dari berbagai sumber. Dengan menggunakan API ini, pengguna dapat mendapatkan nama, harga, toko, stock, dan informasi lainnya yang berhubungan dengan barang tersebut di sebuah Online Shop. Terdapat 2 versi saat menggunakan API ini, yaitu versi gratis dan berbayar. Dengan versi gratis, informasi yang didapatkan dari API ini terbatas, seperti hanya nama, toko dan harga saja. Tetapi dengan versi berbayar, maka akan mendapatkan informasi yang lebih lengkap, seperti diskon, dan voucher.

Developer adalah orang yang akan menggunakan API kita dalam aplikasi mereka.
Customer adalah orang yang akan mencari/membandingkan barang dalam API kita.


### Third Party API
===================
- Open AI
- NSFW images detection and classification
- Google Translate


Contoh aplikasi yang dapat menggunakan API ini:
1. Aplikasi comparator barang antar online shop. Contoh: https://www.userbenchmark.com/PCBuilder
2. Add-on pencari diskon untuk barang yang dicari.


### Business Model:
===================
- Subscription Model:
	- Rp. 30k/bulan
	- Rp. 50k/3 bulan
	- Rp. 90k/6 bulan
	- Rp. 150k/tahun

### System Scope:
=================

- Upload File
	- Komen Foto 
 	- komen Gif 


### Endpoint:
=============
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
