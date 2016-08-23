import React from 'react';
import AccountsUIWrapper from '../Accounts/AccountsUIWrapper.jsx';
import CustomAccount from '../Accounts/CustomAccount.jsx';
// Main Layout for react content
export const MainLayout = ({content})=>(

  <div className="main-layout">
    <header>
      <nav>
        <AccountsUIWrapper />

      </nav>
  </header>
    <main>
      {content}
    </main>
  </div>

);
