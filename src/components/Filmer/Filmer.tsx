import React from 'react';

import './Filmer.less';

export class Filmer extends React.Component {
    public render = () => (
        <div className="film-wrapper">
            <video src={`/static/videos/vigsel.mp4?token=${localStorage.getItem('token')}`} controls></video>
            <video src={`/static/videos/leif.mp4?token=${localStorage.getItem('token')}`} controls></video>
            <video src={`/static/videos/brodersang.mov?token=${localStorage.getItem('token')}`} controls></video>

            <video src={`/static/videos/bruddans.mp4?token=${localStorage.getItem('token')}`} height="600" width="auto" controls></video>
            <video src={`/static/videos/dans1.mp4?token=${localStorage.getItem('token')}`} height="600" width="auto" controls></video>
            <video src={`/static/videos/dans2.mp4?token=${localStorage.getItem('token')}`} height="600" width="auto" controls></video>
            <video src={`/static/videos/dans3.mp4?token=${localStorage.getItem('token')}`} height="600" width="auto" controls></video>
            {/*<video src={`/static/videos/hanna.mp4?token=${localStorage.getItem('token')}`} controls></video>*/}
        </div>
    );
}
