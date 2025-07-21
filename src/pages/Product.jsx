import DeviceTableComponent from "../components/DeviceTable";

const Product = () => {
    return (
        <div className="mt-10 font-fustat">
            <p>Device Page</p>
            <div>
                <h1 className="text-2xl font-bold text-center mb-2">Device Management</h1>
                <p className="text-center text-gray-600">Manage your products and devices efficiently.</p>
            </div>
            <DeviceTableComponent></DeviceTableComponent>
        </div>
    );
};

export default Product;