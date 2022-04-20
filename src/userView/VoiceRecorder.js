import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";

export class VoiceRecorder {
    constructor() {
        this.mediaRecorder
        this.stream
        this.chunks = []
        this.isRecording = false
        this.recorderRef = document.querySelector("#recorder");
        this.playerRef = document.querySelector("#recorder");
        this.startRef = document.querySelector("#start");
        this.stopRef = document.querySelector("#stop");
        this.startRef.onclick = this.startRecording.bind(this);
        this.stopRef.onclick = this.stopRecording.bind(this);
        this.constraints = {
            audio: true,
            video: false
        }
    }

    // sucess
    handleSucess(stream) {
        this.stream = stream
        this.stream.oninactive = () => {
            console.log("stream ended");
        }
        this.recorderRef.srcObject = this.stream
        this.mediaRecorder = new MediaRecorder(this.stream)
        this.mediaRecorder.ondataavailable = this.onMediaRecorderDataAvialable.bind(this);
        this.mediaRecorder.onstop = this.onMediaRecorderStop.bind(this);
        this.recorderRef.play();
        this.mediaRecorder.start();
    }

    onMediaRecorderDataAvialable(e) { this.chunks.push(e.data) }

    onMediaRecorderStop(e) {
        const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codesc=opus' });
        const audioURL = window.URL.createObjectURL(blob);
        this.playerRef.src = audioURL;
        this.chunks = []
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
    }

    startRecording() {
        if (this.isRecording) return;
        this.isRecording = true;
        this.startRef.innerHTML = "Recording...";
        this.playerRef.src = '';
        navigator.mediaDevices.getUserMedia(this.constraints)
            .then(this.handleSucess.bind(this)).catch(this.handleSucess.bind(this));
    }

    stopRecording() {
        if (!this.isRecording) return;
        this.isRecording = false;
        this.startRef.innerHTML = "Record";
        this.recorderRef.pause();
        this.mediaRecorder.stop();
    }
}