from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import os
#controllers
from controllers.auth.login import loginWithEmailAndPwd, loginWithWallet
from controllers.auth.register import register
from controllers.medical.upload.PhotoUpload import storePhotoIntoDB
from controllers.medical.upload.FileUpload import uploadFile_OCR
from controllers.langchain.chat import run_conversational_retrieval
from dbs.mongodb import genMongoConnection

load_dotenv()
#initialize app
app = Flask(__name__)
app.secret_key = os.getenv('APP_SECRET_KEY')

#cors
CORS(app)

###
# routers
###

@app.route('/', methods=['GET'])
def index():
    return jsonify({ 'msg': 'Hello world! I am Quanmed smart server.' })

@app.route('/api/v1/auth/login', methods=['POST'])
def authLogin():
    body = request.get_json()
    result, status = loginWithEmailAndPwd(body['email'], body['password'])
    return jsonify({ 'result': result, 'status': True }), status

@app.route('/api/v1/auth/loginwithwallet', methods=['POST'])
def authLoginWithWallet():
    body = request.get_json()
    result, status = loginWithWallet(body['info'])
    return jsonify({ 'token': result, 'status': True }), status

@app.route('/api/v1/auth/register', methods=['POST'])
def authRegister():
    body = request.get_json()
    result, status = register(body['email'], body['password'], body['name'])
    return jsonify({ 'status': True, 'result': result }), status

@app.route('/api/v1/medical/upload/photo', methods=['POST'])
def uploadMedicalImage():
    if 'file' not in request.files:
        return 'No file uploaded', 424
    file = request.files['file']

    if file.filename == '':
        return 'No selected file', 424
    
    body = request.form
    print(body)
    
    result, status = storePhotoIntoDB(file, title=body['title'], category=body['category'], mime=body['mime'])
    return jsonify({ 'photo': result }), status

@app.route('/api/v1/medical/upload/file', methods=['POST'])
def upload():
    body = request.get_json()
    result, status = uploadFile_OCR(filename= body['file_name'], filetype= body['type'], text= body['text'])
    return jsonify(result), status

@app.route('/api/chat', methods=['POST'])
def fetchOpenAIResponseWithPinecone():
    print("chat...")
    body = request.get_json()
    print("body: ", body)
    question, history = body['question'], body['history']
    new_history = []
    for dialgue in history:
        new_history.append(tuple(dialgue))
    response = run_conversational_retrieval(question, new_history)
    # data = { "text": response, "sourceDocuments": sourceDocuments }
    print(response)
    return jsonify({'text': response})

# @app.route('/')
# def renderHome():
#     return render_template('index.html')

#run app
if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=8000)
    genMongoConnection()