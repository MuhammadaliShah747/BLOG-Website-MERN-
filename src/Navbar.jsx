
import './Navbar.css'
import Home from './Home';
function Navbar() {


    return (
        <>
            <nav className="contain">
                <div className="logo" >MyBlog</div>
                <div className="nav-links">
                    <button className="btn">Home</button>
                    <button className="btn">About Us</button>
                    <button className="btn">Contact</button>
                </div>
            </nav></>
    )
}
export default Navbar;