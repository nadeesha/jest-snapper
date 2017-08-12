Object.defineProperty(exports, "__esModule", { value: true });
var injectToPropTypes_1 = require("./injectToPropTypes");
var runTest_1 = require("./runTest");
var constructProps_1 = require("./constructProps");
exports.init = injectToPropTypes_1.default;
exports.test = function (description, Component, options) {
    var props = options.props || constructProps_1.default(Component.propTypes);
    var state = options.state;
    runTest_1.default(description, Component, props, state);
};
