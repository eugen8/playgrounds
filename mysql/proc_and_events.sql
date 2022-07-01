

create table cities (
    id bigint primary key auto_increment,
    city varchar(160),
    population int,
    created datetime not null default now()
);
drop table cities;
drop table people;
create table people (
    id bigint primary key auto_increment,
    name char(40),
    city_id bigint
);


DROP PROCEDURE generate_data;
DELIMITER $$
CREATE PROCEDURE generate_data()
BEGIN
    DECLARE i INT DEFAULT 0;
    WHILE i < 100000 DO
            INSERT INTO `cities` (`city`,`population`,`created`) VALUES (
                 LEFT(UUID(), 35),
                ROUND(RAND()*10000,2),
                FROM_UNIXTIME(UNIX_TIMESTAMP('2014-01-01 01:00:00')+FLOOR(RAND()*31536000))
             );
            SET i = i + 1;
        END WHILE;
END$$
DELIMITER ;

drop event run_info_now;
CREATE EVENT run_info_now
ON SCHEDULE AT CURRENT_TIMESTAMP
DO CALL generate_data();

SET GLOBAL event_scheduler = ON;

    CALL generate_data();
select format(count(*), 0) as total from cities;

alter table people add foreign key (city_id) references cities(id);
alter table cities add column people_id bigint null;
alter table cities add foreign key (people_id) references people(id);
alter table people add constraint ppl_city_id_fk foreign key (city_id) references cities(id);
alter table cities add constraint city_ppl_id_fk foreign key (people_id) references people(id);
