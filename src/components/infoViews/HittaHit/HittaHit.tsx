import React from 'react';

import Magasin from './../../../../assets/images/magasin.jpg';
import './HittaHit.less';

export const HittaHit = () => (
    <div className="info-wrapper hitta-hit">
        <ul>
            <li>
                <strong>Adress:</strong> Köpmansmagasinet - Smyge strandväg 10, 231 78 Smygehamn (<a href="https://goo.gl/maps/tJWrVKS1oWU2" target="_blank">Karta</a>)
            </li>

            <li>
                Här samlar vi alla festligheter för dagen. Både vigseln och festen sker här.
            </li>

            <li>
                Hit går regionbuss 190 från Trelleborg eller Ystad, hållplats ”Smygehamn Magasinet”. (<a href="https://www.skanetrafiken.se/tidtabeller/Regionbuss/181209_190615/Regionbuss_190_181209_190615.pdf" target="_blank">Busstidstabell 190</a>)
            </li>

            <li>
                För er som kommer med bil finns det gratis parkering.
            </li>
        </ul>
        <div className="img-wrapper">
            <img src={Magasin} alt="" />
        </div>
    </div>
)
