import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Order, { loader as orderLoader } from "./features/order/Order";
import { action as updatePriority } from "./features/order/UpdateOrder";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";

import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updatePriority,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
