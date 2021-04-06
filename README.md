# Image Upload Service
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## User Story

In order to store and use my pictures online (or through a "Service"),<br>
As an Anonymous user,<br>
I want to attach a picture to the Service,
And I want to have a permanent link to this picture,<br>
Otherwise, I want to be rejected and informed if the file is not a picture. 

## <b>Demonstration</b>

Please open this link to view a demonstration of the app, brief application flow explanation and a summary of the major problems I faced:
<a href="https://drive.google.com/file/d/1f3O_DXUrkyQsZB2tCtoJUk3eL8wohpOR/view?usp=sharing">View Video demonstration</a>

**Please open this link to access the deployed application:**
<a href="https://image-upload-sr.herokuapp.com/">View Deployment</a>

## Installation

1. Clone this repository: `git clone https://github.com/prabhm512/img-upload-service.git`
2. Change to the repo directory
3. Run `pip install -r requirements.txt` to install all dependencies
4. Create two S3 buckets.
5. Add this code to the CORS policy of both S3 buckets and make sure public access is allowed.
`[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD",
            "POST",
            "PUT"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]`
6. Create a .env file and add the following code to it.

    AWS_ACCESS_KEY_ID=`your access key`<br>
    AWS_SECRET_ACCESS_KEY=`your secret access key`<br>
    S3_BUCKET=`first S3 bucket`<br>
    ZIP_BUCKET=`second S3 bucket`<br>

7. Run `python wsgi.py` to start the server. Navigate to `http://localhost:5000/`

## Tests

<a href="https://github.com/prabhm512/img-upload-service/tree/master/spec/javascripts">Folder containing test scripts</a>

Running tests:

- Run `pip install -r requirements.txt` to install all dependencies if you have not already.
- Run `jasmine server` in the root directory to start the test server.
- Navigate to `http://127.0.0.1:8888/` to view the tests


## Tech Stack 

- AWS S3
- AWS Lambda
- AWS IAM
- Python 
- Flask
- HTML, CSS, JavaScript
- Jasmine

## Author

<a href="https://github.com/prabhm512">Prabh Singh</a>

## Questions 

If you have any questions about this app, about installation or anything else, please send me an email at prabhm512@gmail.com
