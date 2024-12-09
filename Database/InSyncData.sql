-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 35.238.196.2    Database: node
-- ------------------------------------------------------
-- Server version	8.4.0-google

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'dcc67898-af62-11ef-92e6-42010a400003:1-13';

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `translate_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `original_text` text NOT NULL,
  `translate_text` text NOT NULL,
  `target_lang` varchar(50) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`translate_id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `login_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (1,1,'how are you','¿Cómo estás?','spa_Latn','2024-12-02 03:24:27'),(2,9,'how are you','Как дела?','rus_Cyrl','2024-12-02 03:26:30'),(3,1,'bad','Schlecht','deu_Latn','2024-12-02 18:26:58'),(4,11,'hello','¿Qué pasa ?','spa_Latn','2024-12-02 21:03:59'),(5,11,'I went to the store.','Fui a la tienda.','spa_Latn','2024-12-02 21:05:46'),(6,12,'hello','¿Qué pasa ?','spa_Latn','2024-12-02 21:35:24'),(7,11,'your mom','Tu madre','spa_Latn','2024-12-02 21:44:44'),(8,9,'Hello, sir. ','Je vous en prie.','fra_Latn','2024-12-04 15:55:28'),(9,9,'great','muy bueno','spa_Latn','2024-12-04 17:09:07'),(10,9,'good evening','Bonne soirée','fra_Latn','2024-12-04 17:10:00'),(11,9,'how much is it?','Hoeveel kos dit?','afr_Latn','2024-12-04 17:10:29'),(12,17,'how are you.','¿Cómo estás?','spa_Latn','2024-12-04 18:03:29'),(13,17,'how are you','¿Cómo estás?','spa_Latn','2024-12-04 18:06:27'),(14,17,'thank you. ','Je vous remercie.','fra_Latn','2024-12-04 18:06:59'),(15,17,'it is raining','Es regnet.','deu_Latn','2024-12-04 18:07:20'),(16,12,'I am about to leave. Let me call you back.','እኔ ለመሄድ ነው.','amh_Ethi','2024-12-04 22:25:43'),(17,11,'Hello, what is your name?','Hola, ¿cómo te llamas?','spa_Latn','2024-12-04 23:14:48'),(18,19,'hello, how are you','Hola, ¿cómo estás?','spa_Latn','2024-12-05 12:52:49'),(19,21,'hello, how are you','Hola, ¿cómo estás?','spa_Latn','2024-12-05 13:50:37'),(20,11,'Hello, my name is Matt and I am a computer programmer.','Hola, mi nombre es Matt y soy un programador de computadoras.','spa_Latn','2024-12-05 16:58:00'),(21,24,'what is your name?','¿Cómo te llamas?','spa_Latn','2024-12-05 22:59:32'),(22,24,'I like popcorn.','Me gusta la palomita.','spa_Latn','2024-12-05 23:00:29');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_user`
--

DROP TABLE IF EXISTS `login_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `pass` varchar(60) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_user`
--

LOCK TABLES `login_user` WRITE;
/*!40000 ALTER TABLE `login_user` DISABLE KEYS */;
INSERT INTO `login_user` VALUES (1,'towky12','toy','towky11@temple.edu'),(2,'jacky10','jacky','jacky12@temple.edu'),(3,'johndoe@email.com','jonedoe','johndoe@email.com'),(4,'jamesmith@temple.edu','jane','jamesmith@temple.edu'),(5,'alex@temple.edu','alex123','alex@temple.edu'),(6,'ex123','example','example@com'),(7,'insync','insync','inysnc@temple.edu'),(8,'t','t','t@temple.edu'),(9,'free','fre','freak@temple.edu'),(10,'l','lexi','lexi@temple.edu'),(11,'MattChristofas','monkey15','mattchristofas1@gmail.com'),(12,'nahom','nahom1','nahom.tamene@temple.edu'),(13,'Wandert809','Sajoma215','torreswander809@gmail.com'),(14,'Wandert809','Sajoma215','torreswander809@gmail.com'),(15,'WanderT809','Sajoma215','torreswander809@gmail.com'),(16,'sh s','h sh','torreswander809@gmail.com'),(17,'toker11','toker12','toker.ahmed@temple.edu'),(18,'hks','123','h2@gmail.com'),(19,'nahom1','nahom1','nahom@gmail.com'),(20,'r','r','r@example.com'),(21,'Alex','alex1','alex@gmail.com'),(22,'x','x','x@example.com'),(23,'Matt','pass','matt@gmail.com'),(24,'gimoney','poopie','gianna.barile1127@gmail.com');
/*!40000 ALTER TABLE `login_user` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-09 16:39:52
