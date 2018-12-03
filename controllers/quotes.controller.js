const randomQuote = require('random-quote');



  module.exports.getQuote = function(req, res, next) {

  randomQuote()
  .then(quote =>
    {
      return res.status(200).json({
              err: null,
              msg: 'Quote retrived succesfully.',
              data: quote,
            });
    }
  )
  .catch(err => console.error(err));
  };
