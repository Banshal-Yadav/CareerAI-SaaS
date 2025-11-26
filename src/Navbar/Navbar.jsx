import { useState } from 'react';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, X } from 'lucide-react';

function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const handleLogout = () => {
        logout();
        setIsMenuOpen(false); 
    };

    const handleNavClick = (path) => {
        navigate(path);
        setIsMenuOpen(false); 
    };


    return (
        <nav className='navbar'>
            <Link to="/" id='logo' onClick={() => setIsMenuOpen(false)}>SkillSync</Link>

            {/* hamburger menu icon */}
            <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>

            {/* navigation links - class changes based on menu state */}
            <div className={`nav-buttons ${isMenuOpen ? 'active' : ''}`}>
                <button onClick={() => handleNavClick("/")} id='analysis_btn'>Home</button>
                <button onClick={() => handleNavClick("/AssessmentPg")} id='analysis_btn'>Analysis</button>
                
                {user && (
                    user.isAnonymous ? (
                        <>
                             <button onClick={() => handleNavClick("/profile")} id='analysis_btn'>Profile</button>
                             <button onClick={() => handleNavClick('/login')} id='profile_btn'>Login / Sign Up</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => handleNavClick("/profile")} id='profile_btn'>Profile</button>
                            <button onClick={handleLogout} id='logout_btn'>Logout</button>
                        </>
                    )
                )}
            </div>
        </nav>
    );
}

export default Navbar;