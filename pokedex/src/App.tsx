import React from 'react';

function App() {
    return (
        <div className="container">
          <nav>
          <img
                    className="img-fluid"
                    src="/logoPk.jpg"
                    alt="" />
          </nav>
          <hr />
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-primary me-md-2" type="button">Elige la generación</button>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Primera Generación</a></li>
            <li><a className="dropdown-item" href="#">Segunda Generación</a></li>
            <li><a className="dropdown-item" href="#">Tercera Generación</a></li>
            <li><a className="dropdown-item" href="#">Cuarta Generación</a></li>
            <li><a className="dropdown-item" href="#">Quinta Generación</a></li>
        </ul>
          
          
          </div>
          <br /><br />

         

          <div className="container text-center">
            <div className="row">
              <div className="col">
                <img src="PrimeraGeneracion" alt="" />
                Column
              </div>
              <div className="col">
                Column
              </div>
              <div className="col">
                Column
              </div>
              <div className="col">
                Column
              </div>
              <div className="col">
                Column
              </div>
            </div>
            <div className="row">
              <div className="col">
                Column
              </div>
              <div className="col">
                Column
              </div>
              <div className="col">
                Column
              </div>
              <div className="col">
                Column
              </div>
              <div className="col">
                Column
              </div>
            </div>
            
          </div>


            
        </div>
    );
}

export default App;