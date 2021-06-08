import React, { useState, useEffect } from "react";

export default function GameCell ({
  index,
  cellValue,
  emitValue,
  mouseDown,
  coords,
}) {
  const [state, setState] = useState({ active: "", clickedOrHovered: false });
  const { active } = state;
  useEffect(() => {
    if (!mouseDown) {
      setState({ active: "", clickedOrHovered: false });
    }
  }, [mouseDown]);

  const setClickedOrHoveredState = (isMouseDown = false) => {
    if (active) {
      alert("you cannot drag back over the same cell");
      emitValue("", false, true);
    }

    if(mouseDown) {
      setState((prevState) => ({ ...prevState, active: "hover" }));
    }
  };


  return (
    <div
      className={`cell cell-${index} ${active}`}
      onMouseDown={() => emitValue(coords, true)}
      onMouseUp={() => emitValue(coords, false)}
      onMouseOver={() => setClickedOrHoveredState()}
      // onTouchStart={() => setClickedOrHoveredState(true, true)}
      // onTouchMove={() => setClickedOrHoveredState(true, true)}
    >
      {cellValue}
    </div>
  );
};
