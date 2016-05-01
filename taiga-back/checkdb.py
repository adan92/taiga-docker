import os, sys, psycopg2

DB_NAME = os.getenv('POSTGRES_DB')
DB_HOST = os.getenv('POSTGRES_PORT_5432_TCP_ADDR') 
DB_USER = os.getenv('POSTGRES_USER')
DB_PASS = os.getenv('POSTGRES_PASSWORD') 

conn = psycopg2.connect("dbname='" + DB_NAME + "' user='" + DB_USER + "' host='" + DB_HOST + "' password='" + DB_PASS + "'")
cur = conn.cursor()

cur.execute("select * from information_schema.tables where table_name=%s", ('django_migrations',))
exists = bool(cur.rowcount)

if exists is False:
    print('Database does not appear to be setup.')
    sys.exit(2)
