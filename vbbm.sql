CREATE DATABASE IF NOT EXISTS vbbm;

USE vbbm;

CREATE TABLE IF NOT EXISTS voucher (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    bagian VARCHAR(50) NOT NULL,
    tanggal_pengambilan VARCHAR(50) NOT NULL,
    tanggal_pengembalian VARCHAR(50),
    dualima INT NOT NULL,
    limapuluh INT NOT NULL,
    seratus INT NOT NULL
);

CREATE TABLE IF NOT EXISTS histori (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    bagian VARCHAR(50) NOT NULL,
    tanggal VARCHAR(50) NOT NULL,
    dualima INT NOT NULL,
    limapuluh INT NOT NULL,
    seratus INT NOT NULL,
    jenis VARCHAR(50) NOT NULL,
    jumlah INT NOT NULL
);

CREATE TABLE IF NOT EXISTS stnk (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama_kendaraan VARCHAR(50),
    plat_nomor VARCHAR(50),
    tanggal VARCHAR(50),
    dayleft INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50)
);