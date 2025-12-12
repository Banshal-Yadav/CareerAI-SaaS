import { useState } from 'react';
import './Navbar.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X } from 'lucide-react';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.toLowerCase() === path.toLowerCase();
    };

    const handleNavClick = (path) => {
        if (path === 'pricing') {
            if (location.pathname === '/') {
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                navigate('/');
                setTimeout(() => {
                    const pricingSection = document.getElementById('pricing');
                    if (pricingSection) {
                        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }
        } else {
            navigate(path);
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className='navbar'>
            <Link to="/" id='logo' onClick={() => setIsMenuOpen(false)}>SkillSync</Link>

            <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>

            <div className={`nav-buttons ${isMenuOpen ? 'active' : ''}`}>
                <button
                    onClick={() => handleNavClick("/")}
                    className={`nav-btn ${isActive('/') ? 'nav-active' : ''}`}
                >Home</button>
                <button
                    onClick={() => handleNavClick("/AssessmentPg")}
                    className={`nav-btn ${isActive('/AssessmentPg') ? 'nav-active' : ''}`}
                >Analysis</button>
                <button
                    onClick={() => handleNavClick('pricing')}
                    className="nav-btn"
                >Pricing</button>

                {user && (
                    user.isAnonymous ? (
                        <>
                            <button
                                onClick={() => handleNavClick("/profile")}
                                className={`nav-btn ${isActive('/profile') ? 'nav-active' : ''}`}
                            >Profile</button>
                            <button onClick={() => handleNavClick('/login')} className="nav-btn-primary">Login / Sign Up</button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => handleNavClick("/profile")}
                                className={`nav-btn-primary ${isActive('/profile') ? 'nav-active' : ''}`}
                            >Profile</button>
                            <button onClick={handleLogout} className="nav-btn-logout">Logout</button>
                        </>
                    )
                )}
            </div>
        </nav>
    );
}

export default Navbar;