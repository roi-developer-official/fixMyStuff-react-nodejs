import './logo.css'
import logo from '../../assets/logo.svg'
function Logo(){

    return (
        <div className='logo_wrapper'>
        <img className='logo_icon' src={logo} alt=""/>
        <h2 className='logo'>Fix My Stuff</h2>
        </div>
    )
}

export default Logo;