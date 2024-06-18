import { Link } from "react-router-dom";
import getOrderStatus from "../utils/index";

const RecentOrders = () => {
  const orderRecentData = [
    {
      id: "1",
      productId: "4324",
      customerId: "20143",
      customerName: "Shirley A. Lape",
      orderDate: "2023-11-29",
      totalAmount: "$5678",
      status: "Entregada",
      address: "Cartagena 520",
    },
    {
      id: "2",
      productId: "4325",
      customerId: "20145",
      customerName: "Patricia Casas",
      orderDate: "2023-11-29",
      totalAmount: "$8678",
      status: "Pendiente",
      address: "Barranca 310",
    },
    {
      id: "3",
      productId: "4326",
      customerId: "20147",
      customerName: "Juan Carlos Lopez",
      orderDate: "2023-11-29",
      totalAmount: "$9678",
      status: "Procesando",
      address: "Bogota 420",
    },
    {
      id: "4",
      productId: "4327",
      customerId: "20149",
      customerName: "Luisa Fernandez",
      orderDate: "2023-11-29",
      totalAmount: "$12678",
      status: "Cancelada",
      address: "Cali 520",
    },
    {
      id: "5",
      productId: "4328",
      customerId: "20151",
      customerName: "Maria Rodriguez",
      orderDate: "2023-11-29",
      totalAmount: "$15678",
      status: "Entregada",
      address: "Medellin 310",
    },
    {
      id: "6",
      productId: "4329",
      customerId: "20153",
      customerName: "Andres Garcia",
      orderDate: "2023-11-29",
      totalAmount: "$18678",
      status: "Entregada",
      address: "Cartagena 420",
    },
  ];

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Ordenes recientes</strong>
      <div className="mt-3">
        <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
          <thead>
            <tr>
              <td>ID</td>
              <td>Producto ID</td>
              <td>Cliente ID</td>
              <td>Nombre del cliente</td>
              <td>Fecha de orden</td>
              <td>Monto Total</td>
              <td>Estado</td>
              <td>Dirección</td>
            </tr>
          </thead>
          <tbody>
            {orderRecentData.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/orders${order.id}`}>{order.id}</Link>
                </td>
                <td>
                  <Link to={`/products${order.productId}`}>
                    {order.productId}
                  </Link>
                </td>
                <td>
                  <Link to={`/customers${order.customerName}`}>
                    {order.customerId}
                  </Link>
                </td>
                <td>{order.customerName}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.totalAmount}</td>
                <td>{getOrderStatus(order.status)}</td>
                <td>{order.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
