import './pgTitle.css'
import { Sparkles, Shield, Users } from 'lucide-react'

function Pgtitle() {
    return (
        <section className='hero-section'>
            <div className="hero-orb hero-orb-1"></div>
            <div className="hero-orb hero-orb-2"></div>
            <div className="hero-orb hero-orb-3"></div>

            <div className="hero-badge">
                <Sparkles size={14} />
                <span>Powered by Google Gemini AI</span>
            </div>

            <h1 className='pg-title'>Your AI Career Coach <br />for Professional Success</h1>

            <h4 className='title-info'>Your AI career coach that understands your journey <br />and accelerates your professional growth</h4>
        </section>
    )
}

export default Pgtitle;