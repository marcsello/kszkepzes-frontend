import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const App = () => (
  <div style={{ minHeight: '100%', position: 'relative' }}>
    <Header>
      <main id='main' style={{ minHeight: '100%', position: 'relative' }}>
        <Main />
      </main>
    </Header>
    <footer id='footer' style={{ position: 'absolute', width: '100%', bottom: '0' }}>
      <Footer />
    </footer>
  </div>
);

export default App;
