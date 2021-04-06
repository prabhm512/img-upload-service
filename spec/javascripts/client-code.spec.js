// mock file
function MockFile() { };

MockFile.prototype.create = function (name, size, type) {
    name = name || "mock.txt";
    size = size || 1024;
    type = type || 'plain/txt';

    function range(count) {
        var output = "";
        for (var i = 0; i < count; i++) {
            output += "a";
        }
        return output;
    }

    var blob = new Blob([range(size)], { type: type });
    blob.lastModifiedDate = new Date();
    blob.name = name;

    return blob;
};

describe("script.js", function() {

    const mock = new MockFile();
    // describe("event", function() {
    //     it ("should invoke the file-input change event.", function() {
    //         spyOn(window, 'change').and.stub();
    //         // $('#file-input').trigger( "change" );
            
    //         // expect('change').toHaveBeenTriggeredOn();
    //         expect(window.on).toHaveBeenTriggeredOn('#file-input');
    //     });
    // })
    
    describe("startUpload", function() {

        // Test for files over 2MB
        it ("should not go into the process of getting a presigned request if uploaded file is over 2MB", function() {
            const file = mock.create("apple.jpg", 3000000, "image/jpg");

            startUpload(file);
            spyOn(window, 'getSignedRequest').and.stub();
            expect(window.getSignedRequest).not.toHaveBeenCalled();
        })

        // Tests for files that are not [jpg, jpeg, png, gif, bmp, tiff]
        it ("should not go into the process of getting a presigned request if uploaded file is not a [jpg, jpeg, png, gif, bmp, tiff]", function() {
            const file = mock.create("mock.txt", 1000000, "plain/txt");

            startUpload(file);
            spyOn(window, 'getSignedRequest').and.stub();
            expect(window.getSignedRequest).not.toHaveBeenCalled();
        })
    })
})