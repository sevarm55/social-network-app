import { useForm } from 'react-hook-form'
import { INewPass } from '../../lib/types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Error } from '../Error'
import { handleChangePassword } from '../../lib/api'

export const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<INewPass>()
    const [errorRes, setErrorRes] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleUpdate = (data: INewPass) => {
        setLoading(true)
        handleChangePassword(data)
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
                <div className='loader_glob'>
                    <div className="loader2"></div>
                </div>
            ) : (
                <>
                    <section className="settings-section">
                        <h2>Change Password</h2>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <Error children={errorRes} />
                            <div className="form-group">
                                <label htmlFor="currentPassword">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    placeholder="Enter your current password"
                                    {...register('old', {
                                        required:
                                            'Please fill your old password',
                                        minLength: {
                                            value: 6,
                                            message:
                                                'Password must be at least 6 characters',
                                        },
                                    })}
                                />
                                <Error children={errors.old?.message} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="newPassword">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    placeholder="Enter a new password"
                                    {...register('newpwd', {
                                        required:
                                            'Please fill your new password',
                                        minLength: {
                                            value: 6,
                                            message:
                                                'Password must be at least 6 characters',
                                        },
                                    })}
                                />
                                <Error children={errors.newpwd?.message} />
                            </div>
                            <button type="submit" className="submit-btn">
                                Change Password
                            </button>
                        </form>
                    </section>
                </>
            )}
        </>
    )
}
