const Contador = () => {

    const [contador, setContador] = React.useState(0);

    const aumentarContador = () => {
        setContador(contador + 1);
    }

    const disminuirContador = () => {
        setContador(contador - 1);
    }

    return (
        <div id="contador">
            <h1 className={contador <= 0 ? "negativo" : "positivo"}>Counter: {contador}</h1>
            <hr />
            <button className="boton-contador" onClick={aumentarContador}>+</button>
            <button className="boton-contador" onClick={disminuirContador}>-</button>
        </div>
    )
}