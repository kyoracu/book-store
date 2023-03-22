import { shopCartActions } from "../reducers/shopCartReducers";

const { triggerCartItems } = shopCartActions;

export const Count = (items) => {
  let total = 0;
  for (let i in items) {
    total += items[i].total;
  }
  return total;
};

const createItem = (book, cartBook = {}, quantity) => {
  const { count = 0, total = 0, id = book.id, title = book.title } = cartBook;

  return {
    id,
    title,
    count: count + quantity,
    total: total + book.price * quantity,
  };
};

const updateItem = (cartItems, item, idx) => {
  if (item.count === 0) {
    return cartItems.filter((el) => el.id !== item.id);
  }
  if (idx > -1) {
    const before = cartItems.slice(0, idx);
    const after = cartItems.slice(idx + 1);
    return [...before, item, ...after];
  }

  return [...cartItems, item];
};

const updateOrder = (state, id, quantity) => {
  const { books } = state.BookListReducer;
  const { cartItems } = state.ShopCartReducer;

  const booksItem = books.find((el) => el.id === id);
  const idx = cartItems.findIndex((el) => el.id === id);
  const cartItem = cartItems[idx];

  const item = createItem(booksItem, cartItem, quantity);
  return updateItem(cartItems, item, idx);
};

export const cartAddBook = (id) => (dispatch, getState) => {
  const state = getState();
  const items = updateOrder(state, id, 1);
  dispatch(triggerCartItems(items));
};

export const cartRemoveBook = (id) => (dispatch, getState) => {
  const state = getState();
  const items = updateOrder(state, id, -1);
  dispatch(triggerCartItems(items));
};

export const cartDeleteBook = (id) => (dispatch, getState) => {
  const { cartItems } = getState().ShopCartReducer;
  const items = cartItems.filter((el) => el.id !== id);
  dispatch(triggerCartItems(items));
};
