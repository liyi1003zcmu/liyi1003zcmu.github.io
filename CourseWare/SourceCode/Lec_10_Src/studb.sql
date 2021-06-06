create database if not exists studb;
use studb;
drop table if exists stuinfo;
create table stuinfo(
	id int(11)	not null auto_increment,
	name varchar(20) default null,
	class varchar(20) default null,
	score int default 0,
	primary key (id)
);

insert into stuinfo(id,name,class,score)
values(10,'朱爱华','CS01',89),
	(17,'李全','CS02',78),
	(19,'刘鑫','EE01',68),
	(27,'江葵','CS01',95);
	
create table person(
	id int(11) not null auto_increment,
	name varchar(20) default null,
	address varchar(30) default null,
	primary key (id)
);
	
insert into person(id,name,address)
values(16,'朱妙妙','中国'),
	(15,'陈小爱','美国'),
	(22,'纪青林','英国');