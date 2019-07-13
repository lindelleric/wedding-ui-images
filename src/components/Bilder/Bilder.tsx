import React from 'react';

import Gallery from 'react-grid-gallery';

import { Images } from './../../generated/graphql';

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
                        images = data.images.map(({filename, thumbWidth, thumbHeight, orientation}) => ({
                            src: `/static/images/${filename}?token=${localStorage.getItem('token')}`,
                            thumbnail: `/static/images/thumbs/${filename}?token=${localStorage.getItem('token')}`,
                            thumbnailWidth: thumbWidth,
                            thumbnailHeight: thumbHeight,
                        }));
                    }

                    console.log(images);

                    return (
                        <div className="gallery-wrapper">
                            <Gallery images={images}
                                     enableImageSelection={false}
                                     rowHeight={300}
                                     />
                        </div>
                    )
                }}
            </Images.Component>
        )
    }
}
