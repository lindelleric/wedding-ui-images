import React from 'react';

import './Tack.less';

export const Tack: React.FunctionComponent = () => (
    <div className="tack-wrapper">
        <h1>Tack!</h1>

        <p>
            Tack för att ni ville komma på vårt bröllop! Hoppas att ni hade trevligt.
        </p>

        <p>
            Här hittar ni bilder och filmer från bröllopet. Både från vigseln och från kvällen.
        </p>

        <span className="signature">
            Eric &#91;Malin
        </span>
    </div>
)
