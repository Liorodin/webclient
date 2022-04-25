import React from 'react'
import { useNavigate } from "react-router-dom";

export function SettingsModal() {
    let navigate = useNavigate();

    document.addEventListener("input", () => {
        if (document.getElementById('color1') && document.getElementById('color2')) {
            var color1 = document.getElementById('color1').value;
            var color2 = document.getElementById('color2').value;
            document.documentElement.style.setProperty('--firstColor', color1);
            document.documentElement.style.setProperty('--firstColorFaded', color1 + "AA");
            document.documentElement.style.setProperty('--secondColor', color2);
        }
    });

    const logOut = () => {
        localStorage.setItem('currentUser', JSON.stringify('default user'));
        localStorage.setItem('currentContact', JSON.stringify(''));
        navigate("/");
    }
    const resetSettings = () => {
        document.documentElement.style.setProperty('--firstColor', '#E73C7E');
        document.documentElement.style.setProperty('--firstColorFaded', '#E73C7EAA');
        document.documentElement.style.setProperty('--secondColor', '#EE7752');
        document.documentElement.style.setProperty('--secondColorFaded', '#EE7752CC');
        document.getElementById("massage-box").style.backgroundImage = "url('app.webp')";
        document.getElementById('background_input').value = '';

    }

    const background_input = document.getElementById("background_input");
    if (background_input) {
        background_input.addEventListener("change", function () {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                document.getElementById("massage-box").style.backgroundImage = "url(" + reader.result + ")";
            });
            reader.readAsDataURL(this.files[0]);
        })
    }

    return (
        <div className="modal fade" id="settings-modal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Settings</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label>Change your websites theme:</label>
                        <input id="color1" type="color" name="color1" defaultValue="#E73C7E" />
                        <input id="color2" type="color" name="color2" defaultValue="#EE7752" />
                    </div>

                    <div className="modal-background">
                        <label>Change your chats background:</label>
                        <input type="file" id="background_input" accept="image/*"></input>
                    </div>

                    <div className="modal-footer center">
                        <button type="button" onClick={resetSettings} className="btn btn-secondary" data-bs-dismiss="modal">Reset settings</button>
                        <button type="button" onClick={logOut} className="btn btn-secondary" data-bs-dismiss="modal">Log out</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AddContactModal({ AddNewContact, currentUser, setOpenChatCount }) {
    return (
        <div className="modal fade" id="addContact-modal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add new contact</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div id='modal-body' className="modal-body">
                        <input id="newContact" type="text" placeholder='Enter new contact by username'></input>
                        <div id='input-result'></div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button id='add-contact-btn' type="button" className="btn btn-primary" onClick={() => {
                            const resultDiv = document.getElementById('input-result');
                            resultDiv.innerHTML = '';
                            var returnValue = AddNewContact(currentUser, document.getElementById('newContact').value, setOpenChatCount);
                            if (returnValue == -1) {
                                resultDiv.style.color = 'red';
                                resultDiv.appendChild(document.createTextNode('Invalid contact username'));
                            }
                            if (returnValue == 1) {
                                resultDiv.style.color = 'red';
                                resultDiv.appendChild(document.createTextNode('Please enter contact username'));
                            }
                            if (returnValue == 2) {
                                resultDiv.style.color = 'red';
                                resultDiv.appendChild(document.createTextNode('Contact already exists in your list'));
                            }
                            if (returnValue == 0) {
                                resultDiv.style.color = 'green';
                                resultDiv.appendChild(document.createTextNode('You have successfully added a new contact'));
                            }
                        }}>Add now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ProfileImageModal({ sorce = "contactImage.webp" }) {
    document.addEventListener("change", () => {
        const img_input = document.getElementById("img_input");
        if (img_input) {
            var uploaded_image = "";
            img_input.addEventListener("change", function () {
                const reader = new FileReader();
                document.getElementById("post-img-btn").addEventListener("click", () => {
                    var profile = document.getElementById("profile");
                    profile.src = reader.result;
                })
                reader.addEventListener("load", () => {
                    uploaded_image = reader.result;
                    var previewPic = document.getElementById('preview-pic');
                    previewPic.src = uploaded_image;
                });
                reader.readAsDataURL(this.files[0]);
            })
        }
    })
    return (
        <div className="modal fade" id="addPicture-modal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Set profile picture</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className='preview-pic-div'>
                        <img src={sorce} id="preview-pic" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                        <input type="file" id="img_input" accept="image/*"></input>
                    </div>
                    <div className="modal-footer">
                        <button id="post-img-btn" type="button" className="btn btn-primary" data-bs-dismiss="modal">Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ChangeUserImageModal({ user, setter }) {
    const img_input = document.getElementById("img_input");
    if (img_input) {
        var uploaded_image = "";
        img_input.addEventListener("change", function () {
            const reader = new FileReader();
            document.getElementById("post-img-btn").addEventListener("click", () => {
                user.picture = reader.result;
                setter(prevValue => !prevValue);
            })
            reader.addEventListener("load", () => {
                uploaded_image = reader.result;
                var previewPic = document.getElementById('preview-pic');
                previewPic.src = uploaded_image;
            });
            reader.readAsDataURL(this.files[0]);
        })
    }
    var currentSrc = user.picture == 'avatar' ? "contactImage.webp" : user.picture;
    return (
        <div className="modal fade" id="addPicture-modal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Change profile picture</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className='preview-pic-div'>
                        <img src={currentSrc} id="preview-pic" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                        <input type="file" id="img_input" accept="image/*"></input>
                    </div>
                    <div className="modal-footer">
                        <button id="post-img-btn" type="button" className="btn btn-primary" data-bs-dismiss="modal">Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}