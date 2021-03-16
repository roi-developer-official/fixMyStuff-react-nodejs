
import {Button, AddImage} from '../../../Global_UI';
export default function PageTwo({show,changePage}){

    const Buttons = [
        {
            label: 'Back',            
            style:{
                backgroundColor:'#ccc'
            }
        },
        {
            label: 'Next',
            style:{
                backgroundColor: '#08c982'
            }
        }
    ];


    return (
        <div className={`add_post_page ${show ? 'show' : ''}`}>
        <AddImage></AddImage>
        <div className="form_buttons_wrapper">
                {Buttons.map(btn=>{
                    return <Button 
                    label={btn.label} 
                    onClick={changePage} 
                    style={btn.style}
                    />
                })}
            </div>
        </div>
    )
}