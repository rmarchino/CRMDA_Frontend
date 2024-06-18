export default function getOrderStatus(status) {
  switch (status) {
    case "Procesando":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-600-600 bg-yellow-100">
          {status.replace("-", "").toLowerCase()}
        </span>
      );
    case "Cancelada":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-red-600 bg-red-100">
          {status.replace("-", "").toLowerCase()}
        </span>
      );
    case "Pendiente":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
          {status.replace("-", "").toLowerCase()}
        </span>
      );
    case "Entregada":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
          {status.replace("-", "").toLowerCase()}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
          {status.replace("-", "").toLowerCase()}
        </span>
      );
  }
}
