(function() {

    var register = function(Handlebars) {

        /************* BEGIN HELPERS *************/
        var helpers = {
            ifCond: function(from, operator, to, options) {
                if (operator) {
                    switch (operator) {
                        case '==':
                            return (v1 == v2) ? options.fn(this) : options.inverse(this);
                        case '===':
                            return (v1 === v2) ? options.fn(this) : options.inverse(this);
                        case '<':
                            return (v1 < v2) ? options.fn(this) : options.inverse(this);
                        case '<=':
                            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                        case '>':
                            return (v1 > v2) ? options.fn(this) : options.inverse(this);
                        case '>=':
                            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                        case '&&':
                            return (v1 && v2) ? options.fn(this) : options.inverse(this);
                        case '||':
                            return (v1 || v2) ? options.fn(this) : options.inverse(this);
                        default:
                            return options.inverse(this);
                    }
                } else if (from) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            },
            getPartialByName: function(name, data, options) {
                var template = Handlebars.partials[name];
                if (template) {
                    if (typeof template !== 'function') {
                        template = Handlebars.compile(template);
                    }
                    return template(data, options);
                }
            },            
            eachLimit: function(ary, max, options) {
                if (!ary || ary.length === 0) return options.inverse(this);

                var result = [];
                for (var i = 0; i < max && i < ary.length; ++i) {
                    result.push(options.fn(ary[i]));
                }

                return result.join("");
            }
        };
        /************* END HELPERS *************/

        if (Handlebars && typeof Handlebars.registerHelper === "function") {
            // register helpers
            for (var prop in helpers) {
                Handlebars.registerHelper(prop, helpers[prop]);
            }
        } else {
            // just return helpers object, used to enumerate "knownHelpers" in Grunt            
            return helpers;
        }
    };

    // client
    if (typeof window !== "undefined") {
        // since all partials and templates precompiled into the same bucket, do this to allow partial lookups to work
        Handlebars.partials = Handlebars.templates;
        register(Handlebars);
    }
    // server
    else {
        module.exports.register = register;
        module.exports.helpers = register(null);
    }

})();
