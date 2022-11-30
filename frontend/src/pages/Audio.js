import React from 'react';
import Mann from '../audioClips/Mann.mp3';
import Maiyya from '../audioClips/Maiyya.mp3';
import ishq from '../audioClips/ishq.mp3';
import {Howl,Howler} from 'howler';

const audioClips = [
    {sound: Mann, label: 'Play'},
    {sound: Maiyya, label: 'Play'},
    {sound: ishq, label: 'Play'}
  ]

export default function Audio() {
    const SoundPlay = (src) => {
        const sound = new Howl({
          src
        })
        sound.play();
  }

  const RenderButtonAndSound =()=>{
    return audioClips.map((soundObj, index) => {
      return(
        <button key={index} onClick={()=> SoundPlay(soundObj.sound)}>
             {soundObj.label}
        </button>
      )
    })
  }

  return (
    <div>
        {RenderButtonAndSound()}
    </div>
  )
}
