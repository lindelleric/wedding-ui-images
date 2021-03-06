import React from 'react';

import Gallery from 'react-grid-gallery';

import { Images } from './../../generated/graphql';
import LazyLoad from 'react-lazyload';

import './Bilder.less';

export class Bilder extends React.Component {
    public render() {
        return (
            <Images.Component>
                {({ data, error, loading, refetch }) => {
                    let images;

                    if (loading || error) {
                        return <p className="laddar">Laddar bilder...</p>;
                    }

                    if (data) {
                        images = data.images.map(({ filename, thumbWidth, thumbHeight }) => ({
                            src: `/static/images/${filename}?jwt=${localStorage.getItem('token')}`,
                            thumbnail: `/static/images/thumbs/${filename}?jwt=${localStorage.getItem('token')}`,
                            thumbnailWidth: thumbWidth,
                            thumbnailHeight: thumbHeight,
                        }));
                    }

                    return (
                        <div className="bilder-container">
                            <div className="gallery-wrapper">
                                <Gallery images={images}
                                         thumbnailImageComponent={ImageComponent}
                                         enableImageSelection={false}
                                         backdropClosesModal={true}
                                         rowHeight={300}
                                         />
                            </div>
                            <a className="download" download href={`/static/other/bilder.zip?jwt=${localStorage.getItem('token')}`}>Klicka här för att ladda ner alla bilder</a>
                        </div>
                    )
                }}
            </Images.Component>
        )
    }
}


class ImageComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    public render = () => (
        <LazyLoad offset={350} once>
            <img {...this.props.imageProps} />
        </LazyLoad>
    )
}
