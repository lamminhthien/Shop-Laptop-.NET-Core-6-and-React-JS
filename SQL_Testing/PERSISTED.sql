CREATE TABLE Student
(StudentID AS 'ST' + CAST(AutoIncrement AS VARCHAR(8)) PERSISTED,
 StudentName VARCHAR(20),
AutoIncrement INT IDENTITY(1,1),
 CONSTRAINT PK_Student PRIMARY KEY(StudentID)
)