import React from 'react'
import '../static/css/titlepage.scss'

const Titlepage = (name: any) => {
    return (
        <>
            <p className='titlepage'>
                {name.name}
            </p>
            <hr />

        </>

    )
}

export default Titlepage