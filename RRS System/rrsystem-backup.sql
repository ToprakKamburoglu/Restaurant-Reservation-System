-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: restaurant-reservation-system
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cuisine`
--

DROP TABLE IF EXISTS `cuisine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuisine` (
  `cuisine_id` int NOT NULL AUTO_INCREMENT,
  `cuisine_name` varchar(200) DEFAULT NULL,
  `cuisine_activeness` tinyint DEFAULT '1',
  `cuisine_creation` datetime DEFAULT NULL,
  `cuisine_deletion` datetime DEFAULT NULL,
  PRIMARY KEY (`cuisine_id`),
  UNIQUE KEY `cuisine_id` (`cuisine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuisine`
--

LOCK TABLES `cuisine` WRITE;
/*!40000 ALTER TABLE `cuisine` DISABLE KEYS */;
INSERT INTO `cuisine` VALUES (12,'Turkish',1,'2025-03-21 10:00:00',NULL),(13,'Italian',1,'2025-03-21 11:00:00',NULL),(14,'Mexican',1,'2025-03-21 12:00:00',NULL),(15,'Greek',1,'2025-03-21 13:00:00',NULL),(16,'Spanish',1,'2025-03-21 14:00:00',NULL),(17,'Japanese',1,'2025-03-21 15:00:00','2025-03-26 17:24:42'),(18,'Indian',1,'2025-03-21 16:00:00','2025-03-26 17:15:17'),(19,'American',1,'2025-03-21 17:00:00','2025-04-06 19:01:22'),(20,'Mix',1,'2025-03-21 18:00:00','2025-03-26 17:24:03'),(21,'Fast Food',1,'2025-03-21 19:00:00','2025-04-07 06:16:53'),(22,'French',1,'2025-03-21 20:00:00','2025-04-07 06:16:54'),(23,'Moroccan',1,'2025-03-22 17:31:44',NULL),(25,'German',1,'2025-04-06 19:02:22',NULL);
/*!40000 ALTER TABLE `cuisine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `c_user_id` int DEFAULT NULL,
  `c_restaurant_id` int DEFAULT NULL,
  `active_payment` int DEFAULT NULL,
  `api_key` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_id` (`customer_id`),
  KEY `fk_customer_user` (`c_user_id`),
  KEY `fk_customer_restaurant` (`c_restaurant_id`),
  KEY `fk_customer_payment` (`active_payment`),
  CONSTRAINT `fk_customer_payment` FOREIGN KEY (`active_payment`) REFERENCES `payment` (`payment_id`),
  CONSTRAINT `fk_customer_restaurant` FOREIGN KEY (`c_restaurant_id`) REFERENCES `restaurant-info` (`restaurant_id`),
  CONSTRAINT `fk_customer_user` FOREIGN KEY (`c_user_id`) REFERENCES `user-info` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (3,14,15,3,'g2vYCegc87e4NjrMA4Ix4xq2Z5e22S4jCF6uhj12JzjeVBhkiSjaxln9de2sMcPH'),(4,15,14,4,'Pxlk2ZDYNsayOYtLfwQzOEEDJHo0z6btoTKdZKBPEwBEgvd7R47s6rLX2NXxAKwp'),(9,13,20,5,'vj3czsT_KwOc5xkiPrdK6RN8znt5qXNXpirhQpsepafVj26qHdwuf3ua-TAuEo5j'),(10,16,16,6,'53ip7YQOLd8J0J1YWTvSTqsWRDMYxURfFMTjVANR6D17xNMM7L26hgsfZdPaO00Y'),(11,17,17,7,'SYTNPoZiWaxxE4YVUl286J1bUKXO8rhJlvpUsrsL8FzuELwXCDRocj0tx2YK7zR4'),(12,18,18,8,'gJ85aC8McfHZ2JUBpsFi2m2TWslYKn3oiQ5NyGH1hgmzWGpR9IrHFxDtWuhPOXkK'),(13,19,19,9,'sSVdf7sxbiWPN8RPK0IcOPSO8YoffcMlXB0P1YhkVr792KJ6WN8IxPfF9rsg1E8x'),(14,20,13,10,'A5c95teHXHJtdYPjdXNVBw67irLVdeOjo44V9PuzZdXay4RFsCxDQanY3Kk1S9I0'),(15,29,23,11,'6HOMCK6CVEfsNKmKvYP9VfmdtLUMcpcrafbt95eRldksla2Gl43LpAUbhVJcRrnu'),(16,32,24,12,'VscYHMfsaHmBaqqTQqVf6kzruoX2KMCa4sRZ6Oljo6paVjyoj8o27joF3qxkYfT1'),(17,33,25,13,'RCgYqjBMHjPgjHOArepMPyWd7RbM89eULvv4GEkcxuFxYGlC6dpeDeyzbWADPSyn'),(18,34,26,14,'AYERcXrVMecSIEdi96KdtZSZKcnldvDq55MH4qafahjyF1OPONU1xJQJdgUuXC9j'),(20,37,28,16,'vRiMV2GaVO7F4taO2fqlyRs83aBnUVsJ9hX2TnKGQ0CppkA7UfBi7XLJw5mCKfK3'),(21,38,29,17,'mwwbj4nnwec3aHl9NcumhXjL5l539NqKRguZqh7zSNWO4Luqf6WpxAt0LTjja2qX'),(22,39,30,18,'c144n0JV0WIDnJn1ny48TLkH1y13ohpFOuhR6u1cpKr7axEJzzWLTEqZYWCJrJxi');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `invoice_id` int NOT NULL AUTO_INCREMENT,
  `i_customer_id` int DEFAULT NULL,
  `service_name` varchar(200) DEFAULT NULL,
  `amount_paid` int DEFAULT NULL,
  `billing_address` varchar(2000) DEFAULT NULL,
  `city` varchar(200) DEFAULT NULL,
  `postal_code` varchar(200) DEFAULT NULL,
  `email_address` varchar(200) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `fk_invoices_customer_idx` (`i_customer_id`),
  CONSTRAINT `fk_invoices_customer` FOREIGN KEY (`i_customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,18,'Premium Plan',576,'Şirintepe Mah.','İstanbul','34413','iletisim@bariscanaslan.com','2025-05-09 06:31:45'),(2,22,'Add 275 Quota',25,'Levent','İstanbul','34121','iletisim@bariscanaslan.com','2025-05-09 16:42:36'),(3,22,'Premium Plan',576,'Cihangir Mah.','İstanbul','35256','iletisim@bariscanaslan.com','2025-05-09 17:37:52'),(4,22,'Add 600 Quota',30,'GOP Mah.','İstanbul','34525','iletisim@bariscanaslan.com','2025-05-09 17:53:44'),(5,22,'Premium Plan',576,'Fatih Mah.','İstanbul','34124','iletisim@bariscanaslan.com','2025-05-09 17:54:39'),(6,9,'Advanced Plan',288,'Levent Mah.','İstanbul','34123','iletisim@bariscanaslan.com','2025-05-09 22:46:46'),(7,3,'Advanced Plan',288,'Levent','İstanbul','21124','iletisim@bariscanaslan.com','2025-05-10 11:09:15'),(8,3,'Add 600 Quota',30,'Fatih','İstanbul','34123','iletisim@bariscanaslan.com','2025-05-10 11:40:09');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `country_name` varchar(200) DEFAULT NULL,
  `city_name` varchar(200) DEFAULT NULL,
  `location_activeness` tinyint DEFAULT '1',
  `location_creation` datetime DEFAULT NULL,
  `location_deletion` datetime DEFAULT NULL,
  PRIMARY KEY (`location_id`),
  UNIQUE KEY `location_id` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (42,'Turkey','İstanbul',1,'2025-03-22 10:10:00',NULL),(43,'Turkey','Ankara',1,'2025-03-22 10:10:00',NULL),(44,'Turkey','İzmir',1,'2025-03-22 10:10:00',NULL),(45,'Turkey','Bursa',1,'2025-03-22 10:10:00',NULL),(46,'Turkey','Antalya',1,'2025-03-22 10:10:00',NULL),(47,'Turkey','Konya',1,'2025-03-22 10:10:00',NULL),(48,'Turkey','Adana',1,'2025-03-22 10:10:00','2025-03-31 01:50:31'),(49,'Turkey','Şanlıurfa',1,'2025-03-22 10:10:00',NULL),(50,'Turkey','Gaziantep',1,'2025-03-22 10:10:00',NULL),(51,'Turkey','Mersin',1,'2025-03-22 10:10:00',NULL),(52,'Turkey','Diyarbakır',1,'2025-03-22 10:10:00',NULL),(53,'Turkey','Kayseri',1,'2025-03-22 10:10:00',NULL),(54,'Turkey','Sakarya',1,'2025-03-22 10:10:00',NULL),(55,'Turkey','Eskişehir',1,'2025-03-22 10:10:00',NULL),(56,'Turkey','Bitlis',1,'2025-03-22 10:10:00','2025-03-26 18:30:58'),(57,'USA','New York',1,'2025-03-22 10:10:00',NULL),(58,'USA','Los Angeles',1,'2025-03-22 10:10:00',NULL),(59,'USA','Chicago',1,'2025-03-22 10:10:00',NULL),(60,'USA','Houston',1,'2025-03-22 10:10:00',NULL),(61,'USA','Phoenix',1,'2025-03-22 10:10:00',NULL),(62,'USA','Philadelphia',1,'2025-03-22 10:10:00',NULL),(63,'USA','San Antonio',1,'2025-03-22 10:10:00',NULL),(64,'USA','San Diego',1,'2025-03-22 10:10:00',NULL),(65,'USA','Dallas',1,'2025-03-22 10:10:00',NULL),(66,'USA','Charlotte',1,'2025-03-22 10:10:00',NULL),(67,'Italy','Rome',1,'2025-03-22 10:10:00',NULL),(68,'Italy','Milan',1,'2025-03-22 10:10:00',NULL),(69,'Italy','Naples',1,'2025-03-22 10:10:00','2025-03-26 17:49:49'),(70,'Italy','Turin',1,'2025-03-22 10:10:00',NULL),(71,'Italy','Palermo',1,'2025-03-22 10:10:00',NULL),(72,'Italy','Genoa',1,'2025-03-22 10:10:00',NULL),(90,'Turkey','Kırklareli',1,'2025-03-22 18:03:23',NULL),(91,'Italy','Florence',1,'2025-03-22 18:05:29',NULL),(92,'Italy','Venice',1,'2025-03-25 00:36:24',NULL);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `paid_plan` int DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `expiration_date` datetime DEFAULT NULL,
  `active_quota` int DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  UNIQUE KEY `payment_id` (`payment_id`),
  KEY `fk_payment_plan` (`paid_plan`),
  CONSTRAINT `fk_payment_plan` FOREIGN KEY (`paid_plan`) REFERENCES `plan` (`plan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (3,2,'2025-05-10 11:09:15','2026-05-10 11:09:15',4199),(4,2,'2025-04-07 04:12:46','2025-04-14 04:12:46',200),(5,2,'2025-05-09 22:46:46','2026-05-09 22:46:46',3596),(6,3,'2025-05-07 06:44:38','2026-05-07 06:44:38',1000000),(7,2,'2025-05-07 16:45:13','2026-05-07 16:45:13',300),(8,3,'2025-05-07 06:41:05','2026-05-07 06:41:05',1000000),(9,2,'2025-04-07 04:12:46','2025-04-14 04:12:46',250),(10,1,'2025-05-07 06:35:18','2026-05-07 06:35:18',50),(11,1,'2025-04-07 04:12:46','2025-04-14 04:12:46',150),(12,2,'2025-05-08 00:14:58','2026-05-08 00:14:58',275),(13,2,'2025-05-07 06:24:52','2026-05-07 06:25:03',300),(14,3,'2025-05-09 06:31:45','2026-05-09 06:31:45',12000000),(16,1,'2025-05-07 03:21:33','2025-05-14 03:21:33',50000),(17,1,'2025-05-07 05:21:50','2025-05-14 05:21:50',50000),(18,3,'2025-05-09 17:54:39','2026-05-09 17:54:39',12000000);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan` (
  `plan_id` int NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(200) DEFAULT NULL,
  `plan_price` int DEFAULT NULL,
  `plan_quota` int DEFAULT NULL,
  `plan_activeness` tinyint DEFAULT '1',
  `plan_creation` datetime DEFAULT NULL,
  `plan_deletion` datetime DEFAULT NULL,
  PRIMARY KEY (`plan_id`),
  UNIQUE KEY `plan_id` (`plan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES (1,'Standard',19,50,1,NULL,NULL),(2,'Advanced',24,300,1,NULL,NULL),(3,'Premium',48,1000000,1,NULL,NULL);
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation-info`
--

DROP TABLE IF EXISTS `reservation-info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation-info` (
  `reservation_id` int NOT NULL AUTO_INCREMENT,
  `r_session_id` int DEFAULT NULL,
  `r_restaurant_id` int DEFAULT NULL,
  `r_table_ids` varchar(500) DEFAULT NULL,
  `reservation_people_no` int DEFAULT NULL,
  `reservation_phone` varchar(200) DEFAULT NULL,
  `reservation_note` varchar(3500) DEFAULT NULL,
  `reservation_email` varchar(200) DEFAULT NULL,
  `reservation_name` varchar(200) DEFAULT NULL,
  `reservation_surname` varchar(200) DEFAULT NULL,
  `reservation_send_date` datetime DEFAULT NULL,
  `is_checked_by_system` tinyint DEFAULT '0',
  PRIMARY KEY (`reservation_id`),
  UNIQUE KEY `reservation_id` (`reservation_id`),
  KEY `fk_reservation_session` (`r_session_id`),
  KEY `fk_reservation_restaurant_idx` (`r_restaurant_id`),
  CONSTRAINT `fk_reservation_restaurant` FOREIGN KEY (`r_restaurant_id`) REFERENCES `restaurant-info` (`restaurant_id`),
  CONSTRAINT `fk_reservation_session` FOREIGN KEY (`r_session_id`) REFERENCES `session-info` (`session_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation-info`
--

LOCK TABLES `reservation-info` WRITE;
/*!40000 ALTER TABLE `reservation-info` DISABLE KEYS */;
INSERT INTO `reservation-info` VALUES (1,2,20,'3',3,'+905355746546','-','iletisim@bariscanaslan.com','Barış Can','Aslan','2025-04-08 11:23:00',1),(2,8,20,'4',4,'+905335768789','-','iletisim@bariscanaslan.com','Haluk','Bilginer','2025-04-09 15:42:00',1),(5,11,15,'4',4,'+905383599269','No note','iletisim@bariscanaslan.com','Barış Can','Aslan','2025-04-11 05:04:43',1),(10,10,15,'7',1,'+9053243252526','-','iletisim@bariscanaslan.com','Mert','Birlikçioğlu','2025-04-11 07:16:24',1),(11,17,20,'3,4',5,'+905383592123','It\'s a birthday.','iletisim@bariscanaslan.com','Fatih','Altaylı','2025-04-11 07:44:59',1),(12,18,20,'5,6',5,'+90523423515313','I will come from Silivri. Cook accordingly.','iletisim@bariscanaslan.com','Ekrem','İmamoğlu','2025-04-11 08:04:58',1),(13,16,20,'5,3',3,'+9063523463462','','iletisim@bariscanaslan.com','Mecit','Kabasakal','2025-04-11 08:11:44',1),(16,18,20,'5,3',3,'+9034636346262','','iletisim@bariscanaslan.com','Erman','Yaşar','2025-04-11 08:23:33',1),(17,17,20,'4',4,'+9023526246346','-','iletisim@bariscanaslan.com','Tuna','Zeyneloğlu','2025-04-11 08:26:43',1),(18,18,20,'6',3,'+90235235362315','-','iletisim@bariscanaslan.com','Victor','Osimhen','2025-04-11 08:28:41',1),(19,12,15,'7,8',4,'+905326346362','It\'s a birthday.','iletisim@bariscanaslan.com','Emre','Özcan','2025-04-11 08:32:03',1),(23,36,15,'9,10',3,'+90523523626','No note.','iletisim@bariscanaslan.com','Eşref','Tek','2025-05-08 05:28:12',1),(25,54,15,'9,10,11,12',7,'+9025235235','We gonna celebrate the championship of Galatasaray.','iletisim@bariscanaslan.com','Jose','Mourinho','2025-05-09 19:08:33',1),(26,57,15,'9,10,11',5,'+905366054323','','iletisim@bariscanaslan.com','Daron','Acemoğlu','2025-05-09 22:22:50',0),(28,70,20,'3,5',6,'+9053263462','-','iletisim@bariscanaslan.com','Barış Alper','Yılmaz','2025-05-09 22:49:19',0),(29,62,20,'3',4,'+905383599269','Birthday Party.','iletisim@bariscanaslan.com','Barış Can','Aslan','2025-05-09 23:37:44',0),(30,73,15,'9,10,11',5,'+90532634637','Birthday Party!!','iletisim@bariscanaslan.com','Serdar Ali','Çelikler','2025-05-10 07:37:36',0),(31,64,20,'3,4',7,'+90538359354','Championship.','iletisim@bariscanaslan.com','Hakan','Altun','2025-05-10 07:52:35',0),(32,63,20,'5,19',3,'+903952624624','','iletisim@bariscanaslan.com','Mansur','Yavaş','2025-05-10 07:53:57',0),(33,76,15,'9,10,11',5,'+905232634636','Galatasaray championship!','iletisim@bariscanaslan.com','Alvaro','Morata','2025-05-10 11:24:01',0);
/*!40000 ALTER TABLE `reservation-info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation-request`
--

DROP TABLE IF EXISTS `reservation-request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation-request` (
  `reservation_request_id` int NOT NULL AUTO_INCREMENT,
  `reservation_request_date` date DEFAULT NULL,
  `reservation_request_time` time DEFAULT NULL,
  `reservation_request_people_no` int DEFAULT NULL,
  `reservation_request_phone` varchar(200) DEFAULT NULL,
  `reservation_request_note` varchar(3500) DEFAULT NULL,
  `reservation_request_email` varchar(200) DEFAULT NULL,
  `reservation_request_name` varchar(200) DEFAULT NULL,
  `reservation_request_surname` varchar(200) DEFAULT NULL,
  `request_send_date` datetime DEFAULT NULL,
  `request_status` int DEFAULT '0',
  `request_response` varchar(3500) DEFAULT NULL,
  `reservation_restaurant_id` int DEFAULT NULL,
  PRIMARY KEY (`reservation_request_id`),
  UNIQUE KEY `reservation_request_id` (`reservation_request_id`),
  KEY `fk_restaurant_id_idx` (`reservation_restaurant_id`),
  CONSTRAINT `fk_restaurant_id` FOREIGN KEY (`reservation_restaurant_id`) REFERENCES `restaurant-info` (`restaurant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation-request`
--

LOCK TABLES `reservation-request` WRITE;
/*!40000 ALTER TABLE `reservation-request` DISABLE KEYS */;
INSERT INTO `reservation-request` VALUES (1,'2023-10-01','19:00:00',4,'555-1234','Anniversary celebration','john.doe@example.com','John','Doe','2023-09-25 10:00:00',0,'',13),(2,'2023-10-02','20:00:00',2,'555-5678','Table by the window','jane.smith@example.com','Jane','Smith','2023-09-26 11:00:00',0,'',13),(3,'2023-10-03','18:30:00',6,'555-8765','Birthday party','alice.jones@example.com','Alice','Jones','2023-09-27 12:00:00',0,'',13),(4,'2023-10-04','21:00:00',3,'555-4321','Vegetarian options','bob.brown@example.com','Bob','Brown','2023-09-28 13:00:00',0,'',13),(5,'2023-10-05','17:00:00',5,'555-2468','Late arrival expected','charlie.white@example.com','Charlie','White','2023-09-29 14:00:00',0,'',13),(6,'2023-10-06','19:30:00',2,'555-1357','Special request for dessert','diana.green@example.com','Diana','Green','2023-09-30 15:00:00',0,'',13),(7,'2023-10-07','20:15:00',4,'555-2468','Celebrating graduation','edward.black@example.com','Edward','Black','2023-10-01 16:00:00',0,'',13),(8,'2023-10-08','18:00:00',3,'555-9876','Allergy to nuts','fiona.red@example.com','Fiona','Red','2023-10-02 17:00:00',0,'',13),(9,'2023-10-09','19:45:00',5,'555-6543','Reunion dinner','george.blue@example.com','George','Blue','2023-10-03 18:00:00',0,'',13),(10,'2023-10-10','20:30:00',2,'555-3210','Request for high chair','hannah.yellow@example.com','Hannah','Yellow','2023-10-04 19:00:00',0,'',13),(11,'2023-10-11','19:00:00',4,'555-1111','Table for 4, please','ian.purple@example.com','Ian','Purple','2023-10-05 20:00:00',0,'',13),(12,'2023-10-12','18:15:00',3,'555-2222','Celebrating a promotion','julia.orange@example.com','Julia','Orange','2023-10-06 21:00:00',0,'',13),(13,'2023-10-13','20:00:00',6,'555-3333','Family gathering','kevin.cyan@example.com','Kevin','Cyan','2023-10-07 22:00:00',0,'',13),(14,'2023-10-14','19:30:00',2,'555-4444','First date','linda.magenta@example.com','Linda','Magenta','2023-10-08 23:00:00',0,'',13),(15,'2023-10-15','21:00:00',4,'555-5555','Anniversary dinner','michael.teal@example.com','Michael','Teal','2023-10-09 00:00:00',0,'',13);
/*!40000 ALTER TABLE `reservation-request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant-info`
--

DROP TABLE IF EXISTS `restaurant-info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant-info` (
  `restaurant_id` int NOT NULL AUTO_INCREMENT,
  `restaurant_name` varchar(200) DEFAULT NULL,
  `restaurant_owner` varchar(200) DEFAULT NULL,
  `restaurant_customer` int DEFAULT NULL,
  `restaurant_cuisine` int DEFAULT NULL,
  `restaurant_location` int DEFAULT NULL,
  `restaurant_website` varchar(3500) DEFAULT NULL,
  `restaurant_email` varchar(200) DEFAULT NULL,
  `restaurant_phone` varchar(200) DEFAULT NULL,
  `hours_of_operation` varchar(200) DEFAULT NULL,
  `dress_code` varchar(200) DEFAULT NULL,
  `parking_details` varchar(200) DEFAULT NULL,
  `restaurant_creation` datetime DEFAULT NULL,
  `restaurant_service_status` int DEFAULT '1',
  PRIMARY KEY (`restaurant_id`),
  UNIQUE KEY `restaurant_id` (`restaurant_id`),
  KEY `fk_restaurant_cuisine` (`restaurant_cuisine`),
  KEY `fk_restaurant_location` (`restaurant_location`),
  KEY `fk_restaurant_user_idx` (`restaurant_customer`),
  CONSTRAINT `fk_restaurant_cuisine` FOREIGN KEY (`restaurant_cuisine`) REFERENCES `cuisine` (`cuisine_id`),
  CONSTRAINT `fk_restaurant_location` FOREIGN KEY (`restaurant_location`) REFERENCES `location` (`location_id`),
  CONSTRAINT `fk_restaurant_user` FOREIGN KEY (`restaurant_customer`) REFERENCES `user-info` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant-info`
--

LOCK TABLES `restaurant-info` WRITE;
/*!40000 ALTER TABLE `restaurant-info` DISABLE KEYS */;
INSERT INTO `restaurant-info` VALUES (13,'Barley Cafe','-',13,21,42,'#','barley@gmail.com','+902126598765','08:00 - 22:30','-','Valet','2025-05-09 03:11:27',1),(14,'Nobu İstanbul','-',15,13,42,'#','nobu@gmail.com','+902126595689','11:00 - 01:30','Casual','No Parking Service','2025-03-21 11:00:00',1),(15,'IZAKA TERRACE','İlktan Ar',14,17,42,'#','izaka@outlook.com','+902168455489','12:00 - 00:30','-','Valet','2025-03-26 22:51:17',1),(16,'Fine Dine İstanbul','-',16,12,42,'#','finedine@gmail.com','+902126548978','09:00 - 00:30','-','Valet','2025-03-21 13:00:00',1),(17,'Safran Restaurant','-',17,15,44,'#','safran@outlook.com','+902126548972','09:00 - 00:30','Casual','No Parking Service','2025-03-21 14:00:00',1),(18,'City Lights Bar','-',18,14,42,'#','citylights@gmail.com','+902126543218','10:00 - 02:30','-','Valet','2025-03-21 15:00:00',1),(19,'V MODERN ITALIAN','-',19,12,46,'#','modernitalian@outlook.com','+902165477632','09:00 - 00:30','Casual','Valet','2025-03-21 16:00:00',1),(20,'AVAR KEBAP','Yiğit Avar',20,12,56,'#','iletisim@avarkebap.com','+90212654123','7/24','Mafiatic','Valet','2025-03-26 22:51:05',1),(22,'Burger Joint',NULL,NULL,19,49,'#','contact@burgerjoint.com','890-123-4567','11:00-22:00','Casual','No','2025-04-07 03:22:33',1),(23,'Kebab House',NULL,29,18,48,'#','info@kebabhouse.com','789-012-3456','10:00-23:00','Formal','Yes','2025-04-07 04:12:46',1),(24,'Breakfast Cafe',NULL,32,22,52,'#','info@breakfastcafe.com','123-456-7891','07:00-15:00','Casual','No','2025-04-11 22:47:39',1),(25,'Chinese Restaurant',NULL,33,21,51,'#','contact@chineserestaurant.com','012-345-6789','10:00-22:00','Relaxed','Yes','2025-04-11 22:49:40',1),(26,'Italian Bistro',NULL,34,13,54,'#','info@italianbistro.com','345-678-9013','11:00-23:00','Casual','Yes','2025-04-11 22:52:57',1),(28,'Icardi Restaurant','Mauro Icardi',37,13,68,'#','contact@icardi.com','+41092352356','07:00 - 23:00','No dress code.','Valet','2025-05-07 03:21:33',1),(29,'Celal\'s Kebab','Celal Şengör',38,12,42,'#','iletisim@celalskebab.com','+021235435436','7/24','No dc.','Valet','2025-05-07 05:21:50',1),(30,'Altay Sushi','Fatih Altaylı',39,17,42,'#','contact@sushialtay.com','+021234525346','09:00 - 23:00','Casual','No parking.','2025-05-07 05:31:06',1);
/*!40000 ALTER TABLE `restaurant-info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant-request`
--

DROP TABLE IF EXISTS `restaurant-request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant-request` (
  `r_request_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `surname` varchar(200) DEFAULT NULL,
  `r_restaurant_name` varchar(200) DEFAULT NULL,
  `r_restaurant_cuisine` int DEFAULT NULL,
  `r_restaurant_location` int DEFAULT NULL,
  `r_restaurant_website` varchar(200) DEFAULT NULL,
  `r_restaurant_email` varchar(200) DEFAULT NULL,
  `r_restaurant_phone` varchar(200) DEFAULT NULL,
  `r_restaurant_hours` varchar(200) DEFAULT NULL,
  `r_restaurant_dress` varchar(200) DEFAULT NULL,
  `r_restaurant_parking` varchar(200) DEFAULT NULL,
  `r_restaurant_owner` varchar(200) DEFAULT NULL,
  `request_send_date` datetime DEFAULT NULL,
  `request_status` int DEFAULT '0',
  `request_response` varchar(3500) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `photo` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`r_request_id`),
  UNIQUE KEY `r_request_id` (`r_request_id`),
  KEY `fk_request_cuisine` (`r_restaurant_cuisine`),
  KEY `fk_request_location` (`r_restaurant_location`),
  CONSTRAINT `fk_request_cuisine` FOREIGN KEY (`r_restaurant_cuisine`) REFERENCES `cuisine` (`cuisine_id`),
  CONSTRAINT `fk_request_location` FOREIGN KEY (`r_restaurant_location`) REFERENCES `location` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant-request`
--

LOCK TABLES `restaurant-request` WRITE;
/*!40000 ALTER TABLE `restaurant-request` DISABLE KEYS */;
INSERT INTO `restaurant-request` VALUES (1,'John','Doe','Taste Haven',12,42,'#','info@tastehaven.com','123-456-7890','10:00-22:00','Formal','Yes',NULL,'2023-10-01 12:30:00',0,NULL,NULL,NULL,NULL),(2,'Jane','Smith','Sushi World',13,43,'#','contact@sushiworld.com','234-567-8901','11:00-23:00','Casual','No',NULL,'2023-10-02 13:00:00',1,NULL,NULL,NULL,NULL),(3,'Michael','Johnson','Pizza Palace',14,44,'#','info@pizzapalace.com','345-678-9012','12:00-24:00','Casual','Yes',NULL,'2023-10-03 14:00:00',0,NULL,NULL,NULL,NULL),(4,'Emily','Davis','Mexican Fiesta',15,45,'#','info@mexicanfiesta.com','456-789-0123','10:00-22:00','Relaxed','Yes',NULL,'2023-10-04 15:00:00',2,'\"Phone number cannot be accessable.\"',NULL,NULL,NULL),(5,'David','Wilson','Seafood Delight',16,46,'#','info@seafooddeli.com','567-890-1234','09:00-21:00','Formal','No',NULL,'2023-10-05 16:00:00',0,NULL,NULL,NULL,NULL),(6,'Sarah','Brown','Vegan Bistro',17,47,'#','contact@veganbistro.com','678-901-2345','08:00-20:00','Casual','Yes',NULL,'2023-10-06 17:00:00',0,NULL,NULL,NULL,NULL),(7,'Daniel','Jones','Kebab House',18,48,'#','info@kebabhouse.com','789-012-3456','10:00-23:00','Formal','Yes',NULL,'2023-10-07 18:00:00',1,NULL,NULL,NULL,NULL),(8,'Laura','Garcia','Burger Joint',19,49,'#','contact@burgerjoint.com','890-123-4567','11:00-22:00','Casual','No',NULL,'2023-10-08 19:00:00',1,NULL,NULL,NULL,NULL),(9,'James','Martinez','Pasta Place',20,50,'#','info@pastaplace.com','901-234-5678','09:00-21:00','Formal','Yes',NULL,'2023-10-09 20:00:00',0,NULL,NULL,NULL,NULL),(10,'Sophia','Hernandez','Chinese Restaurant',21,51,'#','contact@chineserestaurant.com','012-345-6789','10:00-22:00','Relaxed','Yes',NULL,'2023-10-10 21:00:00',1,NULL,NULL,NULL,NULL),(11,'William','Lopez','Breakfast Cafe',22,52,'#','info@breakfastcafe.com','123-456-7891','07:00-15:00','Casual','No',NULL,'2023-10-11 08:00:00',1,NULL,NULL,NULL,NULL),(12,'Olivia',' Gonzalez','Steakhouse',23,53,'#','contact@steakhouse.com','234-567-8902','12:00-22:00','Formal','Yes',NULL,'2023-10-12 09:00:00',0,NULL,NULL,NULL,NULL),(13,'Liam','Wilson','Italian Bistro',13,54,'#','info@italianbistro.com','345-678-9013','11:00-23:00','Casual','Yes',NULL,'2023-10-13 10:00:00',1,NULL,NULL,NULL,NULL),(14,'Mia','Anderson','Dessert Shop',25,55,'#','contact@dessertshop.com','456-789-0124','10:00-20:00','Relaxed','No',NULL,'2023-10-14 11:00:00',2,'\"Special reason.\"',NULL,NULL,NULL),(15,'Noah','Thomas','Barbecue Grill',12,56,'#','info@barbecuegrill.com','567-890-1235','12:00-22:00','Formal','Yes',NULL,'2023-10-15 12:00:00',2,'\"I don\'t like the information.\"',NULL,NULL,NULL),(16,'Fatih','Terim','Terim Restaurant',12,48,'#','terimrestaurant@outlook.com','+902124123553','09:00 - 23:00','No dress code.','Valet','Fatih Terim','2025-04-11 17:36:22',0,'',NULL,NULL,NULL),(17,'Mauro','Icardi','Icardi Restaurant',13,68,'#','contact@icardi.com','+41092352356','07:00 - 23:00','No dress code.','Valet','Mauro Icardi','2025-04-11 17:44:14',1,'',NULL,NULL,NULL),(18,'Nilay','Büyükgüngör','Nilay Kebab',12,56,'nilaykebab.com','iletisim@nilaykebab.com','+9021242545143','7/24','-','Valet','Nilay Büyükgüngör','2025-04-14 11:04:49',0,'',NULL,NULL,NULL),(19,'Celal','Şengör','Celal\'s Kebab',12,42,'#','iletisim@celalskebab.com','+021235435436','7/24','No dc.','Valet','Celal Şengör','2025-05-07 05:14:02',1,'','celalsengor@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+905363673723'),(20,'Fatih','Altaylı','Altay Sushi',17,42,'#','contact@sushialtay.com','+021234525346','09:00 - 23:00','Casual','No parking.','Fatih Altaylı','2025-05-07 05:29:35',1,'','fatihaltayli@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+9052354636');
/*!40000 ALTER TABLE `restaurant-request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session-info`
--

DROP TABLE IF EXISTS `session-info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session-info` (
  `session_id` int NOT NULL AUTO_INCREMENT,
  `session_date` date DEFAULT NULL,
  `session_start` time DEFAULT NULL,
  `session_end` time DEFAULT NULL,
  `s_restaurant_id` int DEFAULT NULL,
  `session_activeness` tinyint DEFAULT '1',
  `session_creation` datetime DEFAULT NULL,
  `session_deletion` datetime DEFAULT NULL,
  `is_checked_by_system` tinyint DEFAULT '0',
  PRIMARY KEY (`session_id`),
  UNIQUE KEY `session_id` (`session_id`),
  KEY `fk_session_restaurant` (`s_restaurant_id`),
  CONSTRAINT `fk_session_restaurant` FOREIGN KEY (`s_restaurant_id`) REFERENCES `restaurant-info` (`restaurant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session-info`
--

LOCK TABLES `session-info` WRITE;
/*!40000 ALTER TABLE `session-info` DISABLE KEYS */;
INSERT INTO `session-info` VALUES (2,'2025-04-10','22:00:00','23:00:00',20,0,NULL,'2025-04-14 11:01:50',1),(8,'2025-04-10','10:00:00','12:00:00',20,0,'2025-04-08 22:18:21','2025-04-14 11:01:50',1),(10,'2025-04-11','17:00:00','19:00:00',15,0,'2025-04-09 03:06:38','2025-04-14 11:01:50',1),(11,'2025-04-11','18:00:00','19:00:00',15,0,'2025-04-09 03:16:27','2025-04-14 11:01:50',1),(12,'2025-04-11','19:00:00','20:00:00',15,0,'2025-04-09 03:16:44','2025-04-14 11:01:50',1),(13,'2025-04-11','20:00:00','21:00:00',15,0,'2025-04-09 03:18:15','2025-04-14 11:01:50',1),(14,'2025-04-12','19:00:00','20:00:00',15,0,'2025-04-09 03:18:15','2025-04-14 11:01:50',1),(15,'2025-04-12','20:00:00','21:00:00',15,0,'2025-04-09 03:18:15','2025-04-14 11:01:50',1),(16,'2025-04-12','10:00:00','12:00:00',20,0,'2025-04-08 22:18:21','2025-04-14 11:01:50',1),(17,'2025-04-12','11:00:00','13:00:00',20,0,'2025-04-08 22:18:21','2025-04-14 11:01:50',1),(18,'2025-04-12','12:00:00','14:00:00',20,0,'2025-04-08 22:18:21','2025-04-14 11:01:50',1),(21,'2025-04-11','21:00:00','22:00:00',15,0,'2025-04-11 20:11:44','2025-04-14 11:01:50',1),(23,'2025-04-12','13:00:00','15:00:00',15,0,'2025-04-11 23:10:07','2025-04-14 11:01:50',1),(26,'2025-05-08','09:00:00','11:00:00',15,0,'2025-05-08 04:16:00','2025-05-09 18:19:50',1),(28,'2025-05-08','11:00:00','13:00:00',15,0,'2025-05-08 04:16:11','2025-05-08 04:24:07',1),(29,'2025-05-08','12:00:00','14:00:00',15,0,'2025-05-08 04:16:15','2025-05-08 04:24:02',1),(30,'2025-05-08','13:00:00','15:00:00',15,0,'2025-05-08 04:16:20','2025-05-08 04:22:10',1),(32,'2025-05-08','11:00:00','13:00:00',15,0,'2025-05-08 04:36:16','2025-05-09 18:19:50',1),(35,'2025-05-08','12:00:00','14:00:00',15,0,'2025-05-08 04:40:26','2025-05-09 18:19:50',1),(36,'2025-05-08','10:00:00','12:00:00',15,0,'2025-05-08 04:42:06','2025-05-09 18:19:50',1),(37,'2025-05-09','19:00:00','20:00:00',30,1,'2025-05-09 18:14:31',NULL,1),(38,'2025-05-09','20:00:00','21:00:00',30,1,'2025-05-09 18:14:38',NULL,1),(39,'2025-05-09','21:00:00','22:00:00',30,1,'2025-05-09 18:14:48',NULL,1),(40,'2025-05-09','22:00:00','23:00:00',30,1,'2025-05-09 18:14:51',NULL,1),(41,'2025-05-10','00:00:00','01:00:00',30,1,'2025-05-09 18:17:23',NULL,1),(42,'2025-05-10','01:00:00','02:00:00',30,1,'2025-05-09 18:17:28',NULL,1),(43,'2025-05-10','10:00:00','11:00:00',30,1,'2025-05-09 18:17:57',NULL,1),(44,'2025-05-10','11:00:00','12:00:00',30,1,'2025-05-09 18:18:00',NULL,1),(45,'2025-05-10','12:00:00','13:00:00',30,1,'2025-05-09 18:18:03',NULL,1),(46,'2025-05-10','13:00:00','14:00:00',30,1,'2025-05-09 18:18:06',NULL,1),(47,'2025-05-10','14:00:00','15:00:00',30,1,'2025-05-09 18:18:12',NULL,1),(48,'2025-05-10','16:00:00','17:00:00',30,1,'2025-05-09 18:18:15',NULL,1),(49,'2025-05-09','19:00:00','20:00:00',15,1,'2025-05-09 18:20:03',NULL,1),(50,'2025-05-09','20:00:00','21:00:00',15,1,'2025-05-09 18:20:08',NULL,1),(51,'2025-05-09','21:00:00','22:00:00',15,1,'2025-05-09 18:20:10',NULL,1),(52,'2025-05-09','22:30:00','23:30:00',15,1,'2025-05-09 18:28:31',NULL,1),(53,'2025-05-09','23:30:00','00:30:00',15,1,'2025-05-09 18:31:21',NULL,1),(54,'2025-05-09','19:30:00','20:30:00',15,0,'2025-05-09 18:41:35','2025-05-09 21:58:19',1),(55,'2025-05-09','20:30:00','21:30:00',15,0,'2025-05-09 18:41:45','2025-05-09 21:58:19',1),(56,'2025-05-09','23:00:00','00:00:00',15,0,'2025-05-09 18:41:58','2025-05-09 18:42:17',0),(57,'2025-05-09','23:00:00','00:00:00',15,0,'2025-05-09 18:43:14','2025-05-10 00:00:00',1),(58,'2025-05-10','09:00:00','11:00:00',20,0,'2025-05-09 22:47:22','2025-05-10 11:00:00',1),(59,'2025-05-10','10:00:00','12:00:00',20,0,'2025-05-09 22:47:27','2025-05-10 12:00:00',1),(60,'2025-05-10','11:00:00','13:00:00',20,1,'2025-05-09 22:47:31',NULL,0),(61,'2025-05-10','12:00:00','14:00:00',20,1,'2025-05-09 22:47:37',NULL,0),(62,'2025-05-10','13:00:00','15:00:00',20,1,'2025-05-09 22:47:41',NULL,0),(63,'2025-05-10','14:00:00','16:00:00',20,1,'2025-05-09 22:47:44',NULL,0),(64,'2025-05-10','15:00:00','17:00:00',20,1,'2025-05-09 22:47:48',NULL,0),(65,'2025-05-10','16:00:00','18:00:00',20,1,'2025-05-09 22:47:51',NULL,0),(66,'2025-05-10','17:00:00','19:00:00',20,1,'2025-05-09 22:47:55',NULL,0),(67,'2025-05-10','18:00:00','20:00:00',20,1,'2025-05-09 22:47:59',NULL,0),(68,'2025-05-10','19:00:00','21:00:00',20,1,'2025-05-09 22:48:03',NULL,0),(69,'2025-05-10','20:00:00','22:00:00',20,1,'2025-05-09 22:48:07',NULL,0),(70,'2025-05-10','21:00:00','23:00:00',20,1,'2025-05-09 22:48:10',NULL,0),(71,'2025-05-10','22:00:00','00:00:00',20,1,'2025-05-09 22:48:15',NULL,0),(72,'2025-05-10','23:00:00','01:00:00',20,1,'2025-05-09 22:48:23',NULL,0),(73,'2025-05-10','10:00:00','11:00:00',15,0,'2025-05-10 06:59:22','2025-05-10 11:00:00',1),(74,'2025-05-10','11:00:00','12:00:00',15,0,'2025-05-10 06:59:24','2025-05-10 12:00:00',1),(75,'2025-05-10','12:00:00','13:00:00',15,0,'2025-05-10 09:44:46','2025-05-10 11:23:10',0),(76,'2025-05-10','13:00:00','14:00:00',15,1,'2025-05-10 09:44:50',NULL,0),(77,'2025-05-10','14:00:00','15:00:00',15,1,'2025-05-10 09:44:53',NULL,0),(78,'2025-05-10','15:00:00','16:00:00',15,1,'2025-05-10 09:44:56',NULL,0),(79,'2025-05-10','16:00:00','17:00:00',15,1,'2025-05-10 09:45:00',NULL,0),(80,'2025-05-10','17:00:00','18:00:00',15,1,'2025-05-10 09:45:03',NULL,0),(81,'2025-05-10','19:00:00','20:00:00',15,1,'2025-05-10 09:45:13',NULL,0),(82,'2025-05-10','20:00:00','21:00:00',15,1,'2025-05-10 09:45:17',NULL,0),(83,'2025-05-10','21:00:00','22:00:00',15,1,'2025-05-10 09:45:20',NULL,0),(84,'2025-05-10','22:00:00','23:00:00',15,1,'2025-05-10 09:45:24',NULL,0),(85,'2025-05-10','23:00:00','00:00:00',15,1,'2025-05-10 09:45:28',NULL,0),(86,'2025-05-11','00:00:00','01:00:00',15,1,'2025-05-10 09:45:37',NULL,0);
/*!40000 ALTER TABLE `session-info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table-info`
--

DROP TABLE IF EXISTS `table-info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table-info` (
  `table_id` int NOT NULL AUTO_INCREMENT,
  `table_name` varchar(200) DEFAULT NULL,
  `table_capacity` int DEFAULT NULL,
  `t_restaurant_id` int DEFAULT NULL,
  `table_activeness` tinyint DEFAULT '1',
  `table_creation` datetime DEFAULT NULL,
  `table_deletion` datetime DEFAULT NULL,
  `table_available` tinyint DEFAULT '1',
  PRIMARY KEY (`table_id`),
  UNIQUE KEY `table_id` (`table_id`),
  KEY `fk_table_restaurant` (`t_restaurant_id`),
  CONSTRAINT `fk_table_restaurant` FOREIGN KEY (`t_restaurant_id`) REFERENCES `restaurant-info` (`restaurant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table-info`
--

LOCK TABLES `table-info` WRITE;
/*!40000 ALTER TABLE `table-info` DISABLE KEYS */;
INSERT INTO `table-info` VALUES (3,'T1',4,20,1,NULL,NULL,1),(4,'T2',4,20,1,NULL,NULL,1),(5,'T3',2,20,1,NULL,'2025-04-14 09:52:10',1),(9,'T3',2,15,1,NULL,'2025-05-09 21:58:19',1),(10,'T4',2,15,1,NULL,'2025-05-09 21:58:19',1),(11,'T5',2,15,1,'2025-04-09 17:48:13','2025-05-09 21:58:19',1),(12,'T6',2,15,1,'2025-04-09 17:50:50','2025-05-10 11:19:03',1),(13,'T7',4,15,1,'2025-04-11 20:07:37','2025-05-10 11:19:03',1),(17,'T1',4,15,1,'2025-05-08 05:20:41',NULL,1),(18,'T2',4,15,1,'2025-05-09 18:41:06',NULL,1),(19,'T4',4,20,1,'2025-05-09 23:36:14',NULL,1);
/*!40000 ALTER TABLE `table-info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user-info`
--

DROP TABLE IF EXISTS `user-info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user-info` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `user_type` int DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_photo` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) DEFAULT NULL,
  `user_activeness` tinyint DEFAULT '1',
  `user_creation` datetime DEFAULT NULL,
  `user_deletion` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user-info`
--

LOCK TABLES `user-info` WRITE;
/*!40000 ALTER TABLE `user-info` DISABLE KEYS */;
INSERT INTO `user-info` VALUES (1,'bariscanaslann','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Barış Can','Aslan',1,'bariscanaslan@outlook.com','http://localhost:8081/static/images/person/davinson_1.jpeg','+905383599269',1,NULL,'2025-05-10 10:20:23'),(2,'yigitavar','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Yiğit','Avar',2,'yigitavar@gmail.com','https://icdn.ensonhaber.com/crop/703x0/resimler/diger/kralspor/2012/11/17/fatih-terimden-iki-ayri-kare_002.jpg','+905356744532',1,'2025-03-21 10:32:00','2025-04-11 20:33:22'),(11,'toprakkamburoglu','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Toprak','Kamburoğlu',2,'toprak.kamburoglu@gmail.com','http://localhost:8081/static/images/person/foto15.jpg','+905348975621',1,'2025-03-21 11:45:00','2025-05-09 04:09:04'),(12,'nilaybuyukgungor','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Nilay','Büyükgüngör',2,'nilayb@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+905456875643',1,'2025-03-21 12:01:00',NULL),(13,'duruerol','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Duru','Erol',3,'duruerol231@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+905348965423',1,'2025-03-21 12:01:00',NULL),(14,'ilktanar','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','İlktan','Ar',3,'ilktanar@khas.edu.tr','https://my.khas.edu.tr/uploads/images/cv/ilktan-ar.jpg','+905364521798',1,'2025-03-21 12:01:00','2025-05-08 23:11:04'),(15,'mauroicardi','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Mauro','Icardi',3,'mauroicardi@gmail.com','https://biyoportre.com/wp-content/uploads/2024/09/Mauro-Icardi.jpg','+905315687945',1,'2025-03-21 12:01:00','2025-04-10 07:43:03'),(16,'fatihterim','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Fatih','Terim',3,'fatihterim@outlook.com','https://gsgazetecom.teimg.com/crop/1280x720/gsgazete-com/uploads/2024/12/terim-fatihalsek.jpg','+905350051905',1,'2025-03-21 12:01:00','2025-04-14 10:29:34'),(17,'tunazeyneloglu','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Tuna','Zeyneloğlu',3,'tunazey@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+905312654895',1,'2025-03-21 12:01:00','2025-03-22 19:58:34'),(18,'umutkutlu','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Umut','Kutlu',3,'umutkutlu@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+905364975215',1,'2025-03-21 12:01:00','2025-03-25 23:02:47'),(19,'denizsaldanli','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Dengtav Deniz','Saldanlı',3,'denizsaldanli@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+905312689754',1,'2025-03-21 12:01:00','2025-05-10 10:18:23'),(20,'sertaycinar','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Sertay','Çınar',3,'sertaycinar@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+905642319875',1,'2025-03-21 12:01:00','2025-03-22 20:10:24'),(21,'mertcanaslan','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Mert Can','Aslan',2,'mertcanaslan@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+905356321234',1,'2025-03-22 16:02:06',NULL),(22,'omeraslan','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Ömer','Aslan',2,'omeraslan@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+905364572447',0,'2025-03-22 16:11:23','2025-04-11 00:02:00'),(23,'beyhanaslan','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Beyhan','Aslan',2,'beyhanaslan@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+905356247539',1,'2025-03-22 16:20:01',NULL),(28,'volkankonak','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Volkan','Konak',2,'volkankonak@outlook.com','https://i.hizliresim.com/qw6n8zx.jpg','+905610616161',1,'2025-03-31 03:45:31',NULL),(29,'kebabhouse','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Daniel','Jones',4,NULL,NULL,NULL,1,'2025-04-07 04:12:45','2025-04-11 22:33:01'),(31,'morata','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Alvaro','Morata',2,'alvaromorata@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+9053546843516',1,'2025-04-11 22:37:15',NULL),(32,'williamlopez','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','William','Lopez',3,NULL,NULL,NULL,1,'2025-04-11 22:47:39',NULL),(33,'sophia','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Sophia','Hernandez',3,NULL,NULL,NULL,1,'2025-04-11 22:49:40',NULL),(34,'liamwilson','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Liam','Wilson',3,NULL,NULL,NULL,1,'2025-04-11 22:52:57',NULL),(35,'ahmedkutucu','$2a$10$OkHnbBN3KvEAK/5Hx/iNtuBWGk8Sf3p52K69t9hQfWe30om8ESF0i','Ahmed','Kutucu',2,'ahmedowski@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+9053654231597',1,'2025-04-14 10:41:30',NULL),(37,'mricardi','$2a$10$BFKsw0Q3rRc1wH0A4iVi6OKiqUDjCUE22VbATgBOC1/QB4Iyx9daa','Mauro','Icardi',4,NULL,NULL,NULL,1,'2025-05-07 03:21:33',NULL),(38,'celalsengor','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Celal','Şengör',5,NULL,NULL,NULL,0,'2025-05-07 05:21:50','2025-05-10 10:17:09'),(39,'fatihaltayli','$2a$12$Lm.V8iXdmouAl3GM.vHple2KctApmsRcE4iGAqSp5O/wBnl3ittg6','Fatih','Altaylı',3,'fatihaltayli@gmail.com','https://i.hizliresim.com/qw6n8zx.jpg','+9052354636',1,'2025-05-07 05:31:06',NULL),(40,'mertens','$2a$10$2j73W0q6qCm5pLJovWclJOg8K7adVS94/mcK92hJgkVh/nT0jxuUO','Dries','Mertens',2,'mertens@gmail.com','http://localhost:8081/static/images/person/mertens.jpg','+9053463474572',1,'2025-05-09 15:44:15',NULL),(41,'barisalperyilmaz','$2a$10$3nDL.z0hukLBbIhk0kbqIep94omn/ZQBBDbteeqKiTllMflhk7Y2S','Barış Alper','Yılmaz',2,'barisalper@gmail.com','http://localhost:8081/static/images/person/bay.jpeg','+90543363563463',1,'2025-05-09 15:46:40',NULL),(42,'davinsonsanchez','$2a$10$DmG/X6nFK.vNiz8/dTV4Q.LHgT4eOvWaZfkPKFWAVhVBy0xoKlduO','Davinson','Sanchez',2,'davinsonsanch@gmail.com','http://localhost:8081/static/images/person/davinson.jpeg','+9035289746246',1,'2025-05-09 15:48:45',NULL);
/*!40000 ALTER TABLE `user-info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-10 12:31:41
