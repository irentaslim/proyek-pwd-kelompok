-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table db_penjualan.produk
CREATE TABLE IF NOT EXISTS `produk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sku` varchar(50) NOT NULL,
  `nama_produk` varchar(150) NOT NULL,
  `harga` decimal(12,2) NOT NULL,
  `stok` int NOT NULL DEFAULT '0',
  `deskripsi` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_penjualan.produk: ~5 rows (approximately)
INSERT INTO `produk` (`id`, `sku`, `nama_produk`, `harga`, `stok`, `deskripsi`, `created_at`) VALUES
	(1, 'PRD-001', 'Laptop Asus Vivobook 14', 8500000.00, 12, 'Laptop harian prosesor Intel Core i5 RAM 8GB SSD 512GB', '2026-11-09 02:38:55'),
	(2, 'PRD-002', 'Mouse Wireless Logitech M170', 145000.00, 45, 'Mouse nirkabel 2.4GHz ergonomis dengan baterai AA', '2026-11-09 02:38:55'),
	(3, 'PRD-003', 'Keyboard Mechanical Keychron K2', 1250000.00, 8, 'Keyboard mechanical wireless Gateron Brown switch', '2026-11-09 02:38:55'),
	(4, 'PRD-004', 'Headset Gaming SteelSeries Arctis 3', 890000.00, 15, 'Headset gaming 7.1 surround sound mic noise-canceling', '2026-11-09 02:38:55'),
	(5, 'PRD-005', 'Monitor LED LG 24 Inch Full HD', 1750000.00, 6, 'Monitor IPS 75Hz AMD FreeSync bezel tipis', '2026-11-09 02:38:55');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
