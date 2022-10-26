// Run this example by adding <%= javascript_pack_tag 'Home_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Home React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
// import videos from '../api/video'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import UploadVideo from '../pages/videoUpload';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/upload-video" element={<UploadVideo/>} />
      </Routes>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})
