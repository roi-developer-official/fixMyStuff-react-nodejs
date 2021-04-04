import React from 'react';
import {Button} from './'

export function Buttons({buttons, onClick, className}){
    return (
        <div className={className}>
        {buttons.map((btn, i) => {
            return (
                <Button
                key={i}
                label={btn.label}
                onClick={onClick}
                style={btn.style}
                ></Button>
                );
            })
        }
        </div>
    )
};