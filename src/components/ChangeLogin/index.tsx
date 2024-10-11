import { useForm } from 'react-hook-form'
import { IPartialUser } from '../../lib/types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Error } from '../Error'
import { handleChangeLogin } from '../../lib/api'

export const ChangeLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IPartialUser>()
    const [errorRes, setErrorRes] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleUpdate = (data: IPartialUser) => {
        setLoading(true)
        handleChangeLogin(data)
            .then((res) => {
                if (res.status == 'error' && res.message) {
                    setErrorRes(res.message)
                } else {
                    navigate('/profile')
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 900)
            })
    }

    return (
        <>
            {loading ? (
                <>
                    <div className="loader_glob">
                        <div className="loader2"></div>
                    </div>
                </>
            ) : (
                <>
                    <section className="settings-section">
                        <h2>Change Login</h2>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <Error children={errorRes} />
                            <div className="form-group">
                                <label htmlFor="currentLogin">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    id="currentLogin"
                                    placeholder="Enter your current password"
                                    {...register('password', {
                                        required: 'Please fill your password',
                                        minLength: {
                                            value: 6,
                                            message:
                                                'Password must be a 6 characters',
                                        },
                                    })}
                                />
                                <Error children={errors.password?.message} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newLogin">New Login</label>
                                <input
                                    type="text"
                                    id="newLogin"
                                    placeholder="Enter your new login"
                                    {...register('login', {
                                        required: 'Please fill your login',
                                    })}
                                />
                                <Error children={errors.login?.message} />
                            </div>
                            <button type="submit" className="submit-btn">
                                Update Login
                            </button>
                        </form>
                    </section>
                </>
            )}
        </>
    )
}
