Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var _ = require("lodash");
exports.ValueGenerators = {
    any: function () { return 'anyValue'; },
    symbol: function () { return 'anyValue'; },
    array: function () { return _.times(5, exports.ValueGenerators.any); },
    bool: function () { return true; },
    func: function () { },
    number: function () { return 1337; },
    object: function () { return ({ any: exports.ValueGenerators.any() }); },
    string: function () { return 'stringval'; },
    node: function () {
        return React.createElement('span', {
            className: 'node',
            children: exports.ValueGenerators.any()
        });
    },
    element: function () {
        return React.createElement('span', {
            className: 'element',
            children: exports.ValueGenerators.any()
        });
    },
    instanceOf: function () { return new function Klazz() { }(); },
    oneOf: function (values) { return values[0]; },
    oneOfType: function (types) { return types[0].__jestSnapper__.fake(); },
    arrayOf: function (type) { return _.times(5, type.__jestSnapper__.fake); },
    objectOf: function (type) { return ({
        one: type.__jestSnapper__.fake(),
        two: type.__jestSnapper__.fake()
    }); },
    shape: function (shape) { return constructProps(shape); }
};
var constructProps = function (propTypes) {
    return _(propTypes)
        .tap(console.log)
        .mapValues(function (value) { return value.__jestSnapper__.fake(); })
        .value();
};
exports.default = constructProps;
console.log(constructProps({
    foo: React.PropTypes.string,
    bar: React.PropTypes.number,
    denver: React.PropTypes.oneOf(['foo', 'bar']),
    brooklyn: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.bool
    ]),
    michigan: React.PropTypes.shape({
        foo: React.PropTypes.string,
        bar: React.PropTypes.number,
        denver: React.PropTypes.oneOf(['foo', 'bar']),
        brooklyn: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.bool
        ])
    }),
    buffalo: React.PropTypes.arrayOf(React.PropTypes.number),
    cali: React.PropTypes.objectOf(React.PropTypes.element),
    sanfran: React.PropTypes.node,
}));
