
import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import './Header.css';
import CustomLink from '../../../Components/CustomLink/CustomLink';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import useAdmin from '../../../hooks/useAdmin';
import { Link } from 'react-router-dom';
const Header = ({ children }) => {
    const [sidebar, setSidebar] = useState(false);
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const logout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }
    return (
        <nav>
            <div className="drawer drawer-end">
                <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <div className="w-full navbar bg-primary text-white sticky top-0 z-50 mx-auto m-0">
                        <div className="flex-none lg:hidden" >
                            <label for="nav-drawer" tabIndex='0' className="btn btn-square btn-ghost">
                                <FaIcons.FaBars />
                            </label>
                        </div>
                        <div className="flex-1 px-5 font-bold text-2xl text-secondary">
                            <Link to='/'>SK SAW</Link>
                        </div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                                <li><CustomLink to='/' >Home</CustomLink></li>
                                <li><CustomLink to='/blogs' >Blogs</CustomLink></li>
                                <li><CustomLink to='/all-product' >All Products</CustomLink></li>
                                <li><CustomLink to='/portfolio'>Portfolio</CustomLink></li>

                                {
                                    user && <li><CustomLink to='/dashboard' >Dashboard</CustomLink></li>
                                }

                                <li>{user ? <button onClick={logout}>Logout</button> : <CustomLink to='/login'>Login</CustomLink>}</li>
                            </ul>
                        </div>
                    </div>
                    {children}
                </div>
                <div className="drawer-side">
                    <label for="nav-drawer" className="drawer-overlay"> </label>
                    <ul onClick={() => setSidebar(!sidebar)} className="menu p-4 overflow-y-auto w-80 bg-primary text-white">
                        <li><CustomLink to='/' >Home</CustomLink></li>
                        <li><CustomLink to='/blogs' >Blogs</CustomLink></li>
                        <li><CustomLink to='/all-products' >All Products</CustomLink></li>
                        <li><CustomLink to='/portfolio'>Portfolio</CustomLink></li>

                        {
                            user
                            &&
                            <div className="collapse collapse-arrow">
                                <input type="checkbox" className="peer" />
                                <div className="collapse-title  rounded-tr-xl rounded-tl-xl bg-primary text-white text-start">
                                    Dashboard
                                </div>
                                <div className="collapse-content  rounded-br-xl rounded-bl-xl text-gray-300 ">
                                    <ul>
                                        <li><CustomLink to="/dashboard" className="uppercase">My Orders</CustomLink></li>

                                        {
                                            admin ? <li></li> : <li> <CustomLink to="/dashboard/add-review" className="uppercase" > Add A Review </CustomLink></li>
                                        }


                                        {
                                            admin && <>
                                                <li><CustomLink to="/dashboard/all-users" className="uppercase" > All Users</CustomLink> </li>
                                                <li><CustomLink to="/dashboard/add-product" className="uppercase">Add Porduct</CustomLink></li>
                                            </>
                                        }
                                        <li><CustomLink to="/dashboard/profile" className="uppercase">My Profile</CustomLink></li>
                                    </ul>
                                </div>
                            </div>
                        }


                        <li>{user ? <button onClick={logout}>Logout</button> : <CustomLink to='/login'>Login</CustomLink>}</li>
                    </ul>
                </div>
            </div>
        </nav>
    );

};

export default Header;