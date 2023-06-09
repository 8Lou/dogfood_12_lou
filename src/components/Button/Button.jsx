import React from "react";

import cn from "classnames";
import './style.scss'

export const Button = ({
    type = 'primary', children, onClick = () => { }

}) => {

    return (<button onClick={
        onClick
    }

        className={
            cn('btn', {
                'primary': type === 'primary',
                'secondary': type === 'secondary'
            })
        }

    > {
            children
        }

    </button>)
}