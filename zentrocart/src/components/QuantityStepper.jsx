
function QuantityStepper({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="quantity-stepper">
      <button onClick={onDecrease}>−</button>

      <span>{quantity}</span>

      <button onClick={onIncrease}>+</button>
    </div>
  );
}

export default QuantityStepper;
