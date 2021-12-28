song1 = "";
song2 = "";
score_leftWrist = 0;
leftwristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
status_song1 = "";

function preload(){
    song1 = loadSound("believer.mp3");
    song2 = loadSound("dance_monkey.mp3");
}
function setup(){
    canvas = createCanvas(470,450);
    canvas.position(430,185);
    video = createCapture(VIDEO);
    video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0,0, 470,450);
    fill('#FC0303');
    stroke('#FC0303');
    status_song1 = song1.isPlaying();
    if(score_leftWrist > 0.2){
        circle(leftWristX,leftWristY,35);
        song2.stop();
    }
        if(status_song1 == "false"){
            song1.play();
          }
          else{
            document.getElementById("songname").innerHTML = "Playing : Believer";
          }
}
function modelLoaded(){
console.log('PoseNet is initialized');
}
function gotPoses(results){
if(results.length > 0){
    console.log(results);
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

    score_leftWrist = results[0].pose.keypoints[9].score;

}
}
function play(){
    song1.play();
}