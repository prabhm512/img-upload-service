from flask import Flask, render_template, request, redirect, url_for
import os, json, boto3, zipfile
from io import BytesIO

app = Flask(__name__)


# Listen for GET requests to yourdomain.com/account/
@app.route("/")
def account():
    # Show the account-edit HTML page:
    return render_template('index.html')

# Listen for GET requests to yourdomain.com/sign_s3/
@app.route('/sign-s3/')
def sign_s3():
    # Load necessary information into the application
    # S3_BUCKET = os.environ.get('S3_BUCKET')

    # Load required data from the request
    file_name = request.args.get('file-name')
    file_type = request.args.get('file-type')

    if file_type == "application/x-zip-compressed": 
        S3_BUCKET = os.environ.get('ZIP_BUCKET')
    else: 
        S3_BUCKET = os.environ.get('S3_BUCKET')


    # Initialise the S3 client
    s3 = boto3.client('s3')

    # Generate and return the presigned URL
    presigned_post = s3.generate_presigned_post(
        Bucket = S3_BUCKET,
        Key = file_name,
        Fields = {"acl": "public-read", "Content-Type": file_type},
        Conditions = [
            {"acl": "public-read"},
            {'Content-Type': file_type},
            ["content-length-range", 100, 10000000]
        ],
        ExpiresIn = 31536000
    )
    # Return the data to the client
    return json.dumps({
        'data': presigned_post,
        'url': 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET, file_name)
    })

# Main code
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port = port)