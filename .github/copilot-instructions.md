# Redux Pro - Copilot Instructions

## Architecture Overview

This is a **React + Redux Toolkit e-commerce application** with:
- **State Management**: Redux Toolkit slices for products, cart, and counter
- **Data Fetching**: Async thunks ([fetchProductAction.js](src/redux/action/fetchProductAction.js), [fetchSingleProduct.js](src/redux/action/fetchSingleProduct.js)) call FakeStore API
- **Routing**: React Router for multi-page navigation (Home, Cart, Detail, Counter, Form, Filter, Dashboard)
- **UI Framework**: Bootstrap 5 + Framer Motion for styling and animations
- **Build Tool**: Vite with React Compiler enabled for performance optimization

## Redux State Structure

### Store Shape
```
{
  product: { products[], productPending, productError, singleProduct, singleProductPending, singleProductError }
  cart: { cartItems[], likedItems[] }
  counter: { count }
}
```

### Key Patterns
- **Async Operations**: Use `extraReducers` builder pattern for `fetchProducts` and `fetchSingleProduct` thunks (pending/fulfilled/rejected states)
- **Cart Logic**: Toggle add/remove via `addToCart` reducer (findIndex checks existence), separate `qtyIncrease`/`descQty` for quantity management
- **Counter**: Simple reducers with optional payload support (`incrementByAmount`)
- Reference slices in [src/redux/](src/redux/) directory

## Custom Hooks

- [useCounter.js](src/hooks/useCounter.js): Wraps counter slice selectors and dispatch actions; returns `{count, amount, setAmount, handleIncrement, handleDecrement, handleReset, handleIncrementByAmount}`
- [useApiCall.js](src/hooks/useApiCall.js): Generic fetch hook with `{data, loading, error, refetch}`, accepts `{immediate: boolean}` option
- [useFilterData.js](src/hooks/useFilterData.js): Custom filter logic (inspect for patterns when filtering products)

## Component Conventions

- **Pages** ([src/pages/](src/pages/)): Route-level components that dispatch thunks and manage local loading state (see [Home.jsx](src/pages/Home.jsx) pattern)
- **Components** ([src/components/](src/components/)): Reusable UI (ProductCard, FilterData, Dashboard) - receive data via props
- **Forms**: Use React Hook Form + Zod validation ([Form.jsx](src/pages/form/Form.jsx))
- **Styling**: Bootstrap classes (`container`, `row`, `mb-4`, etc.) + inline CSS via App.css

## Developer Workflow

**Build & Dev**:
- `npm run dev` - Start Vite dev server with HMR
- `npm run build` - Production bundle
- `npm run lint` - ESLint check

**Redux Debugging**:
- Thunk action prefixes: `"products/fetchProducts"`, `"products/fetchSingleProduct"`, `"cartSlice"`, `"counter"`
- Products slice handles both list and single product fetching with separate pending/error states
- Cart always reads from `state.cart.cartItems` not `state.product.products`

## Critical Integration Points

1. **API Integration**: FakeStore API endpoint hardcoded in thunks; extend by following [fetchProductAction.js](src/redux/action/fetchProductAction.js) pattern
2. **Router Setup**: [App.jsx](src/App.jsx) defines all routes; new pages must be added as `<Route>` entries
3. **Redux Provider**: Wrapped at [main.jsx](src/main.jsx) with BrowserRouter; both required for app initialization
4. **Bootstrap**: Imported globally in [main.jsx](src/main.jsx); use class-based utilities throughout

## Common Tasks

- **Add New Redux Slice**: Create in [src/redux/](src/redux/), export actions/reducer, add to `store.js` `configureStore`
- **Add New Page**: Create `.jsx` in [src/pages/](src/pages/), dispatch thunks with `useDispatch`, select state with `useSelector`, add route to App.jsx
- **Fetch New Data**: Create async thunk in [src/redux/action/](src/redux/action/) following FakeStore pattern, handle pending/fulfilled/rejected in slice's `extraReducers`
- **Update Cart**: Use `addToCart` to toggle items (checks existence), or `qtyIncrease`/`descQty` for quantity changes

## ESLint & React Compiler

- React Compiler enabled in [vite.config.js](vite.config.js) - may impact build speed; disable if debugging compilation
- ESLint config in [eslint.config.js](eslint.config.js); run `npm run lint` to validate
