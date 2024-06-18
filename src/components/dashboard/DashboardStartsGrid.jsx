import { IoBagHandle } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";
import { FiShoppingCart } from "react-icons/fi";
import propTypes from "prop-types";

const DashboardStartsGrid = () => {
  return (
    <div className="flex gap-4 w-full cursor-pointer">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center  bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total de ventas
          </span>
          <div className="flex items-center">
            <strong className="text-xs text-gray-700 font-semibold">
              $34525.60
            </strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center  bg-red-500">
          <TbTruckDelivery className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Gastos</span>
          <div className="flex items-center">
            <strong className="text-xs text-gray-700 font-semibold">
              S/. 25525.60
            </strong>
            <span className="text-sm text-green-500 pl-2">-334</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center  bg-yellow-500">
          <HiOutlineUsers className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total de clientes
          </span>
          <div className="flex items-center">
            <strong className="text-xs text-gray-700 font-semibold">
              S/. 21896.60
            </strong>
            <span className="text-sm text-red-500 pl-2">-30</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center  bg-green-500">
          <FiShoppingCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total de ordenes
          </span>
          <div className="flex items-center">
            <strong className="text-xs text-gray-700 font-semibold">
              S/. 35895.60
            </strong>
            <span className="text-sm text-red-500 pl-2">-43</span>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
};

export default DashboardStartsGrid;

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}

BoxWrapper.propTypes = {
  children: propTypes.node,
};
