
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
