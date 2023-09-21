import React, { useState } from 'react'
import './CheckBox.css'
import checkedIcon from '../../assets/img/checked.png'
import uncheckedIcon from '../../assets/img/unchecked.png'

export default function CheckBox({ defaultValue = false, children, onChange }) {

    let [checked, setChecked] = useState(defaultValue);

    const handleValue = () => {
        setChecked(!checked)
        onChange(!checked)
    }

    return (
        <div onClick={handleValue} className='mainCheckBox' >
            {checked ?
                <img src={checkedIcon} className='cb-icon' /> :
                <img src={uncheckedIcon} className='cb-icon' />
            }
            <span>{children}</span>

        </div>
    )
}
