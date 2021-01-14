import React from 'react'
import './fallbackUI.scss'

const FallbackUI = () => {
    return <div className='fallback'>
     <img src='https://png.pngtree.com/png-vector/20190621/ourlarge/pngtree-glasseseyeviewspring-abstract-flat-color-icon-template-png-image_1490513.jpg'
     alt='error png' />
     <div>
         <p>
            SOMETHING WENT WRONG, BUT WHATEVER IT IS, WE ARE WORKING ON IT. IN THE MEAN TIME, TRY RELOADING THE PAGE OR CLICK ON THIS LINK TO REFRESH THE PAGE. <a href='/' >
                click here to refresh
            </a>
         </p>
     </div>
    </div>
}

export default FallbackUI