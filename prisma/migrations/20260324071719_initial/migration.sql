-- CreateTable
CREATE TABLE "UserLanguage" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "languages" TEXT[],
    "age" INTEGER,

    CONSTRAINT "UserLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLanguage_email_key" ON "UserLanguage"("email");
