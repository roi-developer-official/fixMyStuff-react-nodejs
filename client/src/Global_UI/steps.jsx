import './global.css';
import React from 'react';
export function Steps({currnetStep,steps}){

    return (
        <div className='steps' style={{maxWidth: (steps.length * 110) + 'px'}}>
            {steps.map((step)=>{
                return (
                <React.Fragment key={step}>
                    <div className={`circle circle${step} ${currnetStep === step? 'current' : ''}`}>{step}</div>
                   {(step !== steps.length) && <div className="connector conector1"></div>}
                </React.Fragment>
                )
            })}
        </div>
    )

}

