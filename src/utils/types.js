import PropTypes from "prop-types";

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});
const orderTypes = PropTypes.shape({
  orderNumber: PropTypes.string,
  orderIdText: PropTypes.string,
  orderImg: PropTypes.string,
  orderStatus: PropTypes.string,
  orderExpectationText: PropTypes.string,
});
export { ingredientPropTypes, orderTypes };
