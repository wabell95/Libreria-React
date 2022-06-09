import { Link } from "react-router-dom"
import { Navbar } from "../components/Navbar"

const PageNoFound = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <div>
              <p className='alert alert-warning'>
                Pagina no encontrada
              </p>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
            <div className='col'>
                <Link to='/' className="btn btn-primary">Volver</Link>
            </div>
        </div>        
      </div>

    </>

  )
}

export default PageNoFound