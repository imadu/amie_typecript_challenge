
export default function GameCell ({
  active,
  cellValue,
  coords,
  status,
  ...props
}) {
  const isActive = active && ['SELECTING', 'SELECTED'].includes(status)

  const onMouseOver = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    props.onMouseOver(coords)
  }

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    props.onMouseDown(coords);
  }

  const onMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    props.onMouseUp(coords)
  }
 


  return (
    <div
      data-active={isActive}
      className="cell"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseOver={onMouseOver}
    >
      {cellValue}
    </div>
  );
};