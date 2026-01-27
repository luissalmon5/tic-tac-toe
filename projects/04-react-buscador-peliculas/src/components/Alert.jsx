
export const Alert = (typeMessage, messsage) => {

    return(
        <>
        <dialog open>
            <p>{messsage}</p>
            <form method="dialog">
                <button>Acept</button>
            </form>
        </dialog>
        </>
    )
}