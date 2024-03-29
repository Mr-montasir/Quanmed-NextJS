from docx import Document
from pdf2image import convert_from_path, convert_from_bytes
import datetime
from dotenv import load_dotenv
from dbs.mongodb import genMongoConnection

load_dotenv()
ALLOWED_EXTENSIONS = set(['docx', 'pdf', 'txt'])

MONGO_DB = genMongoConnection()


def allowedFile(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_file_to_mongo(name, file_type, text):
    collection = MONGO_DB['documents']
    success = False
    try:
        result = collection.insert_one({
            "file_name": name,
            "type": file_type,
            "text": text,
            "created_at": datetime.datetime.now()
        })
        success = True
    except Exception as e:
        success = False
    finally:
        return success
    

def uploadFile_OCR(filename, filetype, text):
    if(save_file_to_mongo(filename, filetype, text)):
        return {"status": True, "msg": "File is uploaded successfully." }, 200
    else:
        return {"status": False, "msg": "Uploading is failed." }, 424