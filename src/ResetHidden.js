import React from 'react'

export default function ResetHidden () {
    var hiddenElements = document.getElementsByClassName('hidden');
    for (var i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].style.display = 'none';
    }
}