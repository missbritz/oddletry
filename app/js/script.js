import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
  render() {
    return (  
    <header>header</header>
    );
  }
}


class Footer extends React.Component {
  render() {
    return (
      
    <footer>footer</footer>
    );
  }
}

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Footer /></div>
    );
  }
}

const app = document.getElementById('app');
React.render(<Layout />, app);



