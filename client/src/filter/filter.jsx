
import './filter.css'
function Filter(){
    let sortInputs = [
        {
            label: 'Price',
            type:'checkbox'
        },
        {
            label: 'Date',
            type:'checkbox'
        }
    ];
 
    return (
        <div className="filter_wrapper">
            <div className="filter_input_wrapper">
            <label>City</label>
                <input type="text"/>
            </div>
            <div className="filter_input_wrapper">
            <label>Price</label>
                <input className='filter_price_input' placeholder='From' type="number"/>
                <input className='filter_price_input' placeholder='To' type="number"/>
            </div>
            <div className="filter_input_wrapper">
            <label>Profession</label>
            <select></select>
            </div>
            <div className="filter_input_wrapper">
            <label>Only ad's with image</label>
            <input type='checkbox'></input>
            </div>
            <button className='filter_done_btn'>Done</button>
        </div>
    );
}

export default Filter;