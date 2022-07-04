TimescaleDB installation on mac:

https://flaviocopes.com/postgres-how-to-install/

```

brew install postgresql
brew services start postgresql


# brew upgrade postgresql
# brew postgresql-upgrade-database
# brew services restart postgresql

psql postgres

```

Install timescaledb:
https://docs.timescale.com/install/latest/self-hosted/installation-macos/#install-self-hosted-timescaledb-using-homebrew


```console
brew tap timescale/tap
brew install timescaledb

# different from the tutorial:
timescaledb-tune -conf-path /usr/local/var/postgres/postgresql.conf --yes

# depending on 
cd /usr/local/Cellar/timescaledb/2.7.0/bin
 ./timescaledb_move.sh 
brew services restart postgresql

```


Setting up the TimescaleDB extension


```
psql postgres -c "CREATE DATABASE tsdb WITH ENCODING 'UTF8'"

psql postgres -h localhost
# then in there
\c tsdb
CREATE EXTENSION IF NOT EXISTS timescaledb;
\dx
```
should display
```
    Name     | Version |   Schema   |                            Description                            
-------------+---------+------------+-------------------------------------------------------------------
 plpgsql     | 1.0     | pg_catalog | PL/pgSQL procedural language
 timescaledb | 2.7.0   | public     | Enables scalable inserts and complex queries for time-series data
```




Create postgres user:
`/usr/local/Cellar/postgresql/14.4/bin/createuser -s postgres` or `/usr/local/opt/postgres/bin/createuser -s postgres`

then now `psql -U postgres  -h localhost -d tsdb` works

