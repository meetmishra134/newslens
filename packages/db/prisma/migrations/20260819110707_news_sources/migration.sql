/*
  Warnings:

  - You are about to drop the column `category` on the `news_sources` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `news_sources` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `news_sources` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "news_sources" DROP COLUMN "category",
DROP COLUMN "country",
DROP COLUMN "language";
