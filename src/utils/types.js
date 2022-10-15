import PropTypes from 'prop-types';

 const types = PropTypes.shape({ 
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
  __v: PropTypes.number
});
const dataTypes = PropTypes.shape({ 
  orderNumber: PropTypes.string,
  orderIdText: PropTypes.string,
  orderImg: PropTypes.string,
  orderStatus: PropTypes.string,
  orderExpectationText: PropTypes.string,
});
export {types,dataTypes};