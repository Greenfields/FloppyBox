/*******************************************************
 * Server Component Entry Point
 * Load the applications translation files and cache Polyglot instances
 *
 * This exports a function, which takes the application config and returns
 * an Express middleware handle to render the application using React-Router
 ******************************************************/
import React from 'react';
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import requireDir from 'require-dir';
import DocumentTitle from 'react-document-title';
import Polyglot from 'node-polyglot';
// Routes defined in React-Router </Route> components
import routes from './routes';

// require all files in translations folder
const languages = requireDir('../assets/translations');

export default () => {

    // wrap each translation set as a Polyglot instance
    Object.keys(languages).forEach(locale => {
        languages[locale] = new Polyglot({
            phrases: languages[locale],
            locale
        });
    });

    return (req, res) => {
        // construct data to be returned to client
        let data = {};
        let locale = req.language;
        let language = locale.split('-')[0];

        let dictionary = languages[locale];

        let createElement = function(Component, props) {
            return <Component {...props} dictionary={dictionary}/>;
        };

        // Note that req.url here should be the full URL path from
        // the original request, including the query string.
        match({routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message)
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                renderProps.dictionary = dictionary;
                // return with content to respond to client
                const content = renderToString(<RouterContext {...renderProps} createElement={createElement} />);
                //Set page title from innermost title in page or default to dictionary
                const title = DocumentTitle.rewind() || `Floppy Bird`;
                const template = (
                    `<!doctype html>
					<html lang="${language}" data-locale="${locale}">
						<head>
							<meta http-equiv="X-UA-Compatible" content="IE=EDGE">
                            <meta httpEquiv="Content-type" content="text/html;charset=utf-8">
                            <meta name="keywords" content="Floppy, FloppyBox, Game">
                            <meta name="description" content="Floppy Box - A HTML5 Game">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
                            <link rel="stylesheet" href="/bundle.css">
							<title>${title}</title>
						</head>
						<body>
						    <div id="content">${content}</div>
						    <script type="text/javascript" src="/scripts/third-party/phaser.min.js"></script>
                            <script type="application/json" id="initial-data">${data}</script>
                            <script type="application/json" id="local-translations">${JSON.stringify(dictionary)}</script>
                            <script type="text/javascript" src="/app.js"></script>
                            <script type="text/javascript" src="/scripts/main.js"></script>
						</body>
					</html>`
                );

                // send response to client
                res.status(200).send(template);
            } else {
                const template = (
                    `<!doctype html>
					<html lang="${language}">
						<head>
							<meta http-equiv="X-UA-Compatible" content="IE=EDGE">
                            <meta httpEquiv="Content-type" content="text/html;charset=utf-8">
                            <meta name="keywords" content="Acca, Accumulator, Bets">
                            <meta name="description" content="I am an accumulator betting predictor">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
							<link rel="stylesheet" href="/bundle.css">
							<title>Floppy Box | Page not found</title>
						</head>
						<body>
						    <div id="content">
						        <h1>Page Not Found</h1>
						    </div>
						</body>
					</html>`
                );
                res.status(404).send(template)
            }
        })
    };
};
