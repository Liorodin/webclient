import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import Contact, { GetProfilePic, GetContactMessages, GetUser } from './Contact'
import { contactsList } from '../db/contactsList'
import { messages } from '../db/messages';
import { SettingsModal, AddContactModal, ChangeUserImageModal } from './Modals';

const newContactMap = new Map();
const checkOpenChat = (currentUser, currentContact) => {
  if (newContactMap.get(currentContact) != 0) {
    return;
  }
  for (var i = 0; i < contactsList.length; i++) {
    if (contactsList[i].username == currentContact) {
      if (!contactsList[i].contactsList.includes(currentUser)) {
        contactsList[i].contactsList.push(currentUser);
        newContactMap.set(currentContact, 1);
      }
      return;
    }
  }
}

const postTextMessage = (currentUser, currentContact, setter) => {
  var message = document.getElementById('post-message');
  if (message.value.length == 0) {
    return;
  }
  var messageTime = (new Date).getTime();
  GetContactMessages(currentUser, currentContact).push(
    {
      from: currentUser,
      type: 'text',
      content: message.value,
      time: messageTime,
    }
  );
  checkOpenChat(currentUser, currentContact);
  message.value = '';
  setter(prevValue => !prevValue);
  document.getElementById(currentContact).click();
}

const postPictureMessage = (currentUser, currentContact, setter) => {
  var picture = document.getElementById('preview-post-pic');
  if (null === picture) {
    return;
  }
  var messageTime = (new Date).getTime();
  GetContactMessages(currentUser, currentContact).push(
    {
      from: currentUser,
      type: 'picture',
      content: picture.src,
      time: messageTime,
    }
  );
  checkOpenChat(currentUser, currentContact);
  document.getElementById('picture_input').value = '';
  picture.src = '';
  picture.style.display = 'none';
  setter(prevValue => !prevValue);
  document.getElementById(currentContact).click();
}

const postVideoMessage = (currentUser, currentContact, setter) => {
  var video = document.getElementById('preview-post-video');
  if (null === video) {
    return;
  }
  video.pause();
  var messageTime = (new Date).getTime();
  GetContactMessages(currentUser, currentContact).push(
    {
      from: currentUser,
      type: video.type,
      content: video.src,
      time: messageTime,
    }
  );
  checkOpenChat(currentUser, currentContact);
  setter(prevValue => !prevValue);
  video.style.display = 'none';
  document.getElementById("video_input").value = '';
  document.getElementById(currentContact).click();
}

const postVoiceMessage = (currentUser, currentContact, setter) => {
  var audioMessage = document.getElementById('audio');
  if (null === audioMessage) {
    return;
  }
  var messageTime = (new Date).getTime();
  GetContactMessages(currentUser, currentContact).push(
    {
      from: currentUser,
      type: 'audio',
      content: audioMessage.src,
      time: messageTime,
    }
  );
  checkOpenChat(currentUser, currentContact);
  document.getElementById('recording-output').innerHTML = '';
  document.getElementById('saved-record').innerHTML = '';
  setter(prevValue => !prevValue);
  document.getElementById(currentContact).click();
}

const postCaptureMessage = (currentUser, currentContact, setter) => {
  var messageThis = (new Date).getTime();
  var canvas = document.getElementById('camera-canvas');
  var newVideo = document.getElementById('new-capture-video');
  GetContactMessages(currentUser, currentContact).push(
    {
      from: currentUser,
      type: newVideo ? 'video/webm' : 'picture',
      content: newVideo ? newVideo.src : canvas.toDataURL(),
      time: messageThis,
    }
  );
  if (newVideo) {
    document.getElementById('camera-zone').removeChild(newVideo);
  }
  checkOpenChat(currentUser, currentContact);
  setter(prevValue => !prevValue);
  document.getElementById(currentContact).click();
}

const postCaptureFunction = () => {
  var parts = [];
  var canvas = document.getElementById('camera-canvas');
  var video = document.getElementById('camera-mode');
  video.style.display = 'block';
  canvas.style.display = 'none';
  document.getElementById('retake-btn').style.display = 'none';
  document.getElementById('post-capture').style.display = 'none';
  document.getElementById('snap-photo').style.display = 'block';
  document.getElementById('record-video').style.display = 'block';
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      video.volume = 0;
      video.srcObject = stream;
      video.play();
      document.getElementById('snap-photo').onclick = () => {
        document.getElementById('record-video').style.display = 'none';
        document.getElementById('snap-photo').style.display = 'none';
        document.getElementById('retake-btn').style.display = 'block';
        document.getElementById('post-capture').style.display = 'block';
        canvas.getContext('2d').drawImage(video, 0, 0, 400, 300);;
        video.style.display = 'none';
        canvas.style.display = 'block';
      }
      document.getElementById('record-video').onclick = () => {
        document.getElementById('record-video').style.display = 'none';
        document.getElementById('snap-photo').style.display = 'none';
        document.getElementById('stop-record-video').style.display = 'block';
        var mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start(1000);
        mediaRecorder.ondataavailable = (e) => { parts.push(e.data) }
      }
      document.getElementById('stop-record-video').onclick = () => {
        document.getElementById('stop-record-video').style.display = 'none';
        document.getElementById('post-capture').style.display = 'block';
        document.getElementById('retake-btn').style.display = 'block';
        const blob = new Blob(parts, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        var newVideo = document.createElement('video');
        newVideo.controls = true;
        newVideo.src = url;
        newVideo.id = 'new-capture-video';
        video.style.display = 'none';
        document.getElementById('camera-zone').appendChild(newVideo);
        document.getElementById('retake-btn').addEventListener('click', () => {
          document.getElementById('camera-zone').removeChild(newVideo);
        })
      }
      document.getElementById('addCamera-modal').addEventListener('hidden.bs.modal', () => {
        stream.getTracks().forEach(track => track.stop());
        var tempVid = document.getElementById('new-capture-video')
        if (tempVid) {
          document.getElementById('camera-zone').removeChild(tempVid);
        }
      })
    })
  }
}

function postImageFunction() {
  const img_input = document.getElementById("picture_input");
  if (img_input) {
    var uploaded_image = "";
    img_input.addEventListener("change", function () {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        var previewPic = document.getElementById('preview-post-pic');
        previewPic.src = uploaded_image;
        previewPic.style.display = 'block';

      });
      reader.readAsDataURL(this.files[0]);
    })
  }
}

function postVideoFunction() {
  const video_input = document.getElementById("video_input");
  if (video_input) {
    video_input.addEventListener("change", function () {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        var video = document.getElementById('preview-post-video');
        video.type = this.files[0].type;
        video.src = reader.result;
        video.style.display = 'block';
      });
      reader.readAsDataURL(this.files[0]);
    })
  }
}

const postVoiceFunction = () => {
  document.getElementById('start').onclick = () => {
    document.getElementById('start').style.display = 'none';
    document.getElementById('stop').style.display = 'block';
    var output = document.getElementById('recording-output');
    var saved = document.getElementById('saved-record');
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      output.innerHTML = '';
      saved.innerHTML = '';
      output.appendChild(document.createTextNode('recording...'))
      document.getElementById('trashCan').style.display = 'none';
      var mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      var chuck = [];
      mediaRecorder.addEventListener("dataavailable", e => {
        chuck.push(e.data);
      });
      mediaRecorder.addEventListener("stop", () => {
        var blob = new Blob(chuck);
        var audioURL = URL.createObjectURL(blob);
        var audio = new Audio(audioURL);
        audio.id = 'audio'
        audio.setAttribute("controls", 1);
        output.innerHTML = '';
        output.appendChild(document.createTextNode('saved recording'))
        document.getElementById('saved-record').appendChild(audio);
        document.getElementById('trashCan').style.display = 'block';
      });
      document.getElementById('stop').onclick = () => {
        document.getElementById('stop').style.display = 'none';
        document.getElementById('start').style.display = 'block';
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    })
  }
}

const getContacts = (userContacts, currentContact, displayNameSetter) => {
  const loggedUsername = JSON.parse(localStorage.getItem("currentUser"));
  const list = [];
  if (userContacts == null) return;
  for (var i in userContacts) {
    list.push(<Contact key={i} user={userContacts[i]} displayNameSetter={displayNameSetter} currentContact={currentContact} />);
  }

  list.sort((contact1, contact2) => {
    var message1 = GetContactMessages(contact1.props.name, loggedUsername).at(-1);
    var message2 = GetContactMessages(contact2.props.name, loggedUsername).at(-1);
    if (message1 && message2) {
      if (message1.time - message2.time > 0) {
        return -1
      }
      else if (message1.time - message2.time < 0) {
        return 1
      }
      return 0
    }
    return -1
  })
  return list;
}

/* Adds a new contact to user's contact list.
*  Returns 1 if input is empty, -1 if it's a non valid username, 2 if the contact already exists, 0 otherwise
*/
const AddNewContact = async (contactInfo) => {
  if (!(contactInfo.id && contactInfo.name && contactInfo.server)) {
    return 1;
  }
  const token = JSON.parse(localStorage.getItem("userToken"));
  const res = await axios(
    {
      method: 'post',
      url: `https://localhost:7290/api/contacts/`,
      headers: {
        'content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data:
      {
        id: contactInfo.id,
        name: contactInfo.name,
        server: contactInfo.server,
      }
    }).catch(res => 2);
  document.getElementById('newContact').value = '';
  document.getElementById('newContactName').value = '';
  document.getElementById('newContactServer').value = '';
  if (res == 2) return 2;
  if (res.status == 201) return 0;
  return -1;
}

const userProfile = (user, setter) => {
  //const loggedUser = GetUser(name);
  if (user == null) return;
  return (
    <div className='user-profile'>
      <div data-bs-toggle="modal" data-bs-target="#addPicture-modal">
        {GetProfilePic(user)}
      </div>
      <div id='user-fullName'>{user.nickname}</div>
      <div className='new-contact-btn'>
        <svg xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            var addDisplay = document.getElementById('add-contact');
            if (addDisplay) {
              addDisplay.style.display = 'flex';
            }
          }} width="30" height="30" fill="currentColor" className="bi bi-person-plus" data-bs-toggle="modal" data-bs-target="#addContact-modal" viewBox="0 0 16 16">
          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
          <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
        </svg>
      </div>
      <ChangeUserImageModal user={user} setter={setter} />
    </div>
  )
}

const contactProfile = (user) => {
  return (
    <div id='contact-profile'>
      <div className='pic'>
        {user != '' ? GetProfilePic(user) : ''}
      </div>
      {user != '' ? user.name : ''}
    </div>
  )
}

const getChatOptions = () => document.getElementById('dropup-content').style.display = 'block';
const closeChatOptions = () => document.getElementById('dropup-content').style.display = 'none';

export default function UserView({ currentUser }) {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userContacts, setUserContacts] = useState(null);
  const [timeInterval, setTimeInterval] = useState(0);
  const [openChatCount, setOpenChatCount] = useState(0);
  useEffect(() => {
    const loggedUsername = JSON.parse(localStorage.getItem("currentUser"));
    const getUserData = async () => {
      await axios(
        {
          method: 'post',
          url: 'https://localhost:7290/api/Users/User',
          headers: {
            'content-Type': 'application/json',
          },
          params: {
            username: loggedUsername,
          },
        }).then(res => setLoggedUser(res.data));
    }
    getUserData();
    getUserContacts();
  }, [openChatCount])

  useEffect(() => {
    setInterval(() => {
      setOpenChatCount(prevValue => !prevValue);
    }, 30000)
  }, [])
  const [currentContact, setCurrentContact] = useState('');

  const getUserContacts = async () => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    await axios(
      {
        method: 'get',
        url: 'https://localhost:7290/api/Contacts',
        headers: {
          'content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      }).then(res => setUserContacts(res.data))
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && window.location.href.split('/').at(-1) == 'chatview') {
      const from = JSON.parse(localStorage.getItem('currentUser'));
      const to = JSON.parse(localStorage.getItem('currentContact'));
      if (!(from && to)) {
        return;
      }
      postTextMessage(from, to, setOpenChatCount)
    }
  });

  return (
    <div className='container'>
      <div className='user-side'>
        <div className='user-side-top'>{userProfile(loggedUser, setOpenChatCount)}</div>
        <div id='contact-box'>
          {/* <div className='space'></div> */}
          {getContacts(userContacts, currentContact, setCurrentContact)}
        </div>
      </div>
      <div className='contact-side'>
        {contactProfile(currentContact)}
        <ol className="messages massage-box" id='massage-box'>
          <div id='welcome'><span>Welcome to Shirin's and Leonardo's WebClient</span></div>
        </ol>
        <div id='bottom-bar'>
          <div id="chat-grid">
            <div id='chat-item1'>
              <div id="dropup-content" onMouseLeave={closeChatOptions}>
                <a onClick={postCaptureFunction} data-bs-toggle="modal" data-bs-target="#addCamera-modal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                  </svg></a>
                <a onClick={postImageFunction} data-bs-toggle="modal" data-bs-target="#addPic-modal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                  </svg></a>
                <a onClick={postVideoFunction} data-bs-toggle="modal" data-bs-target="#addVideo-modal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-reels" viewBox="0 0 16 16">
                  <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                  <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z" />
                  <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg></a>
                <a onClick={postVoiceFunction} data-bs-toggle="modal" data-bs-target="#addVoice-modal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
                  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                </svg></a>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" onClick={getChatOptions} width="25" height="25" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
              </svg>
            </div>
            <div id='chat-item2'>
              <input id='post-message' className='message-input grid2' type="text" placeholder="Type a message..." />
            </div>
            <div id='chat-item3'>
              <svg xmlns="http://www.w3.org/2000/svg" onClick={() => postTextMessage(JSON.parse(localStorage.getItem('currentUser')), JSON.parse(localStorage.getItem('currentContact')), setOpenChatCount)} width="25" height="25" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <img src='settings.png' style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#settings-modal" />
      <SettingsModal />
      {/* adding new contact */}
      <AddContactModal AddNewContact={AddNewContact} setOpenChatCount={setOpenChatCount} />
      {/* adding a voice message */}
      <div className="modal fade" id="addVoice-modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Send voice message</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="record-buttons">
              <div>
                <button id="start">Start Recording</button>
                <button style={{ display: 'none' }} id="stop">Stop Recording</button>
              </div>
              <span id="recording-output" />
              <div style={{ width: '350px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div id='saved-record' style={{ marginTop: '10px' }} />
                <svg id='trashCan' style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16"
                  onClick={() => {
                    document.getElementById('recording-output').innerHTML = '';
                    document.getElementById('saved-record').innerHTML = '';
                    document.getElementById('trashCan').style.display = 'none';
                  }}>
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
              </div>
            </div>
            <div className="modal-footer">
              <button id='post-record-btn' type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                postVoiceMessage(currentUser, currentContact, setOpenChatCount)
                document.getElementById('trashCan').style.display = 'none';
              }}>Send</button>
            </div>
          </div>
        </div>
      </div>
      {/* adding a picture */}
      <div className="modal fade" id="addPic-modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Send picture</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='preview-pic-div'>
              <img id="preview-post-pic" style={{ display: 'none' }} />
              <input type="file" id="picture_input" accept="image/*"></input>
            </div>
            <div className="modal-footer">
              <button id='post-pic' type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() =>
                postPictureMessage(currentUser, currentContact, setOpenChatCount)} >Send</button>
            </div>
          </div>
        </div>
      </div>
      {/* adding a video */}
      <div className="modal fade" id="addVideo-modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Send video</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id='preview-video-div' className="large-8 columns">
              <video id="preview-post-video" style={{ display: 'none' }} controls>
              </video>
              <input type="file" id="video_input" accept="video/*"></input>
            </div>
            <div className="modal-footer">
              <button id='post-video' type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                postVideoMessage(currentUser, currentContact, setOpenChatCount)
              }}>Send</button>
            </div>
          </div>
        </div>
      </div>
      {/* creating a photo video */}
      <div className="modal fade" id="addCamera-modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Send photo or video</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='flex-center' id='camera-zone'>
              <video id='camera-mode' autoPlay></video>
              <canvas id='camera-canvas' width={400} height={300}></canvas>
            </div>
            <div className="modal-footer">
              <button id='retake-btn' type="button" className="btn btn-primary" onClick={postCaptureFunction}>Retake</button>
              <button id='stop-record-video' type="button" className="btn btn-primary" >Stop recording</button>
              <button id='record-video' type="button" className="btn btn-primary">Record</button>
              <button id='snap-photo' type="button" className="btn btn-primary">Capture</button>
              <button id='post-capture' type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                postCaptureMessage(currentUser, currentContact, setOpenChatCount)
              }}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}