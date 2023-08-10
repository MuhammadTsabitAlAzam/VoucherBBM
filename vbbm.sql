CREATE DATABASE IF NOT EXISTS vbbm;

USE vbbm;

CREATE TABLE IF NOT EXISTS input_voucher (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    bagian VARCHAR(50) NOT NULL,
    tanggal_pengambilan VARCHAR(50) NOT NULL,
    tanggal_pengembalian VARCHAR(50),
    dualima INT NOT NULL,
    limapuluh INT NOT NULL,
    seratus INT NOT NULL
);

CREATE TABLE IF NOT EXISTS history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    bagian VARCHAR(50) NOT NULL,
    tanggal VARCHAR(50) NOT NULL,
    dualima INT NOT NULL,
    limapuluh INT NOT NULL,
    seratus INT NOT NULL,
    jenis VARCHAR(50) NOT NULL
);
