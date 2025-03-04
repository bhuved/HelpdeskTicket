
create table Users
(Id int identity(1,1) primary key,
FirstName nvarchar(30) not null,
LastName nvarchar(30) not null,
Email nvarchar(50) not null);

create table Ticket
(Id int identity(1,1) primary key,
Title nvarchar(20) not null,
Description nvarchar(100) not null,
CreatedbyUserId int foreign key references Users(Id), 
ResolvedbyUserId int foreign key references Users(Id),
Status nvarchar(10) not null check(Status in ('Open','Closed')) default 'Open',
Resolution nvarchar(250),
Createdtime datetime not null default getdate(),
Resolvedtime datetime);

create table Bookmark
(Id int identity(1,1) primary key,
TicketId int foreign key references ticket(id),
UserId int foreign key references Users(id));

Scaffold-DbContext "Server=PRIYASLAPTOP;Database=HelpdeskDB;Trusted_Connection=True;TrustServerCertificate=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Entities
Scaffold-DbContext Name=DefaultConnection Microsoft.EntityFrameworkCore.SqlServer -OutputDir "Entities" -Force -NoOnConfiguring

insert into users(FirstName,LastName,Email) values
('Devi','Priya','devipriya@gmail.com'),
('Benia','Morgan','beniamorgan@gmail.com'),
('Michael', 'Siedlik','michaelsidelik@gmail.com');

insert into users(FirstName,LastName,Email) values
('Alice', 'Johnson', 'alice.johnson@example.com'),
('Bob', 'Smith', 'bob.smith@example.com'), 
('Charlie', 'Davis', 'charlie.davis@example.com'), 
('Dana', 'White', 'dana.white@example.com'),
('Ethan', 'Brown', 'ethan.brown@example.com'), 
('Fiona', 'Wilson', 'fiona.wilson@example.com'), 
('George', 'Martinez', 'george.martinez@example.com'), 
('Hannah', 'Clark', 'hannah.clark@example.com'),
('Ian', 'Lopez', 'ian.lopez@example.com'), 
('Julia', 'Hall', 'julia.hall@example.com');

select * from users;

insert into ticket (title,description,CreatedbyUserId,ResolvedbyUserId,Status,Resolution,Createdtime,Resolvedtime)
values ('Login Issue', 'User cannot log in with correct credentials.', 1, 3, 'Closed', 'Password reset resolved the issue.', '2024-02-25 10:30:00', '2024-02-25 12:00:00'),
('Bug Report', 'Application crashes on start.', 2, NULL, 'Open', NULL, '2024-02-26 09:15:00', NULL),
('Feature Request', 'Add dark mode support.', 4, NULL, 'Open', NULL, '2024-02-27 14:45:00', NULL), 
('Payment Failure', 'User was charged twice for subscription.', 5, 2, 'Closed', 'Refund issued and system updated.', '2024-02-28 11:10:00', '2024-02-28 16:30:00'), 
('UI Issue', 'Text overlaps in mobile view.', 3, NULL, 'Open', NULL, '2024-02-29 08:00:00', NULL);

select * from ticket;

insert into Bookmark (TicketId, UserId)
values (1, 2),  -- User 2 bookmarked Ticket 1 
(1, 4),  -- User 4 bookmarked Ticket 1
(2, 3),  -- User 3 bookmarked Ticket 2
(3, 1),  -- User 1 bookmarked Ticket 
(4, 5),  -- User 5 bookmarked Ticket 4 
(5, 2);  -- User 2 bookmarked Ticket 5

select * from bookmark;