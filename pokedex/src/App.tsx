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
          <div className="btn-group">
  <button type="button" className="btn btn-primary me-md-2 dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Elige la generación
  </button>
  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    <div className="G1">
    <li><a className="dropdown-item" href="#">Primera Generación</a></li></div>
    <li><a className="dropdown-item" href="#">Segunda Generación</a></li>
    <li><a className="dropdown-item" href="#">Tercera Generación</a></li>
    <li><a className="dropdown-item" href="#">Cuarta Generación</a></li>
    <li><a className="dropdown-item" href="#">Quinta Generación</a></li>
  </ul>
</div>




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

