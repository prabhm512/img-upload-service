// All links uploaded by a user
const links = [];

/*
    Function to carry out the actual POST request to S3 using the signed request from the Python app.
*/
function uploadFile(file, s3Data, url){

    const xhr = new XMLHttpRequest();
    xhr.open('POST', s3Data.url);
    xhr.setRequestHeader('x-amz-acl', 'public-read');

    const postData = new FormData();
    for(key in s3Data.fields){
        postData.append(key, s3Data.fields[key]);
    }
    postData.append('file', file);

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200 || xhr.status === 204){
                document.getElementById('preview').src = url;
                document.getElementById('avatar-url').value = url;
                // Push links into array
                links.push(url);
                // Update localStorage
                localStorage.setItem('imgLinks', JSON.stringify(links));
                document.getElementById('links').innerHTML += `<a href='${url}' target="blank">${url}</a><br>`;
            }
            else{
                alert('Could not upload file.');
            }
        }
    };
    xhr.send(postData);
}

/*
    Function to get the temporary signed request from the Python app.
    If request successful, continue to upload the file using this signed
    request.
*/
function getSignedRequest(file){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                const response = JSON.parse(xhr.responseText);

                uploadFile(file, response.data, response.url);
            }
            else{
                return 'Could not get signed URL.';
            }
            // console.log(file);
        }
    };
    xhr.send();
    }

/*
    Function called when file input updated. If there is a file selected, then
    start upload procedure by asking for a signed request from the app.

    ** mockFile parameter passed in for testing purposes. A mock file is created in jasmine
    and passed into this function to test the output. The parameter is not used in the
    microservice.
*/
function startUpload(mockFile = 0) {
    let files, file;
    let error = "";

    if (mockFile === 0) {
        document.getElementById("error").innerHTML = "";
        files = document.getElementById('file-input').files;
        file = files[0];
    } 
    else {
        file = mockFile;
    }
    
    if(!file){
        error += 'No file selected';
    }

    if (file === undefined) {
        error += "Please select a file."
    }

    // Do not get signed request if file does not meet following criteria.
    if (file.size > 2000000) {
        error += "File size must be under 2MB!";
    } 
    // Only allow image files
    else if (file.type==="image/jpg" || file.type==="image/jpeg" || file.type==="image/png" || file.type==="image/gif" || file.type==="image/bmp" || file.type==="image/tiff") {
        getSignedRequest(file);
    }
    else {
        error += "Only image files can be uploaded!"; 
    }
    if (error !== "" && mockFile===0) {
        document.getElementById("error").innerHTML = error
    }
}
// Links should persist
function init() {
    let storedLinks;

    // Retrieve existing links from localStorage
    if (localStorage.imgLinks) {
        document.getElementById('links').innerHTML = "";
        storedLinks = JSON.parse(localStorage.getItem("imgLinks")); 

        // Render links on DOM
        for (let i=0; i<storedLinks.length; i++) {
            links.push(storedLinks[i]);
            document.getElementById('links').innerHTML += `<a href='${storedLinks[i]}' target="blank">${storedLinks[i]}</a><br>`;
        }
    } 
}

/*
    Bind listeners when the page loads.
*/
// (() => {
//     document.getElementById("file-input").addEventListener("change", function() {
//         startUpload();
//     })
// })();

$(document).ready(() => {
    init();
    $('#file-input').on("change", () => {
        startUpload();
    });   
})
    

