var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("voiceToText").innerHTML = "";
    recognition.start();
}
recognition.onresult = function(event) {
    console.log(event);
    var content = event.results[0][0].transcript;

    console.log(content);

    document.getElementById("voiceToText").innerHTML = content;
    if (content == "take my selfie") {
        console.log("clicking picture");
        speak();
    }
}


function speak() {
    var synth = window.speechSynthesis;
    var speechBack = "Taking your selfie in three seconds";
    var utterThis = new SpeechSynthesisUtterance(speechBack);
    synth.speak(utterThis);
    Webcam.attach(camera1);
    setTimeout(function() {
        takeSnapshot();
        save();
    }, 3000);
}

camera1 = document.getElementById("camera");

Webcam.set({
    width: 500,
    height: 350,
    image_format: 'png',
    png_quality: 95
});

function takeSnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="userImage" src="' + data_uri + '">';
    })
}

function save() {
    a = document.getElementById("anchor");
    image = document.getElementById("userImage").src;
    a.href = image;
    a.click();
}