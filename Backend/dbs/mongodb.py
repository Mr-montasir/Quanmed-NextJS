from pymongo import MongoClient
import os

def genMongoConnection():
    host = os.getenv('MONGO_HOST')
    port = os.getenv('MONGO_PORT')
    dbname = os.getenv('MONGO_DBNAME')

    conn = None

    try:
        print('host: ', host, ' port: ', port, ' dbname: ', dbname)
        clinet = MongoClient(host=host, port=int(port))
        conn = clinet[dbname]
    except Exception as ex:
        print('mongodb connection error!')
        print('In more detail: ', ex)
    return conn
