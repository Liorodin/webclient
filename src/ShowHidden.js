import React from 'react'

export default function ShowHidden() {
    var flag = 1;
    var inputs = document.getElementsByTagName('input');
    var hiddenElements1 = document.getElementsByClassName('hidden');
    for (var i = 0; i < inputs.length - 1; i++) {
        if (inputs[i].value.length == 0) {
            hiddenElements1[i].style.display = 'block';
            flag = 0;
        }
    }
    return flag;
}