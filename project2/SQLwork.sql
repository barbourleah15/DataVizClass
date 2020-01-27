CREATE TABLE temperature (
  id SERIAL PRIMARY KEY,
  MonthTemp INT,
  AvgTemp DOUBLE PRECISION
);
CREATE TABLE drinking (
  id SERIAL PRIMARY KEY,
  MonthRecorded DATE,
  MonthlySales INT
);
ALTER TABLE temperature ALTER COLUMN MonthTemp TYPE text;
update temperature set MonthTemp = to_date(MonthTemp::TEXT, 'YYYYMM');

ALTER TABLE drinking ALTER COLUMN MonthRecorded TYPE text;

select * from temperature;
select * from drinking;

CREATE TABLE temps_alcoholsales AS
SELECT a.*, b.monthlysales, b.monthrecorded
    FROM temperature a, drinking b
    WHERE MonthTemp = MonthRecorded;