import preloader from '../../images/loading-78.gif'
import React from 'react';
import cl from "./Preloader.module.css"
let Preloader = () => {
    return <div>
        {/* <img style={{ height: '100px' }} src={preloader} /> */}
        <div className={cl.preloader}>

        </div>
    </div>
}


export default Preloader;