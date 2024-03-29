import bcrypt
from dbs.mongodb import genMongoConnection

def register(email='', password='', name=''):
    #connect to mongo database
    print(email)
    print(password)
    print(name)
    db = genMongoConnection()
    # check email, password, and name
    if email == '' or password == '' or name == '':
        return "Invalid input", 414
    
    # check db
    if db is None:
        return "There is no db", 500
    
    #get salt and hash password with bcrypt
    salt = bcrypt.gensalt()
    hashpwd = bcrypt.hashpw(f"{password}".encode(), salt)

    #check an user and insert or reject it
    collection = db['user']
    _user = collection.find_one({ 'email': email })
    if _user is not None:
        print('user already exist')
        return "Register failed", 414

    #insert new user
    document = {
        'email': email,
        'password': hashpwd,
        'name': name,
        'salt': salt
    }
    result = collection.insert_one(document)
    print('Inserted successfully: ', email)
    res = { 'status': True, 'user': name }
    return res, 200