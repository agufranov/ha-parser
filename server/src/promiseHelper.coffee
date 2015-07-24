module.exports =
  executePromisesConsecutiveAndWithTimeout: (promiseGenerators, promiseCallback) ->
    thenHandlers = []

    generateThenHandler = (_promiseGenerator, _nextThenHandler, isFirst = false) ->
      fn = if _nextThenHandler is null
        () ->
          _promiseGenerator().then promiseCallback
      else
        () ->
          _promiseGenerator().then _nextThenHandler

      () ->
        promiseCallback arguments... if promiseCallback and not isFirst
        setTimeout fn, 3000 + Math.round(Math.random() * 5000)


    while (promiseGenerator = promiseGenerators.pop())
      nextThenHandler = if thenHandlers.length > 0 then thenHandlers[thenHandlers.length - 1] else null
      thenHandlers.push generateThenHandler(promiseGenerator, nextThenHandler, promiseGenerators.length is 0)

    thenHandlers[thenHandlers.length - 1]()
