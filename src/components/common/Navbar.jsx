import { useEffect, useState } from "react";
import logo from "../../assets/advisorpedia.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiConnector } from "../../services/apiconnector";
import ProfileDropDown from "../auth/ProfileDropDown";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import VerticalNavMenu from "./VerticalNav";

function Navbar() {
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
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const matchRoute =(route) =>{
    return matchPath({ path:route },location.pathname)
  }
 
  
  return (
    <>
      <div
        className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
          location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}
      >
        <div
          className={`flex w-11/12 max-w-maxContent items-center justify-between `}
        >
          <Link to={"/"}>
            <img src={logo} width={160} height={25} className="h-[35px]" loading="lazy" />
          </Link>

          <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                
              </li>
            ))}
          </ul>
        </nav>

          <div className="hidden items-center gap-x-4 md:flex">
            {token !== null && <Link to="/mypost">my post</Link>}

            {token === null && (
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign up
                </button>
              </Link>
            )}
            {token !== null && <ProfileDropDown />}
          </div>

          <div
            className="block transition-all duration-600 md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <RxCross1 fontSize={24} className="text-white" />
            ) : (
              <AiOutlineMenu fontSize={24} className="text-white" />
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <VerticalNavMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
    </>
  );
}

export default Navbar;
