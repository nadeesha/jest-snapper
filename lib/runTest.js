var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("React");
var ReactTestRenderer = require("react-test-renderer");
var runTest = function (description, Component, props, state) {
    it(description, function () {
        var renderer = ReactTestRenderer.create(React.createElement(Component, __assign({}, props)));
        if (state) {
            renderer.getInstance().setState();
        }
        expect(renderer.toJSON()).toMatchSnapshot();
    });
};
exports.default = runTest;
