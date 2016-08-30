import React from 'react';
import Base from '../../base';
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title';
import './home.scss';

class Home extends Base {
    render() {
        return (
            <DocumentTitle title="FloppyBox | Home">
                <div className="home-component">

                </div>
            </DocumentTitle>
        );
    }
}

export default Home;
