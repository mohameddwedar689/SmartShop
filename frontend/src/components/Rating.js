import React from 'react'

function Rating({value , text , color}) {
    return (
        <div className='rating'>
            <span>
                {/* first star */}
                <i style={{color}} className={
                    value >= 1 
                        ? 'fas fa-star'
                        : value >= 0.5 
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i>
                {/* second star */}
                <i style={{color}} className={
                    value >= 2
                        ? 'fas fa-star'
                        : value >= 1.5 
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i>
                {/* Third star */}
                <i style={{color}} className={
                    value >= 3
                        ? 'fas fa-star'
                        : value >= 2.5 
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i>
                {/* fourth star */}
                <i style={{color}} className={
                    value >= 4
                        ? 'fas fa-star'
                        : value >= 3.5 
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i>
                {/* fifth star */}
                <i style={{color}} className={
                    value >= 5
                        ? 'fas fa-star'
                        : value >= 4.5 
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }>
                </i>

                <span>{text && text}</span>
            </span>
        </div>
    )
}

export default Rating
