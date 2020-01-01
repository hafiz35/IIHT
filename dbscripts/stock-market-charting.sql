-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema stock-market-charting
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `stock-market-charting` ;

-- -----------------------------------------------------
-- Schema stock-market-charting
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `stock-market-charting` DEFAULT CHARACTER SET utf8 ;
USE `stock-market-charting` ;

-- -----------------------------------------------------
-- Table `stock-market-charting`.`sector`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock-market-charting`.`sector` ;

CREATE TABLE IF NOT EXISTS `stock-market-charting`.`sector` (
  `sc_id` INT NOT NULL AUTO_INCREMENT,
  `sc_name` VARCHAR(45) NOT NULL,
  `sc_brief` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`sc_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stock-market-charting`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock-market-charting`.`role` ;

CREATE TABLE IF NOT EXISTS `stock-market-charting`.`role` (
  `ro_id` INT NOT NULL AUTO_INCREMENT,
  `ro_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ro_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stock-market-charting`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock-market-charting`.`user` ;

CREATE TABLE IF NOT EXISTS `stock-market-charting`.`user` (
  `us_username` VARCHAR(45) NOT NULL,
  `us_password` VARCHAR(255) NOT NULL,
  `us_ro_id` INT NOT NULL,
  `us_email` VARCHAR(45) NOT NULL,
  `us_number` BIGINT(11) NOT NULL,
  `us_confirmed` BIT(1) NOT NULL,
  PRIMARY KEY (`us_username`),
  INDEX `us_ro_fk_idx` (`us_ro_id` ASC),
  CONSTRAINT `us_ro_fk`
    FOREIGN KEY (`us_ro_id`)
    REFERENCES `stock-market-charting`.`role` (`ro_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stock-market-charting`.`company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock-market-charting`.`company` ;

CREATE TABLE IF NOT EXISTS `stock-market-charting`.`company` (
  `co_id` INT NOT NULL AUTO_INCREMENT,
  `co_name` VARCHAR(255) NOT NULL,
  `co_turnover` DOUBLE NOT NULL,
  `co_ceo` VARCHAR(50) NOT NULL,
  `co_board_of_directors` VARCHAR(255) NOT NULL,
  `co_sc_id` INT NOT NULL,
  `co_ brief` VARCHAR(100) NOT NULL,
  `co_active` BIT(1) NOT NULL,
  PRIMARY KEY (`co_id`),
  INDEX `co_sc_fk_idx` (`co_sc_id` ASC),
  CONSTRAINT `co_sc_fk`
    FOREIGN KEY (`co_sc_id`)
    REFERENCES `stock-market-charting`.`sector` (`sc_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stock-market-charting`.`stock_exchange`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock-market-charting`.`stock_exchange` ;

CREATE TABLE IF NOT EXISTS `stock-market-charting`.`stock_exchange` (
  `se_id` INT NOT NULL AUTO_INCREMENT,
  `se_name` VARCHAR(45) NOT NULL,
  `se_contact_address` VARCHAR(255) NOT NULL,
  `se_remarks` VARCHAR(50) NOT NULL,
  `se_brief` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`se_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stock-market-charting`.`company_stock_exchange`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock-market-charting`.`company_stock_exchange` ;

CREATE TABLE IF NOT EXISTS `stock-market-charting`.`company_stock_exchange` (
  `cs_code` VARCHAR(10) NOT NULL,
  `cs_co_id` INT NOT NULL,
  `cs_se_id` INT NOT NULL,
  INDEX `cs_se_fk_idx` (`cs_se_id` ASC),
  PRIMARY KEY (`cs_co_id`, `cs_se_id`),
  CONSTRAINT `cs_co_fk`
    FOREIGN KEY (`cs_co_id`)
    REFERENCES `stock-market-charting`.`company` (`co_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `cs_se_fk`
    FOREIGN KEY (`cs_se_id`)
    REFERENCES `stock-market-charting`.`stock_exchange` (`se_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stock-market-charting`.`ipo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock-market-charting`.`ipo` ;

CREATE TABLE IF NOT EXISTS `stock-market-charting`.`ipo` (
  `ip_id` INT NOT NULL AUTO_INCREMENT,
  `ip_co_id` INT NOT NULL,
  `ip_se_id` INT NOT NULL,
  `ip_price` DOUBLE NOT NULL,
  `ip_total_shares` INT NOT NULL,
  `ip_open_date_time` DATETIME NOT NULL,
  `ip_remarks` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ip_id`),
  INDEX `ip_co_fk_idx` (`ip_co_id` ASC),
  INDEX `ip_se_fk_idx` (`ip_se_id` ASC),
  CONSTRAINT `ip_co_fk`
    FOREIGN KEY (`ip_co_id`)
    REFERENCES `stock-market-charting`.`company` (`co_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `ip_se_fk`
    FOREIGN KEY (`ip_se_id`)
    REFERENCES `stock-market-charting`.`stock_exchange` (`se_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stock-market-charting`.`stock_price`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock-market-charting`.`stock_price` ;

CREATE TABLE IF NOT EXISTS `stock-market-charting`.`stock_price` (
  `sp_id` INT NOT NULL AUTO_INCREMENT,
  `sp_co_id` INT NOT NULL,
  `sp_se_id` INT NOT NULL,
  `sp_price` DOUBLE NOT NULL,
  `sp_date` DATETIME NOT NULL,
  PRIMARY KEY (`sp_id`),
  INDEX `sp_co_id_idx` (`sp_co_id` ASC),
  INDEX `sp_se_fk_idx` (`sp_se_id` ASC),
  CONSTRAINT `sp_co_fk`
    FOREIGN KEY (`sp_co_id`)
    REFERENCES `stock-market-charting`.`company_stock_exchange` (`cs_co_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `sp_se_fk`
    FOREIGN KEY (`sp_se_id`)
    REFERENCES `stock-market-charting`.`company_stock_exchange` (`cs_se_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `stock-market-charting`.`sector`
-- -----------------------------------------------------
START TRANSACTION;
USE `stock-market-charting`;
INSERT INTO `stock-market-charting`.`sector` (`sc_id`, `sc_name`, `sc_brief`) VALUES (1, 'Agriculture', 'Fishing, Tobacco, Vegetables, etc.');
INSERT INTO `stock-market-charting`.`sector` (`sc_id`, `sc_name`, `sc_brief`) VALUES (2, 'Automotive', 'Cars, Motorcycles etc.');
INSERT INTO `stock-market-charting`.`sector` (`sc_id`, `sc_name`, `sc_brief`) VALUES (3, 'Electronics', 'Mobiles, Computer');
INSERT INTO `stock-market-charting`.`sector` (`sc_id`, `sc_name`, `sc_brief`) VALUES (4, 'Aerospace', 'ISRO');
INSERT INTO `stock-market-charting`.`sector` (`sc_id`, `sc_name`, `sc_brief`) VALUES (5, 'Chemical', 'Pharmaceuticals, chemicals');
INSERT INTO `stock-market-charting`.`sector` (`sc_id`, `sc_name`, `sc_brief`) VALUES (6, 'Defence', 'Arms and defence sector');
INSERT INTO `stock-market-charting`.`sector` (`sc_id`, `sc_name`, `sc_brief`) VALUES (7, 'Power', 'Energy Generation etc');
INSERT INTO `stock-market-charting`.`sector` (`sc_id`, `sc_name`, `sc_brief`) VALUES (8, 'Telecom', 'Telecommunications industry');
INSERT INTO `stock-market-charting`.`sector` (`sc_id`, `sc_name`, `sc_brief`) VALUES (9, 'Banking and Finance', 'Banks and others financial sector');
INSERT INTO `stock-market-charting`.`sector` (`sc_id`, `sc_name`, `sc_brief`) VALUES (10, 'Manufacturing', 'Manufacturing sector');

COMMIT;


-- -----------------------------------------------------
-- Data for table `stock-market-charting`.`role`
-- -----------------------------------------------------
START TRANSACTION;
USE `stock-market-charting`;
INSERT INTO `stock-market-charting`.`role` (`ro_id`, `ro_name`) VALUES (1, 'ROLE_USER');
INSERT INTO `stock-market-charting`.`role` (`ro_id`, `ro_name`) VALUES (2, 'ROLE_ADMIN');

COMMIT;


-- -----------------------------------------------------
-- Data for table `stock-market-charting`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `stock-market-charting`;
INSERT INTO `stock-market-charting`.`user` (`us_username`, `us_password`, `us_ro_id`, `us_email`, `us_number`, `us_confirmed`) VALUES ('admin', '$2a$10$h610ZdjxiThJn0rSDfefFO4lpRb0onf.TeE/c/F5.F1HXiuOZeYs.', 2, 'admin@gmail.com', 1234567890, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stock-market-charting`.`company`
-- -----------------------------------------------------
START TRANSACTION;
USE `stock-market-charting`;
INSERT INTO `stock-market-charting`.`company` (`co_id`, `co_name`, `co_turnover`, `co_ceo`, `co_board_of_directors`, `co_sc_id`, `co_ brief`, `co_active`) VALUES (1, 'ICICI Bank', 45678781, 'Sandeep Bakshi', 'Sandeep Bakshi and others', 9, 'A Private bank', 1);
INSERT INTO `stock-market-charting`.`company` (`co_id`, `co_name`, `co_turnover`, `co_ceo`, `co_board_of_directors`, `co_sc_id`, `co_ brief`, `co_active`) VALUES (2, 'HDFC Bank', 65478919, 'Sahil Talwar', 'Sahil Talwar and others', 9, 'A private bank', 1);
INSERT INTO `stock-market-charting`.`company` (`co_id`, `co_name`, `co_turnover`, `co_ceo`, `co_board_of_directors`, `co_sc_id`, `co_ brief`, `co_active`) VALUES (3, 'Reliance', 9812789109, 'Mukesh Ambani', 'Mukesh Ambani and others', 8, 'Reliance Jio', 1);
INSERT INTO `stock-market-charting`.`company` (`co_id`, `co_name`, `co_turnover`, `co_ceo`, `co_board_of_directors`, `co_sc_id`, `co_ brief`, `co_active`) VALUES (4, 'Bata', 91728378, 'Chirag Gupta', 'Chirag Gupta and others', 10, 'Footwear manufacturer', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `stock-market-charting`.`stock_exchange`
-- -----------------------------------------------------
START TRANSACTION;
USE `stock-market-charting`;
INSERT INTO `stock-market-charting`.`stock_exchange` (`se_id`, `se_name`, `se_contact_address`, `se_remarks`, `se_brief`) VALUES (1, 'BSE', 'Dalal Street', 'Functional', 'Bombay Stock Exchange');
INSERT INTO `stock-market-charting`.`stock_exchange` (`se_id`, `se_name`, `se_contact_address`, `se_remarks`, `se_brief`) VALUES (2, 'NSE', 'Bandra', 'Functional', 'National Stock Exchange');

COMMIT;


-- -----------------------------------------------------
-- Data for table `stock-market-charting`.`company_stock_exchange`
-- -----------------------------------------------------
START TRANSACTION;
USE `stock-market-charting`;
INSERT INTO `stock-market-charting`.`company_stock_exchange` (`cs_code`, `cs_co_id`, `cs_se_id`) VALUES ('ICICIBANK', 1, 2);
INSERT INTO `stock-market-charting`.`company_stock_exchange` (`cs_code`, `cs_co_id`, `cs_se_id`) VALUES ('RELIANCE', 3, 1);
INSERT INTO `stock-market-charting`.`company_stock_exchange` (`cs_code`, `cs_co_id`, `cs_se_id`) VALUES ('HDFCBANK', 2, 1);
INSERT INTO `stock-market-charting`.`company_stock_exchange` (`cs_code`, `cs_co_id`, `cs_se_id`) VALUES ('BATAINDIA', 4, 1);

COMMIT;

