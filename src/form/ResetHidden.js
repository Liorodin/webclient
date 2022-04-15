import React from 'react'

export default function ResetHidden () {
    var hiddenElements = document.getElementsByClassName('hidden');
    var hiddenElements1 = document.getElementsByClassName('hidden1');
    for (var i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].style.display = 'none';
        hiddenElements1[i].style.display = 'none';
    }
}