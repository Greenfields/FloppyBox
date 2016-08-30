import React, { PropTypes } from 'react';
import './app.scss';
import BaseComponent from '../base';

class App extends BaseComponent {
    static displayName = 'App';
    static propTypes = {
        children: PropTypes.object,
        dictionary: React.PropTypes.object.isRequired
    };

    /*
     define the properties that children of this component
     (essentially all components since this is the top level)
     can expect to receive in their context
     */
    static childContextTypes = {
        dictionary: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this._dictionary = this.props.dictionary;

        this._childContext = {
            dictionary: this._dictionary
        };
    }

    getChildContext() {
        return this._childContext;
    }

    render() {
        return (
            <div className="app-wrapper">
                <div className="row">
                    {/* Render Main Content */}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
