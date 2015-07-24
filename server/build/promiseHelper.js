(function() {
  module.exports = {
    executePromisesConsecutiveAndWithTimeout: function(promiseGenerators, promiseCallback) {
      var generateThenHandler, nextThenHandler, promiseGenerator, thenHandlers;
      thenHandlers = [];
      generateThenHandler = function(_promiseGenerator, _nextThenHandler, isFirst) {
        var fn;
        if (isFirst == null) {
          isFirst = false;
        }
        fn = _nextThenHandler === null ? function() {
          return _promiseGenerator().then(promiseCallback);
        } : function() {
          return _promiseGenerator().then(_nextThenHandler);
        };
        return function() {
          if (promiseCallback && !isFirst) {
            promiseCallback.apply(null, arguments);
          }
          return setTimeout(fn, 3000 + Math.round(Math.random() * 5000));
        };
      };
      while ((promiseGenerator = promiseGenerators.pop())) {
        nextThenHandler = thenHandlers.length > 0 ? thenHandlers[thenHandlers.length - 1] : null;
        thenHandlers.push(generateThenHandler(promiseGenerator, nextThenHandler, promiseGenerators.length === 0));
      }
      return thenHandlers[thenHandlers.length - 1]();
    }
  };

}).call(this);
