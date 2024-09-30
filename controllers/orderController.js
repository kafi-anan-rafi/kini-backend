async function PlaceOrder(req, res, next) {
  try {
    // Order place logic goes here
    res.status(200).send("order placed");
  } catch (error) {
    next(error);
  }
}

module.exports = { PlaceOrder };
