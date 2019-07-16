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
                        images = data.images.map(({ filename, thumbWidth, thumbHeight }) => ({
                            src: `/static/images/${filename}?token=${localStorage.getItem('token')}`,
                            thumbnail: `/static/images/thumbs/${filename}?token=${localStorage.getItem('token')}`,
                            thumbnailWidth: thumbWidth,
                            thumbnailHeight: thumbHeight,
                        }));
                    }

                    return (
                        <>
                            <div className="gallery-wrapper">
                                <Gallery images={images}
                                         enableImageSelection={false}
                                         backdropClosesModal={true}
                                         rowHeight={300}
                                         />
                            </div>
                            <a className="download" download href={`/static/other/bilder.zip?token=${localStorage.getItem('token')}`}>Klicka här för att ladda ner alla bilder</a>
                        </>
                    )
                }}
            </Images.Component>
        )
    }
}
