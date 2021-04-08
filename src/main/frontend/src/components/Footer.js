import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <span className="text-muted">
            @Polsoftex - Programowanie Zespołowe 2021-{" "}
            <a href="mailto:admin@polsoftex.pl">
                admin@polsoftex.pl
            </a>
          </span>
        </div>
      </footer>
    );
  }
};

export default Footer;