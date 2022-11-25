-- CreateTable
CREATE TABLE "department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "department_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "salary" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "employee_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
