import React from 'react';

import './Filmer.less';

export class Filmer extends React.Component {
    public render = () => (
        <div className="film-wrapper">
            <video src={`/static/videos/hanna.mp4?token=${localStorage.getItem('token')}`} controls></video>
        </div>
    );
}
