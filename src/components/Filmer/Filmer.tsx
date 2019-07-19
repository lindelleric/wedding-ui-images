import React from 'react';

import './Filmer.less';

export class Filmer extends React.Component {
    public render() {
        const token = localStorage.getItem('token');
        return (
            <div className="film-wrapper">
                <video src={`/static/videos/vigsel.mp4?jwt=${token}`} className="blocked" controls poster={`/static/video-thumbs/vigsel.png?jwt=${token}`} preload="none"></video>
                <video src={`/static/videos/vigsel-compress.mp4?jwt=${token}`} className="blocked" controls poster={`/static/video-thumbs/vigsel.png?jwt=${token}`} preload="none"></video>
                <video src={`/static/videos/leif.mp4?jwt=${token}`} className="blocked" controls poster={`/static/video-thumbs/leif.png?jwt=${token}`} preload="none"></video>
                <video src={`/static/videos/brodersang.mov?jwt=${token}`} className="blocked" controls poster={`/static/video-thumbs/brodersang.png?jwt=${token}`} preload="none"></video>

                <video src={`/static/videos/bruddans.mp4?jwt=${token}`} height="600" width="auto" controls poster={`/static/video-thumbs/bruddans.png?jwt=${token}`} preload="none"></video>
                <video src={`/static/videos/dans1.mp4?jwt=${token}`} height="600" width="auto" controls poster={`/static/video-thumbs/dans1.png?jwt=${token}`} preload="none"></video>
                <video src={`/static/videos/dans2.mp4?jwt=${token}`} height="600" width="auto" controls poster={`/static/video-thumbs/dans2.png?jwt=${token}`} preload="none"></video>
            </div>
        );
    }
}
