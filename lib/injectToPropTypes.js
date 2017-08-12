var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constructProps_1 = require("./constructProps");
var _ = require("lodash");
var getInfusion = function (key, values) {
    if (!constructProps_1.ValueGenerators[key]) {
        return;
    }
    return { fake: function () { return constructProps_1.ValueGenerators[key](values); } };
};
var injectToPropTypes = function (propTypes) {
    return _.forOwn(propTypes, function (typeFn, key) {
        var fn = function (types) { return (__assign({}, typeFn(), { __jestSnapper__: getInfusion(key, types) })); };
        // TODO: fix typings
        fn.__jestSnapper__ = getInfusion(key);
        propTypes[key] = fn;
    });
};
exports.default = injectToPropTypes;
