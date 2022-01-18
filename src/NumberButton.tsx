import MathUtils from './MathUtils';

import { ReactChild, ReactFragment, ReactPortal } from 'react';



const NumberButton = (props : any) => {

    const color = () => {
        if (props.status == "available")
        return 'lightgray'
        if (props.status == "candidate")
        return 'deepskyblue'
        if (props.status == "used")
        return 'lightgreen'
        if (props.status == "wrong")
        return 'lightcoral'
    }
    
    return (
        <button onClick={() => props.clickButton(props.number, props.status)} style={{ backgroundColor: color() }} className="number">{props.number}</button>
    );
}

export default NumberButton;