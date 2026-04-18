import React from 'react'
import svgs from '../assets/svgs';

const GramoTitles = () => {

    return (
        <>
            <div className='big-gramo'>
                <span>GRAMO</span>
            </div>
            <div className='titles-back'>
                <p className="medium-hero">BUY GREEN, PAY GREEN,<br />LIVE GREEN.</p>
            </div>
            <p className="small-hero">THIS IS CRYPTO GRAMO</p>

            {svgs.circle()}
            {svgs.poligon(200,180)}
        </>
    )
}


export default GramoTitles;