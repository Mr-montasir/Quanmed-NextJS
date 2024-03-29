import jwt
import bcrypt
import datetime
import json
import os
from dotenv import load_dotenv
from dbs.mongodb import genMongoConnection

load_dotenv()

jwt_secret = os.getenv('JWT_SECRET')

def loginWithEmailAndPwd(email='', password=''):
    #connect to mongo database
    db = genMongoConnection()
    # check email and password
    if email == '' or password == '':
        return "Invalid input", 414
    
    print('email: ', email, ' password: ', password)
    # check db
    if db is None:
        return "There is no db", 500
    
    # get collection from db instance
    collection = db['user']
    print('got collection')
    result = collection.find_one({ 'email': email })

    # process the result
    if result is not None:
        if bcrypt.checkpw(f"{password}".encode(), result['password']):
            print('user logged in: ', result)
            print('jwt_secret: ', jwt_secret)
            algorithm = 'HS256'
            payload = {
                'email': email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }
            token = jwt.encode(payload, jwt_secret, algorithm)
            user = json.dumps({
                    'name': result['name'],
                    'email': result['email'],
                })
            res = {
                'message': 'Logged in Successfully',
                'token': token,
                'user': user
            }
            return res, 200
        else:
            return 'Incorrect password', 414
    else:
        return 'Invalid user', 414
    
def loginWithWallet(wallet=''):
    # check wallet
    if wallet == '':
        return "Empty wallet", 414
    
    algorithm = 'HS256'
    payload = {
        'key': wallet,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, jwt_secret, algorithm)
    print('login with wallet success! toekn=', token)
    return token, 200