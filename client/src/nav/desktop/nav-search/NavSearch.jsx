import searchIcon from '../../../assets/search.png';
export default function NavSearch(){

    return (
        <div className='nav_search'>
        <input className='search_input' type="text"/>
        <img className='search_image' src={searchIcon} alt=""/>
       </div>
    )
}