

// Square component to render each one on the board
export const Square = ( { children, isSelected, updateBoard, index } ) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`; // based on turn state assign the is-selected class to the turn section square
  const handleClick = () => {
    updateBoard(index);
  }

  // return the element to render
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}