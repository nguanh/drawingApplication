import React from 'react';

// Definiere Layout

// Ist quasi eine template funktion
// {content} wird so grob als parameter definiert und in den html code eingesetzt
// und zurückgegeben Arrow Funktion
// export, damit wir zugriff auf MainLayout außerhalb dieser Datei haben
export const MainLayout = ({content})=>(

  <div className="main-layout">
    <header>
      <h2>React + D3 + Meteor2 </h2>
      <nav></nav>
  </header>
    <main>
      {content}
    </main>
  </div>

);
