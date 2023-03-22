import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  cartAddBook,
  cartDeleteBook,
  cartRemoveBook,
  Count,
} from "../../store/actions/cartItemsCreator";

const ShopCartTable = () => {
  const items = useSelector((state) => state.ShopCartReducer.cartItems);
  const dispatch = useDispatch();

  const renderItems = (el, index) => {
    const { title, count, total, id } = el;
    const onAddToCart = () => dispatch(cartAddBook(id));
    const onRemoveFromCart = () => dispatch(cartRemoveBook(id));
    const onDeleteFromCart = () => dispatch(cartDeleteBook(id));

    return (
      <tr key={`shop-item-${id}`}>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>{count}</td>
        <td>{total}$</td>
        <td>
          <Button variant="outline-success" onClick={onAddToCart}>
            <i className="fa-solid fa-circle-plus"></i>
          </Button>
          <Button variant="outline-warning" onClick={onRemoveFromCart}>
            <i className="fa-solid fa-circle-minus"></i>
          </Button>
          <Button variant="outline-danger" onClick={onDeleteFromCart}>
            <i className="fa-solid fa-trash"></i>
          </Button>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <h2>Your Order</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>№</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{items.map(renderItems)}</tbody>
      </Table>
      <b>Total price: {Count(items)}</b>
    </div>
  );
};

export default ShopCartTable;