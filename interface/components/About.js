import React from 'react';

class About extends React.Component {
  render() {
    const appIconPath = `file://${window.dirname}/icons/${
      window.mistMode
    }/icon2x.png`;
    const appName = window.mistMode === 'mist' ? 'Won Mist' : 'Won Wallet';

    return (
      <div className="row popup-windows about">
        <div className="col col-4 ">
          <img
            className={`left-overlay ${window.mistMode}`}
            src={appIconPath}
            style={{
              position: 'relative',
              top: '-40px',
              left: '-132%',
              width: '255%'
            }}
          />
        </div>
        <div className="col col-8 ">
          <h1>{appName}</h1>
          <p>
            Version {window.mist.version}
            <br />
            License {window.mist.license}
            <br />
            GitHub{' '}
           <a href="https://github.com/WONDevelopment/won-mist" target="_blank">
          <small>github.com/WONDevelopment/won-mist</small>
            </a>
          </p>
          <small>Copyright 2018 Ethereum Foundation</small>
        </div>
      </div>
    );
  }
}

export default About;
