import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
  render() {
    return (
      <div>
        <p>Hello react!</p>
      </div>
    );
  }
}


ReactDOM.render(
  <Main />,
  document.getElementById('example')
);
