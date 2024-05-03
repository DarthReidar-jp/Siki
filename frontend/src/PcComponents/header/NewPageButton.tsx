import { Link } from 'react-router-dom';
import { GoPlus } from "react-icons/go";

const NewPageButton = () => (
  <div>
    <Link to="/new" className=" w-10 h-10 px-2 py-2 mr-3 bg-white font-semibold text-lg rounded-full border hover:bg-gray-200 transition duration-300 flex items-center justify-center">
      <GoPlus />
    </Link>
  </div>
);

export default NewPageButton;
