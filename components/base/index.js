/*******************************************************
 * Base Component
 * This class declares class having a dictionary prop in
 * its context. Components that extend this class will be given a helper
 * method 't' which uses this context property to access a node polyglot
 * instance for translations.
 ******************************************************/
import React from 'react';

class Base extends React.Component {
    // declare that this component expects to have a dictionary in its context
    static contextTypes = {
        dictionary: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    // Translation helper method to be used inside of the component
    // via `this.t(*key*)`
    t(key, variables) {
        return this.context.dictionary.t(key, variables);
    }

    // return the users current locale
    locale() {
        return this.context.dictionary.locale();
    }
}

export default Base;
