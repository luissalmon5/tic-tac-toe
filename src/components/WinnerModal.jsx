import { Square } from './Square'
import { ResetButton } from './ResetButton';
export function WinnerModal({winner, resetGame}) {
    if (winner === null) return null;
    const winnerText = winner === false ? 'Empate': 'Gano:';
    return (
        <section className="winner">
            <div className="text">
                <h2>{winnerText}</h2>
                <header className="win">
                    {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                    <ResetButton resetGame={resetGame} buttonText={"Volver a empezar"}/>
                </footer>
            </div>
        </section>
    )
}