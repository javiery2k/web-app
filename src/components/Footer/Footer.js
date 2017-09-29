import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="app-footer">
                <a target="_blank" href="http://www.up.ac.pa/PortalUp/index.aspx">Universidad de Panama</a> &copy; 2017.
                <span className="float-right">Developers <a target="_blank" href="https://www.facebook.com/javiery2k">Javier Moran</a> y <a target="_blank" href="https://www.facebook.com/CnSnTd">Urania Rivas</a></span>
            </footer>
        );
    }
}

export default Footer;
