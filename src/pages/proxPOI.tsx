import React from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "./CreatePOI.css";
import "./proxPOI.css";
import HeaderLogo from "../home/headerLogo/headerLogo";
import Button from "../home/buttons/Button";

import axios from "axios";

function ProxPOI() {
  const [x, setX] = React.useState<number>();
  const [y, setY] = React.useState<number>();
  const [dMax, setdMax] = React.useState<number>();
  const [coordenadas, setCoordenadas] = React.useState<any[]>([]);

  const handleListProxime = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      x: x,
      y: y,
      dMax: dMax,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/coordenadas/listar-proximos",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Atualiza o estado com os resultados
      setCoordenadas(response.data);
      toast.success("Coordenadas listadas com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Limpa os campos de entrada
      setX(undefined);
      setY(undefined);
      setdMax(undefined);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Erro ao listar POIs. Tente novamente mais tarde.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="container">
      <HeaderLogo />

      <div className="bodyCreate">
        <div className="buttons">
          <Link to="/">
            <Button nome="Voltar" />
          </Link>
        </div>

        <hr />

        <div className="modal">
          <br />
          <h1>Busca por Proximidade:</h1>
          <hr />
          <form className="create-form" onSubmit={handleListProxime}>
            <div className="formInputs">
              <input
                type="number"
                className="input-field"
                onChange={(e) => setX(Number(e.target.value))}
                placeholder="Posição X"
                value={x ?? ""}
              />
              <input
                type="number"
                className="input-field"
                onChange={(e) => setY(Number(e.target.value))}
                placeholder="Posição Y"
                value={y ?? ""}
              />
              <input
                type="number"
                className="input-field"
                onChange={(e) => setdMax(Number(e.target.value))}
                placeholder="Distância máxima"
                value={dMax ?? ""}
              />
            </div>
            <div className="buttonForm">
              <button type="submit" className="buttonSubmit">
                Pesquisar POIs
              </button>
            </div>
          </form>
        </div>

        <div className="resp">
          <div className="cordText">
            <h2>Coordenadas:</h2>
          </div>
          {coordenadas.length > 0 ? (
            coordenadas.map((coord, index) => (
              <div key={index} className="poi">
                <p>
                  <strong>{coord.title}</strong> 
                </p>
                <p>
                  <strong>Coordenadas:</strong> ({coord.x}, {coord.y})
                </p>
              </div>
            ))
          ) : (
            <div className="aviso">
              <p>Nenhuma POI encontrada com essas informações.</p>
            </div>
          )}  
        </div>
      </div>

      <ToastContainer />
    </div>
    
  );
}

export default ProxPOI;
