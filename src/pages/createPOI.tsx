import React from "react";
import { Link } from 'react-router-dom';
import {toast, ToastContainer } from 'react-toastify';

import "./createPOI.css";
import HeaderLogo from "../home/headerLogo/headerLogo";
import Button from "../home/buttons/Button";
import axios from "axios";

function CreatePOI() {

  const [title, setTitle] = React.useState("");
  const [x, setX] = React.useState<number>();
  const [y, setY] = React.useState<number>();
  const [message, setMessage] = React.useState<string>("");

  const handleCreate = async (e :any) => {
    e.preventDefault();
    const data = 
    {
      title: title,
      x: x,
      y: y,
    }

    try {
      const response = await axios.post("http://localhost:3000/coordenadas/criar", data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      toast.error(response.data.message,{
        position: "top-right",
        autoClose: 5000,
        type: "success",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTitle("");
      setX(undefined);
      setY(undefined);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error,{
          position: "top-right",
          autoClose: 5000,
          type: "warning",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Erro ao criar POI. Tente novamente mais tarde.",{
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
    }
  };

  return (
    <div className="container">
      <HeaderLogo />
      
      <div className="bodyCreate">
        <div className="buttons">
          <Link to="/">
            <Button nome="Voltar"/>
          </Link>
        </div>

        <hr/>

        <div className="modal">
          <br />
          <h1>CRIAR POI</h1>
          <hr />
          <form className="create-form" onSubmit={handleCreate}>
            <div className="formInputs">
              <input type="text" className="input-field"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título da POI" value={title} />
              <input type="number" className="input-field"
                onChange={(e) => setX(Number(e.target.value))}
                placeholder="Posição X" value={x ?? ''} />
              <input type="number" className="input-field" 
                onChange={(e) => setY(Number(e.target.value))}
                placeholder="Posição Y"  value={y ?? ''}/>

            </div>
            <div className="buttonForm">
              <button type="submit" className="buttonSubmit">
                Criar POI
              </button>
            </div>
          </form>
        </div>
      </div>
        <ToastContainer/>
    </div>
  );
}

export default CreatePOI;
