-- CreateTable
CREATE TABLE `Application` (
    `id` VARCHAR(191) NOT NULL,
    `company_name` VARCHAR(191) NOT NULL,
    `job_title` VARCHAR(191) NOT NULL,
    `job_type` ENUM('INTERNSHIP', 'FULL_TIME', 'PART_TIME') NOT NULL,
    `status` ENUM('APPLIED', 'INTERVIEWING', 'OFFER', 'REJECTED') NOT NULL,
    `applied_date` DATETIME(3) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
