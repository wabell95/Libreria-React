import { Link } from 'react-router-dom'
import { formatoMoneda } from '../helpers/formatoMoneda';

const Libro = (props) => {

    const { titulo, imagen, genero, precio } = props;

    console.log("props libro ", props);

    console.log("imagen", imagen);

    return (
        <>
            <div className="col mb-5">
                <div className="card" >
                    <img src={imagen} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h6 className="card-title">{titulo}</h6>
                        <p className="card-text">
                            {genero}
                        </p>
                        <p className="card-text">
                            {formatoMoneda(precio)}
                        </p>
                        <Link to={`librodetalle/${props.id}`} className="btn btn-primary">
                            Ver libro
                        </Link>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Libro
