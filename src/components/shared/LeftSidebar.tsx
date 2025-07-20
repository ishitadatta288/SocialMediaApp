import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
//import { Button } from '../ui/button';
//import { LogOutIcon } from 'lucide-react';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import type { INavLink } from '@/types';
import { Button } from '../ui/button';


const LeftSidebar = () => {
  const { pathname } = useLocation()
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])
  return (
    <nav className="leftsidebar fixed top-0 left-0 h-screen w-64 bg-white shadow-lg flex flex-col p-4">
      <div className=' flex flex-col gap-11'>
        <Link to="/" className=' flex gap-3 items-center text-2xl font-serif font-bold'>
          <img src="/assets/images/logo.png" alt="logo"
            width={30} height={32} />SnapTalk
        </Link>

        <Link to={`/profile/${user.id}`} className=' flex items-center gap-4'>
          <img src={user.imageUrl || "/assets/images/user.png"} alt="profile" className=' h-12 w-12 rounded-full' />
          <div className=' flex flex-col'>
            <p className=' body-bold'>
              {user.name}
            </p>
            <p className=' small-regular text-light-3'>
              @{user.username}
            </p>
          </div>
        </Link>

        <ul className=' flex flex-col gap-1'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route

            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-purple-700'}`}>
                <NavLink to={link.route} className=" flex gap-4 items-center p-4">
                  <img src={link.imgURL} alt={link.label}
                    className={` group-hover:invert-white ${isActive && 'invert-white'}`}/>
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>


      <Button variant="ghost" className=' shad-button_ghost' onClick={() => signOut()}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className=' small-medium lg:base-medium'>Logout</p>
      </Button>
    </nav>

  )
}

export default LeftSidebar