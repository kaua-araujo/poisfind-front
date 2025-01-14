import React from "react";
import logo from "../../assets/tipografia.svg";
import "../Home.css"
function headerLogo() {
    return(
        <div>
            <div className="home">
                <img src={logo} alt="Logo" />
            </div>

            <div className="text">

                <p>Pontos de Interesse por GPS</p>
            
            </div>
        </div>
    );
}

export default headerLogo;