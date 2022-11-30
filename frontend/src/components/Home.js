import React from 'react';
import '../pages/Home.css';
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import Mann from '../audioClips/Mann.mp3';
import Maiyya from '../audioClips/Maiyya.mp3';
import ishq from '../audioClips/ishq.mp3';
import {Howl,Howler} from 'howler';

// audio
const audioClips = [
  {sound: Mann, label: 'Play Mann Bharyya from Shershah'},
  {sound: Maiyya, label: 'Play Maiya Mainnu from xyz movie'},
  {sound: ishq, label: 'Play Ishq Di Baajiyaa from abc movie'}
]
////

export default function Home() {
// audio
 const SoundPlay = (src) => {
        const sound = new Howl({
          src
        })
        sound.play();
  }

  const RenderButtonAndSound =()=>{
    return audioClips.map((soundObj, index) => {
      return(
        <div>
        <center>
          <h6>Play</h6>
        <button style={{justifyContent:'center', display: 'flex' }}  className="btn btn-outline btn-success" key={index}  onClick={()=> SoundPlay(soundObj.sound)}>
             {soundObj.label}
        </button></center>
        </div>
      )
    })
  }
///////

  return (
    <div>
      <Marquee style={{ color: 'green', fontSize: '2em' }}>
        Welcome to Grade Management Portal !
      </Marquee>


      <div className="col-md-12 home bg-light my-5">

        {/* About Us start */}
        <h1 className="text-center">
          Welcome to smartData
        </h1>
        <center>
          <p>
            smartData is a leader in global software business space when it comes to business consulting and
            technology integrations making business easier, accessible, secure and meaningful for its target
            segment of startups to small & medium enterprises.
          </p>
        </center>

        <h2 className="text-center"> 
          Thank you :) 
        </h2>
        <center>
          <Link className="btn btn-outline-primary " to="/login">
            Get Started
          </Link>
        </center>
      </div>
      {/* About us end */}

      {/* Video player start */} 
      <h4 style={{justifyContent:'center', display: 'flex'}}>Play Videos</h4>
      <div style={{justifyContent:'center', display: 'flex'}}>
          <ReactPlayer
              width="900px"
              height="400px"
              controls
              url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
              onReady={()=>console.log('onReady callback')}
              onStart={()=>console.log('onStart callback')}
              onPause={()=>console.log('onPause callback')}
              onEnded={()=>console.log('onEnded callback')}
              onError={()=>console.log('onError callback')}
          />
      </div>
      <br/><br/>
      {/* Video player end */}

      {/* Audio Player starts */}
      <h4 style={{justifyContent:'center', display: 'flex'}}> Play Music by simply Clicking on Buttons</h4>
       {RenderButtonAndSound()}
      {/* Audio Player end */}


      {/* Footer start */}
      <footer class="footer-bs mt-4">
        <div class="row">
          <div class="col-md-3 footer-brand animated fadeInLeft">
            <h2>Logo</h2>
            <p>
              {" "}
              Art is a visual object or experience consciously created
              through an expression of skill or imagination.{" "}
            </p>
            <p>© 2022 | All rights reserved</p>
          </div>
          <div class="col-md-4 footer-nav animated fadeInUp">
            <h4>Menu —</h4>
            <div class="col-md-6">
              <ul class="pages">
                <li>
                  <a href="#">Login</a>
                </li>
                <li>
                  <a href="#">Sign Up</a>
                </li>
                <li>
                  <a href="#">Admin Login</a>
                </li>
              </ul>
            </div>
            <div class="col-md-6">
              <ul class="list">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contacts</a>
                </li>
                <li>
                  <a href="#">Terms & Condition</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-2 footer-social animated fadeInDown">
            <h4>Follow Us</h4>
            <ul>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">RSS</a>
              </li>
            </ul>
          </div>
          <div class="col-md-3 footer-ns animated fadeInRight">
            <h4>Newsletter</h4>
            <p>
              A rover wearing a fuzzy suit doesn’t alarm the real penguins
            </p>
            <p>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search for..."
                />
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button">
                    <span class="glyphicon glyphicon-envelope"></span>
                  </button>
                </span>
              </div>
            </p>
          </div>
        </div>
      </footer>
      {/* footer end */}
      
    </div>
  )
}
