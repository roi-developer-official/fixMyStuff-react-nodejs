import React, { Fragment } from 'react';
import Filter from '../filter/filter';
import './home.css'
class Home extends React.Component{

  
    // static contextType = AuthContext;
    state={};
    constructor(){
        super();
        this.state = {
            showFilters:false
        }
    }
    
    hideAndShowFilters(show){
        if(this.state.showFilters !== show){
            this.setState({
                ...this.state,
                showFilters:show
            });
        }
    }


    render()
        {
            return (
                <Fragment>
                <button onClick={()=>this.hideAndShowFilters(!this.state.showFilters)} className='filter_btn'></button>
                <select className='sort_btn'>
                    <option value="">Relavance</option>
                </select>
                {this.state.showFilters && <Filter></Filter>}
                </Fragment>
            )
        }
}

export default Home;

//sort by price demeand / most recent 
// filter city / prices / only my proffession