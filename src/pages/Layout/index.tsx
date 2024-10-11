import { useEffect, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { handleLogout, handleVerify } from '../../lib/api'
import { IUser } from '../../lib/types'

export const Layout = () => {
    const [account, setAccount] = useState<IUser | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(() => {
        handleVerify()
            .then((res) => {
                if (!res.user) {
                    navigate('/login')
                } else {
                    setAccount(res.user)
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 900)
            })
    }, [])

    const handleLogoutUser = () => {
        handleLogout().then((res) => {
            if (res.status == 'ok') {
                navigate('/login')
            }
        })
    }

    return (
        account && (
            <>
                <nav className="nav">
                    <div className="left">
                        <NavLink to={'/profile'} end>
                            Profile
                        </NavLink>
                        <NavLink to={'/profile/search'}>Search</NavLink>
                        <NavLink to={'/profile/posts'}>Posts</NavLink>
                        <NavLink to={'/profile/followers'}>Followers</NavLink>
                        <NavLink to={'/profile/followings'}>Followings</NavLink>
                        {account.isPrivate == true && (
                            <NavLink to={'/profile/requests'}>Notify</NavLink>
                        )}
                    </div>
                    <div className="right">
                        <NavLink to={'/profile/settings'}>
                            <IoSettingsOutline size={19} />
                        </NavLink>
                        <button onClick={handleLogoutUser}>Logout</button>
                    </div>
                </nav>

                {loading ? (
                    <>
                        <div className="loading_anim">
                            <span className="loader"></span>
                        </div>
                    </>
                ) : (
                    <>
                        <Outlet context={{ account, setAccount }} />
                    </>
                )}
            </>
        )
    )
}
