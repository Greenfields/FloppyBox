import url from 'url';

const urlRegex = /^\/(\w{2}-\w{2})/i;
const langRegex = /(\w{2})-(\w{2})/;

const prefix = '/';

export default function(config) {
    let defaultLanguage = config.languages.default || 'en-GB';
    let supported = ensureArray(config.languages.alternates);
    let supportedMap = buildSupported(supported);

    return (req, res, next) => {
        let language;

        if(req.originalUrl) {
            let [, match] = req.originalUrl.match(urlRegex) || [];

            if(!match) {
                language = defaultLanguage;
                return res.redirect(301, `${prefix + defaultLanguage + req.originalUrl}`);
            } else {
                language = bestMatch(match, supportedMap);
                redirect(req, res, language, defaultLanguage, match);
            }
        }

        // exact match from 'Accept-Language' header
        if(!language) {
            language = req.acceptsLanguages(supported);
        }

        // best match from 'Accept-Language' header
        if(!language) {
            language = bestMatch(req.acceptsLanguages(), supportedMap);
        }

        // first supported language or default to 'en-GB'
        if(!language) {
            language = (supported.length && supported[0]) || defaultLanguage;
        }

        req.language = language;

        req.alternates = buildAlternates(
            req.protocol,
            req.get('host'),
            req.originalUrl,
            supported,
            defaultLanguage
        );

        next();
    };
}

export function bestMatch(requested, supported) {
    for (let lang of ensureArray(requested)) {
        lang = lang.toLowerCase();
        let language = supported[lang];
        if(language) {
            return language;
        }

        let [, xx] = lang.match(langRegex) || [];
        language = supported[xx];
        if(language) {
            return language;
        }
    }
}

function buildSupported(languages) {
    let supported = {};
    for (let lang of ensureArray(languages)) {
        if (lang) {
            let [, xx] = lang.match(langRegex) || [];
            xx = xx && xx.toLowerCase();
            if (xx && !supported[xx]) {
                supported[xx] = lang;
            }

            supported[lang.toLowerCase()] = lang;
        }
    }

    return supported;
}

function buildAlternates(protocol, host, originalUrl, supported, defaultLanguage) {
    let site = { protocol, host };
    let parsedUrl = url.parse(originalUrl);
    let languages = supported.map(x => x === 'en-GB' ? 'x-default' : x);

    let result = {};
    for (let lang of languages) {
        let withoutLang = parsedUrl.pathname.replace(urlRegex, '') || '/';
        let pathname = lang === 'x-default' ? `/${defaultLanguage + withoutLang}` : lang + withoutLang;
        result[lang] = url.format(
            Object.assign(
                {},
                parsedUrl,
                { pathname },
                site
            ));
    }

    return result;
}

function ensureArray(x) {
    return Array.isArray(x) ? x : (x ? [x] : []);
}

function redirect(req, res, language, defaultLanguage, match) {
    let parsed = url.parse(req.originalUrl);

    if(!language) {
        res.redirect(301, req.originalUrl.replace(`/${match}`, `/${defaultLanguage}`));
    } else if(language !== match) {
        res.redirect(301, req.originalUrl.replace(`/${match}`, `/${language}`));
    } else if(parsed.pathname === `/${language}` && !parsed.query) {
        res.redirect(301, `${parsed.pathname}/`);
    }
}
