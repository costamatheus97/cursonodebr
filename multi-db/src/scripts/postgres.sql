  /* delete table if exists */
  DROP TABLE IF EXISTS TB_HEROES
  

 /* create table called TB_HEROES */
  CREATE TABLE TB_HEROES (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NAME TEXT NOT NULL,
    POWER TEXT NOT NULL
  )

  --create

  /* inserting data into table TB_HEROES, where the arguments follow the order */
  INSERT INTO TB_HEROES (NAME, POWER)
  VALUES ('A-train', 'Speed'), 
  ('Homelander', 'Indestructible'), 
  ('Deep', 'Water')

  --read

 /* select all from table heroes */
  SELECT * FROM TB_HEROES;

 /* select homelander from table heroes */
  SELECT * FROM TB_HEROES WHERE NAME='Homelander';

 /* select homelander power from table heroes */
  SELECT POWER FROM TB_HEROES WHERE NAME='Homelander';

  --update

 /* update field in table TB_HEROES by id */
  UPDATE TB_HEROES
  SET NAME='Goku', POWER='Invincible' /* MUST BE SINGLE QUOTES */
  WHERE ID=1;

  --delete

  /* delete field from tablename where id equals field id*/
  DELETE FROM TB_HEROES WHERE ID=2