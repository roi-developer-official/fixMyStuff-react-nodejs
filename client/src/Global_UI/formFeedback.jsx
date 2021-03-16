
import './global.css'
export function FormFeedback({error, message}){

    let style =  {
        backgroundColor: error? ' rgba(255, 0, 21, 0.61)' : 'rgba(68, 196, 68, 0.671)',
        color: error? '#8B0000' : '#006600',
        border: `3px solid ${error? 'rgba(226, 33, 33, 0.61)' : 'rgba(0, 112, 0, 0.671)' }`
    };

    return (
        <div style={{...style}} className="form_feedback_wrapper">
            <p>{message}</p>
        </div>
    );

}
