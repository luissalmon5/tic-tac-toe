
export const ResetButton = ({resetGame, buttonText} ) => {
    const handleClick = () => {
        resetGame();
    }

    return (
        <button onClick={handleClick}>{buttonText}</button>
    )
}