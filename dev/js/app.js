var ss = new Calendar({
  element: $('.daterange--single'),
  current_date: 'June 15, 2015'
});

var dd = new Calendar({
  element: $('.daterange--double'),
  earliest_date: 'January 1, 2000',
  latest_date: new Date(),
  start_date: 'May 1, 2015',
  end_date: 'May 31, 2015',
  same_day_range: true,
  callback: function() {
    var start = moment(this.start_date).format('ll'),
        end = moment(this.end_date).format('ll');

    console.debug('Start Date: '+ start +'\nEnd Date: '+ end);
  }
});
