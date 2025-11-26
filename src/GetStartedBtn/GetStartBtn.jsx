import "./GetStartBtn.css";
import { useNavigate } from "react-router-dom";

function GetStartBtn() {
    const navigate = useNavigate();
    return (
        <div className="get-started-btn-container">
            <button onClick={() => navigate("/AssessmentPg")} className="get-started-btn">Start Your Assessment</button>
        </div>
    );
}

export default GetStartBtn;