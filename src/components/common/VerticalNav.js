import React from "react";

import logo from "../../assets/advisorpedia.png";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { apiConnector } from "../../services/apiconnector";
import { logout } from "../../services/operations/authAPI";
import { VscDashboard, VscSignOut } from "react-icons/vsc";


const VerticalNavMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const NavbarLinks  = [
    {
      title:"Business",
      path:"/business"
    },
    {
      title:"Entertainment",
      path:"/entertainment"
    },
    {
      title:"General",
      path:"/general"
    },
    {
      title:"Health",
      path:"/health"
    },
    {
      title:"Science",
      path:"/science"
    },
    {
      title:"Sports",
      path:"/sports"
    },
    {
      title:"Technology",
      path:"/technology"
    }
  ]
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModal = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="fixed  inset-0 z-[1000] bg-white  grid top-[3.5rem] place-items-center overflow-auto  bg-opacity-10 backdrop-blur-sm lg:hidden">
      <div className="w-[100%]  rounded-lg   p-6">
        <div className="flex flex-col gap-4 items-center">
          <Link to={"/"}>
            <img src={logo} width={160} height={32} loading="lazy" />
          </Link>
          {NavbarLinks.map((element, index) => (
            <ul
              key={index}
              className="text-white"
              onClick={() => handleModal()}
            >
              
                <Link to={element?.path}>
                  <p className={"text-white"}>{element.title}</p>
                </Link>
              
            </ul>
          ))}

          {token === null && (
            <Link to={"/login"}>
              <button
                onClick={() => handleModal()}
                className="text-white  bg-richblack-800 rounded-md   py-[8px] px-[12px] text-sm  hover:bg-richblack-700 hover:text-richblack-25 "
              >
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <button
                onClick={() => handleModal()}
                className="text-white  bg-richblack-800 rounded-md   py-[8px] px-[12px] text-sm  hover:bg-richblack-700 hover:text-richblack-25"
              >
                Sign up
              </button>
            </Link>
          )}

          {token !== null && (
            <button
              onClick={() => (dispatch(logout(navigate)), handleModal())}
              className="text-white rounded-md flex  items-center gap-x-1 py-[8px] px-[12px] text-sm bg-richblack-800  hover:bg-richblack-700 hover:text-richblack-25"
            >
              <VscSignOut className="text-lg" />
              Logout
            </button>
          )}

          {token !==null && (
            <Link to="/dashboard/my-courses" onClick={() => handleModal()}>
              <p className="text-white"> My Post</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalNavMenu;
