import { useOutletContext } from 'react-router-dom'
import { IContext } from '../../../lib/types'
import { BASE_URL, DEF_COV, DEF_PIC } from '../../../lib/constant'
import { useRef, useState } from 'react'
import { handleUploadCover, handleUploadPicture } from '../../../lib/api'

export const Home = () => {
    const { account, setAccount } = useOutletContext<IContext>()
    const [loading, setLoading] = useState<boolean>(false)
    const photo = useRef<HTMLInputElement | null>(null)
    const cover = useRef<HTMLInputElement | null>(null)

    const handleUpload = () => {
        setLoading(true)
        if (photo.current) {
            const file = photo.current.files?.[0]
            if (file) {
                const form = new FormData()
                form.append('picture', file)

                handleUploadPicture(form)
                    .then((res) => {
                        if (res.status == 'ok') {
                            setAccount({
                                ...account,
                                picture: res.payload as string,
                            })
                        }
                    })
                    .finally(() => {
                        setTimeout(() => {
                            setLoading(false)
                        }, 900)
                    })
            }
        }
    }

    const handleUpdateCov = () => {
        if (cover.current) {
            const file = cover.current.files?.[0]
            if (file) {
                const form = new FormData()
                form.append('cover', file)

                handleUploadCover(form)
                    .then((res) => {
                        if (res.status == 'ok') {
                            setAccount({
                                ...account,
                                cover: res.payload as string,
                            })
                        }
                    })
            }
        }
    }

    return (
        <>
            <div className="profile-container">
                <div className="profile-cover">
                    <div
                        onClick={() => cover.current?.click()}
                        className="cover"
                        style={{
                            objectFit: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100%',
                            backgroundPosition: 'right',
                            backgroundImage: !account.cover
                                ? `url(${DEF_COV})`
                                : `url(${BASE_URL}${account.cover})`,
                        }}
                    >
                        <input
                            type="file"
                            onChange={handleUpdateCov}
                            ref={cover}
                            hidden
                        />
                    </div>
                </div>

                <div className="profile-header">
                    <div className="left">
                        <div className="profile-picture">
                            {loading ? (
                                <>
                                    <div className="loader_picture">
                                    <span className="loader3"></span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <img
                                        src={
                                            !account.picture
                                                ? DEF_PIC
                                                : BASE_URL + account.picture
                                        }
                                        alt="Profile"
                                        onClick={() => photo.current?.click()}
                                    />
                                </>
                            )}
                            <input
                                type="file"
                                hidden
                                ref={photo}
                                onChange={handleUpload}
                            />
                        </div>
                    </div>
                    <div className="right">
                        <div className="profile-details">
                            <div className="profile-name-section">
                                <h2 className="username">
                                    {account.name} {account.surname}
                                </h2>
                            </div>
                            <div className="profile-stats">
                                <div className="stat">
                                    <strong>{account.followers?.length}</strong>{' '}
                                    followers
                                </div>
                                <div className="stat">
                                    <strong>{account.following?.length}</strong>{' '}
                                    following
                                </div>
                            </div>
                            <div className="profile-bio">
                                <p className="bio-text">
                                    Photographer | Traveler | Dreamer <br />
                                    Living the dream one click at a time 🌍📸
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="profile-gallery">
                    <h2>NO PHOTO</h2>
                </div>
            </div>
        </>
    )
}
