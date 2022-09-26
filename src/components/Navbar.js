import "./Navbar.css"

//Components
import { NavLink, Link } from "react-router-dom";
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsGear, BsFillCameraFill} from "react-icons/bs";

//Hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Redux
import { logout, reset } from "../slices/authSlice";

const Navbar = () => {
    const {auth} = useAuth();
    const {user} = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());

        navigate("/login");
    }

    return (
        <nav id="nav">
            <Link to="/">InstaClone</Link>
            <form id="search-form">
                <BsSearch />
                <input type="text" placeholder="Pesquisar"/>
            </form>
            <ul id="nav-links">
                {auth ? (
                    <>
                        <li>
                            <NavLink to="/">
                                <BsHouseDoorFill />
                            </NavLink>
                         </li>
                         {user && (
                            <li>
                                <NavLink to={`/users/${user._id}`}>
                                    <BsFillPersonFill />
                                </NavLink>
                            </li>
                         )}
                         <li>
                            <NavLink to="/profile">
                                <BsGear />
                            </NavLink>
                         </li>
                         <li onClick={handleLogout}>
                            <span>Sair</span>
                         </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login">
                                Entrar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">
                                Cadastrar
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
    };

export default Navbar;