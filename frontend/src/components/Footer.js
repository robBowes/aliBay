/**
 * Somthing that is shown on the bottom of every page
 */

import React, {Component} from 'react';
import styled from 'styled-components';

let Foot = styled.footer`
text-align: center;
`

class Footer extends Component {
    render() {
        return (
            <Foot className='footer'>
            2018 <br /> Randykinz SuperSeriousProductions Inc
            <a href="mailto:">Contact Us</a>
            </Foot>
        );
    }
}

export default Footer;
