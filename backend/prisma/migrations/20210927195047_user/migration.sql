-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "pronoun" TEXT NOT NULL,
    "date_birth" TEXT NOT NULL,
    "online" BOOLEAN NOT NULL,
    "theme" TEXT NOT NULL,
    "office" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL
);
