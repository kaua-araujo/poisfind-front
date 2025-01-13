import React from "react";
import { Link } from "react-router-dom";

import Button from "./buttons/Button";
import Body from "./body/Body";
import HeaderLogo from "./headerLogo/headerLogo";
import {toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import "./Home.css";

function Home() {
  const [coordenadas, setCoordenadas] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchCoordenadas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/coordenadas");
        setCoordenadas(response.data);
      } catch (error) {
        toast.error(error.response.data.message,{
                position: "top-right",
                autoClose: 5000,
                type: "warning",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
      }
    };
    fetchCoordenadas();
  }, []);

  return (
    <div className="container">
      <HeaderLogo />

      <div className="buttons">
        <Link to="/listar-por-proximidade">
          <Button nome="Listar Próximos" />
        </Link>

        <Link to="/create">
          <Button nome="Cadastrar POI" />
        </Link>
      </div>
      <ToastContainer/>
      <hr />
      <div className="titleText">
                <h1>POIS CADASTRADAS:</h1>
      </div>
      {coordenadas.length > 0 ? (
        coordenadas.map((coord, index) => (
          <Body
            key={index}
            title={coord.title}
            x={coord.x}
            y={coord.y}
          />
        ))
      ) : (
        <div className="aviso">
          <p>Não há coordenadas registradas.</p>
        </div>
      )}
    </div>
  );
  
}

export default Home;
