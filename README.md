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
- Shoppee
- Tokopedia
- Midtrans


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

Developer:
- Upload File
	- Foto KTP


### Use Case:
=============

Developer:
1. Login Akun Developer
	- Login akun developer untuk melihat paduan menggunakan API webservice ini.
	
2. Register Akun Developer
	- Register akun developer untuk mendapatkan API Key untuk menggunakan API webservice ini.
	
3. Update Akun Developer
	- Ganti password

4. Ambil barang
	- Mendapatkan data barang yang diinginkan.
	
5. Ambil daftar kategori
	- Lihat semua kategori yang ada di API ini.
	
6. Ambil daftar voucher
	- Lihat semua voucher yang ditemukan di Third Party API yang digunakan di API ini.

7. Ambil daftar diskon
	- Lihat semua diskon yang ditemukan di Third Party API yang digunakan di API ini.

Customer:
1. Login
	- Customer login ke aplikasi developer

2. Register
	- Customer register ke aplikasi developer

3. Cari barang

4. Cari barang yang berdiskon

5. Cari Voucher

6. Cari barang berdasarkan kategori

7. Melihat daftar kategori

8. Subscribe ke aplikasi developer


### Endpoint:
=============

Developer:
1. [POST]	Login
2. [POST]	Register
3. [PUT]	Change Password
4. [GET]	Ambil data barang (gratis)
5. [GET]	Ambil data barang lebih detail (bayar)
6. [GET]	Ambil daftar kategori
7. [GET]	Ambil daftar voucher
8. [GET]	Ambil daftar diskon
9. [POST]	Bayar subscription

Customer:
1. [POST]	Login
2. [POST]	Register
1. [GET]	Cari barang (gratis)
2. [GET]	Cari barang (bayar)
3. [GET]	Cari barang berdasarkan kategori (gratis)
4. [GET]	Cari barang berdasarkan kategori (bayar)
5. [GET]	Lihat daftar kategori
6. [GET]	Lihat daftar diskon
7. [GET]	Lihat daftar voucher
8. [POST]	Subscribe aplikasi developer
