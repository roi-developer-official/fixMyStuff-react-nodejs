import './global.css'
import logo from '../assets/logo.svg'
export function Logo(){

    return (
        <div className='logo_wrapper'>
        <img className='logo_icon' src={logo} alt=""/>
        <h2 className='logo'>Fix My Stuff</h2>
        </div>
    )
}
