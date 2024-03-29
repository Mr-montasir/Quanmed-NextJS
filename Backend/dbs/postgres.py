import psycopg2
import os

def genPostgresConnection():
    host = os.getenv('POSTGRES_HOST')
    port = os.getenv('POSTGRES_PORT')
    user = os.getenv('POSTGRES_USER')
    password = os.getenv('POSTGRES_PASSWORD')
    dbname = os.getenv('POSTGRES_DBNAME')

    conn = None

    try:
        print('host: ', host, ' port: ', port, ' dbname: ', dbname)
        conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
        cur = conn.cursor()
    except Exception as ex:
        print('mongodb connection error!')
        print('In more detail: ', ex)
    return conn, cur