'use client'
import React, { useState } from "react";

export default function Page() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="absolute top-[200px]">
      <button className="border" onClick={() => setIsClicked(true)}>HOLA</button>
      {isClicked && <p>HA entrado</p>}
    </div>
  );
}
