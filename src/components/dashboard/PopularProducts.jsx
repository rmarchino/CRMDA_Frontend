import { Link } from "react-router-dom";
import Tela1 from "../../assets/tela1.jpg";
import Tela2 from "../../assets/tela2.jpg";
import Tela3 from "../../assets/tela3.jpg";
import Tela4 from "../../assets/tela4.jpg";
import Tela5 from "../../assets/tela5.jpg";
import Tela6 from "../../assets/tela6.jpg";

const popularProductData = [
  {
    id: 1,
    name: "Tela algodón",
    description: "Tela nacional de buena calidad",
    imageUrl: Tela1,
    price: "$500.99",
    stock: 0,
  },
  {
    id: 2,
    name: "Tela sintético",
    description: "Tela sintético importada de Berlín",
    imageUrl: Tela2,
    price: "$786.99",
    stock: 234,
  },
  {
    id: 3,
    name: "Tela natural",
    description: "Tela natural de alta calidad",
    imageUrl: Tela3,
    price: "$450.99",
    stock: 123,
  },
  {
    id: 4,
    name: "Tela cotton",
    description: "Tela cotton de alta calidad",
    imageUrl: Tela4,
    price: "$650.99",
    stock: 456,
  },
  {
    id: 5,
    name: "Tela linen",
    description: "Tela linen de alta calidad",
    imageUrl: Tela5,
    price: "$850.99",
    stock: 789,
  },
  {
    id: 6,
    name: "Tela silk",
    description: "Tela silk de alta calidad",
    imageUrl: Tela6,
    price: "$950.99",
    stock: 100,
  },
];

const PopularProducts = () => {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 w-[20rem]">
      <strong className="text-gray-700 font-medium">Productos populares</strong>
      <div className="mt-4 flex-col gap-3">
        {popularProductData.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="flex hover:no-underline"
          >
            <div className="w-10 h-10 min-w-0 bg-gray-200 rounded-sm overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800">{product.name}</p>
              <span
                className={`text-sm font-medium ${
                  product.stock === 0 ? "text-orange-500" : "text-green-500"
                }`}
              >
                {product.stock === 0
                  ? "Agotado"
                  : product.stock + " " + "Disponible"}
              </span>
            </div>
            <div className="text-sm text-gray-400 pl-2">{product.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
