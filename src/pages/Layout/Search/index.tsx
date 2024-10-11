import { useEffect, useState } from 'react'
import { IUser } from '../../../lib/types'
import { handleSearchUser } from '../../../lib/api'
import { BASE_URL } from '../../../lib/constant'
import { FiLock, FiUnlock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export const Search = () => {
    const [text, setText] = useState<string>('')
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!text.trim()) {
            setUsers([])
        } else {
            setLoading(true)
            handleSearchUser(text)
                .then((res) => {
                    setUsers(res.payload as IUser[])
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoading(false)
                    }, 100)
                })
        }
    }, [text])

    return (
        <>
            <div className="search-container">
                <div className="search-input-section">
                    <input
                        type="text"
                        placeholder="Search for a friends..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="search-input"
                    />
                </div>

                {loading ? (
                    <>
                        <div className='loaderSearch_glob'>
                            <span className="loaderSearch"></span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="search-results-section">
                            {users.map((user) => (
                                <div key={user.id} className="user-card">
                                    <img
                                        src={BASE_URL + user.picture}
                                        alt="Profile"
                                        className="user-profile-pic"
                                    />
                                    <div className="user-details">
                                        <p className="user-name">
                                            {user.name} {user.surname}
                                        </p>
                                        <div className="group-search-actions">
                                            <span>
                                                {user.isPrivate ? (
                                                    <FiLock />
                                                ) : (
                                                    <FiUnlock />
                                                )}
                                            </span>
                                            <Link
                                                to={'/profile/' + user.id}
                                                className="user-account-label"
                                            >
                                                Account
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
