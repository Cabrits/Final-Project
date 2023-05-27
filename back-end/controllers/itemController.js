const connection = require('../config');


exports.getItems = async (req, res) => {
    connection.query('SELECT item_id,item_name,item_price,item_discount FROM items', function (err, result, fields) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred' });
        }
        res.json(result);
      });

};
exports.getItem = async (req, res) => {
    // get 1 item with its ID
    connection.query('SELECT item_id,item_name,item_price,item_discount FROM items WHERE item_id='+req.params.id, function (err, result, fields) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'An error occurred' });
        }
        if (result.length === 0) {
            // If no item with the specified ID is found
            return res.status(404).json({ error: 'Item not found' });
          }
      
          const item = result[0]; // Get the first item from the result set
          res.json(item);
      });
};