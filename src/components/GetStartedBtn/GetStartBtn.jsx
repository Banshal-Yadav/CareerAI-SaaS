import "./GetStartBtn.css";
import { useNavigate } from "react-router-dom";
import { Zap, Shield, ArrowRight } from 'lucide-react';

function GetStartBtn() {
    const navigate = useNavigate();
    return (
        <div className="get-started-btn-container">
            <button onClick={() => navigate("/AssessmentPg")} className="get-started-btn">
                Start Your Assessment
                <ArrowRight size={20} />
            </button>
            <div className="trust-indicators">
                <span className="trust-item"><Zap size={14} /> 250+ Career Paths</span>
                <span className="trust-divider"></span>
                <span className="trust-item"><Shield size={14} /> Free to Start</span>
                <span className="trust-divider"></span>
                <span className="trust-item">No Credit Card Required</span>
            </div>
        </div>
    );
}

export default GetStartBtn;