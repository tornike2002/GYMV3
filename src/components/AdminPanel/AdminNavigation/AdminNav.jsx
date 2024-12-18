import { useLocation, Link } from "react-router-dom";

function AdminNav({setIsOpen}) {
  const location = useLocation();

  const handleNavClick = () => {
    setIsOpen(false);
  };
  const navLink = [
    // {name: "Dashboard", path: "/admin/dashboard"},
    {name: "Stories", path: "/admin/stories"},
    {name: "Services", path: "/admin/admin-services"},
    {name: "Blogs", path: "/admin/blogs"},
  ]
  return (
    <div className=" flex items-center justify-center">

    <ul className="  flex items-center justify-center max-w-[520px] gap-2 bg-[#222]  rounded-[12.5rem]  border-[#4D4D4D] z-10">
    {navLink?.map(({ name, path }) => {
      const isActive = location.pathname === path;

      return (
        <li
          key={name}
          className={`flex justify-center items-center gap-2 h-[3rem] px-4   transition-colors duration-300 rounded-[2.875rem] ${
            isActive ? "bg-[#D7FD44]" : "bg-transparent"
          }`}
        >
          <Link
            to={path}
            onClick={handleNavClick}
            className={`font-Nunito text-[1rem] font-[700] leading-normal ${
              isActive ? "text-black" : "text-white"
            }`}
          >
            {name}
          </Link>
        </li>
      );
    })}
  </ul>
    </div>
  )
}

export default AdminNav