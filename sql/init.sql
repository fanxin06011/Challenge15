
use vc2015;

drop table tbl_spot_info;

drop table tbl_rcs_friday;
drop table tbl_rcs_saturday;
drop table tbl_rcs_sunday;

drop table tbl_uft_friday;
drop table tbl_uft_saturday;
drop table tbl_uft_sunday;

create table tbl_spot_info(
  idnum int,
  x int, y int,
  name varchar(100),
  type varchar(100),
  primary key(idnum)
);

load data local infile '/var/www/html/vast15/data/spot.csv' \
  into table tbl_spot_info \
  fields terminated by ',' \
  enclosed by '' \
  line terminated by '\n' \
  ignore 1 lines \
  (x, y, idnum, name, type);

create table tbl_rcs_friday(
  id int, 
  x int, y int,
  time int,
  primary key(id, time)
);

--  load data local infile '/var/www/html/vast15/data/rcs_friday.csv' \
  --  into table tbl_rcs_friday \
  --  fields terminated by ',' \
  --  enclosed by '' \
  --  line terminated by '\n' \
  --  ignore 1 lines \
  --  (id, x, y, time);

create table tbl_rcs_saturday(
  id int, 
  x int, y int,
  time int,
  primary key(id, time)
);

--  load data local infile '/var/www/html/vast15/data/rcs_saturday.csv' \
  --  into table tbl_rcs_saturday \
  --  fields terminated by ',' \
  --  enclosed by '' \
  --  line terminated by '\n' \
  --  ignore 1 lines \
  --  (id, x, y, time);

create table tbl_rcs_sunday(
  id int, 
  x int, y int,
  time int,
  primary key(id, time)
);

--  load data local infile '/var/www/html/vast15/data/rcs_sunday.csv' \
  --  into table tbl_rcs_sunday \
  --  fields terminated by ',' \
  --  enclosed by '' \
  --  line terminated by '\n' \
  --  ignore 1 lines \
  --  (id, x, y, time);

crete index id_index on tbl_rcs_friday (id) using btree;
crete index id_index on tbl_rcs_saturday (id) using btree;
crete index id_index on tbl_rcs_sunday (id) using btree;
