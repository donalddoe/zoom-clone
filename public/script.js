const socket = io('/')


const videoGrid = document.getElementById('video-grid');

const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
}); 

let myVideoStream
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream =>{
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})

//  socket.on("user-connected", (userId) => {
//       console.log("user connected.,..........");
//       setTimeout(function ()
//         {
//           connectToNewUser(userId, stream);
//         },5000
//       )

socket.on('user-connected', (userId) => {
    console.log("user connected.,..........");
    setTimeout(function ()
      {
        connectToNewUser(userId, stream);
      },5000
    )
})

const connectToNewUser = (userId) => {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
  })
}


const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}