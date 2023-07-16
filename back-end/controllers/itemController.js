const connection = require("../config");

exports.getItems = async (req, res) => {
  connection.query(
    "SELECT item_id, item_name, item_image, item_price,item_category, item_discount, item_description FROM items",
    function (err, result, fields) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred" });
      }
      res.json(result);
    }
  );
};

exports.getItemsCategory = async (req, res) => {
  const category = req.params.category;
  console.log(category);
  connection.query(
    'SELECT item_id, item_name, item_image, item_price,item_category, item_discount, item_description FROM items WHERE item_category = "' +
      category +
      '"',
    function (err, result, fields) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred" });
      }
      res.json(result);
    }
  );
};

exports.getItem = async (req, res) => {
  // get 1 item with its ID
  connection.query(
    "SELECT item_id,item_name,item_price,item_discount,item_description,item_image FROM items WHERE item_id=" +
      req.params.itemId,
    function (err, result, fields) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred" });
      }
      if (result.length === 0) {
        // If no item with the specified ID is found
        return res.status(404).json({ error: "Item not found" });
      }

      const item = result[0]; // Get the first item from the result set

      // Get the reviews for this item , join it with user to show only review , user_name item_id and rating. and add them to the item object and return it
      connection.query(
        "SELECT reviews.review, reviews.rating, users.user_name, reviews.item_id FROM reviews INNER JOIN users ON reviews.user_id = users.user_id WHERE reviews.item_id=" +
          req.params.itemId,
        function (err, result, fields) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "An error occurred" });
          }
          item.reviews = result;
          console.log(item);
          res.json(item);
        }
      );
    }
  );
};


exports.addReview = async (req, res) => {

  // add a review to an item
  const itemId = req.params.itemId;
  const userId = req.body.user_id;
  const rating = req.body.rating;
  const review = req.body.review;

  // Add the review
  connection.query(
    "INSERT INTO reviews (item_id, user_id, rating, review) VALUES (" +
      itemId +
      ", '" +
      userId +
      "', " +
      rating +
      ", '" +
      review +
      "')",
    function (err, result, fields) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred" });
      }
      res.json({ message: "Review added successfully" });
    }
  );
};
