import React from 'react';

import './Filmer.less';

export class Filmer extends React.Component {
    public render = () => (
        <div className="film-wrapper">
            <video src={`/static/videos/vigsel.mp4?jwt=${localStorage.getItem('token')}#t=0.5`} controls preload="metadata"></video>
            <video src={`/static/videos/leif.mp4?jwt=${localStorage.getItem('token')}#t=0.5`} controls preload="metadata"></video>
            <video src={`/static/videos/brodersang.mov?jwt=${localStorage.getItem('token')}#t=0.5`} controls preload="metadata"></video>

            <video src={`/static/videos/bruddans.mp4?jwt=${localStorage.getItem('token')}#t=0.5`} height="600" width="auto" controls preload="metadata"></video>
            <video src={`/static/videos/dans1.mp4?jwt=${localStorage.getItem('token')}#t=0.5`} height="600" width="auto" controls preload="metadata"></video>
            <video src={`/static/videos/dans2.mp4?jwt=${localStorage.getItem('token')}#t=0.5`} height="600" width="auto" controls preload="metadata"></video>
            <video src={`/static/videos/dans3.mp4?jwt=${localStorage.getItem('token')}#t=0.5`} height="600" width="auto" controls preload="metadata"></video>
            {/*<video src={`/static/videos/hanna.mp4?jwt=${localStorage.getItem('token')}`} controls preload="metadata"></video>*/}
        </div>
    );
}
