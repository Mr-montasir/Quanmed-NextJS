import psycopg2
from dotenv import load_dotenv
from dbs.postgres import genPostgresConnection

load_dotenv()

def storePhotoIntoDB(file=None, title='', category='', mime=''):
    # check file
    if file == None:
        return "Empty file", 424
    
    conn, cur = genPostgresConnection()
    try: 
        # Fire the CREATE query 
        cur.execute("""CREATE TABLE IF NOT EXISTS
            medical_bin(id BIGSERIAL, 
                    category VARCHAR(200), 
                    title VARCHAR(200) NOT NULL PRIMARY KEY,
                    mime VARCHAR(100),
                    data BYTEA)""")
            
    except(Exception, psycopg2.Error) as error: 
        # Print exception 
        print("Error while creating cartoon table", error)
    finally: 
        # Close the connection object 
        conn.commit()
    
    try:
        # Execute the INSERT statement 
        # Convert the image data to Binary 
        drawing = file.read()
        sql = "INSERT INTO medical_bin(title, category, mime, data) VALUES(%s, %s, %s, %s)"
        cur.execute(sql, (title, category, mime, psycopg2.Binary(drawing)))
        # Commit the changes to the database 
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as err:
        print("Error while inserting data in medical_bin table -> ", err)
        return "Insertion Error", 424
    finally:
        conn.close()
    
    return title, 200
