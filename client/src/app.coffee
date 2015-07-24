$ ->
  $.get 'storage/db.json', (data) ->
    window.data = data
    $(document.body).append $('<div>').text('DB loaded')
