import React, { useEffect, useRef } from 'react';

export default (P, S) => {
    const handleChange = function(event){
        console.log('event', event)
        if(event.keyDown == 'space')
            event.preventDefault();
    };
    
    useEffect(() => { { console.log('trigger'); } }, []);

    return(
        <div>
            <label contentEditable={false} className="checkbox-container" >
                <input type="checkbox" defaultChecked={P.checked} />
                <span className="checkmark"></span>
            </label>
            <div className='checkbox-text' contentEditable={true} suppressContentEditableWarning={true}>{P.defaultText}</div>
        </div>
    )
}
