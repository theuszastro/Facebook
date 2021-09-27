-- CreateTable
CREATE TABLE "Solicitation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "fromId" TEXT,
    "toId" TEXT,
    CONSTRAINT "Solicitation_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Solicitation_toId_fkey" FOREIGN KEY ("toId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
