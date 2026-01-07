import { useEffect, useState } from "react"

export const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() =>{
    console.log('efecto ' , enabled);

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log(`handle move: ${clientX}, ${clientY}`);
      setPosition({x: clientX, y: clientY});
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove);
    }

    // clean the useEffect
    // execute when the dependencies changes [enabled]
    return () => {
      console.log('clenaup useEffect');
      window.removeEventListener('pointermove', handleMove);
    }

  },[enabled]);

  const handleClick = () => {
    setEnabled(!enabled);
  }
  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={handleClick}> {enabled ? 'Desactivar' : 'Activar'} seguir puntero</button>
    </>
  )
}