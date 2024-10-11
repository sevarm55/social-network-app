import { useEffect, useRef, useState } from "react"
import { handleGetALlRequests, handleRequestsAccept, handleRequestsDecline } from "../../../lib/api"
import { IRequests } from "../../../lib/types"
import { BASE_URL } from "../../../lib/constant"
import { Link } from "react-router-dom"

export const Requests = () => {

    const [requests,setRequests] = useState<IRequests[]>([])
    const link = useRef<HTMLAnchorElement | null>(null)

    useEffect(() => {
        handleGetALlRequests()
        .then(res => {
            setRequests(res.payload as IRequests[])
        })
    },[])


    const handleAcceptRequest = (id:number) => {
        handleRequestsAccept(id)
        .then(() => {
            setRequests(requests.filter(request => request.id !== id))
        })
    }

    const handleDeclineRequest = (id:number) => {
        handleRequestsDecline(id)
        .then(() => {
            setRequests(requests.filter(request => request.id !== id))
        })
    }

    return <>
        <div className="requests-page-container">
                    <h2 className="requests-title">Friend Requests</h2>
                    <div className="requests-list">
                        {requests.map(({ user, id }) => (
                            <div key={id} className="request-card">
                                <img
                                    src={
                                        BASE_URL + user.picture
                                    }
                                    alt="Profile"
                                    className="request-profile-pic"
                                />
                                <div className="request-info">
                                    <p
                                        onClick={() => link.current?.click()}
                                        className="request-name"
                                    >
                                        {user.name} {user.surname}
                                    </p>
                                    <Link
                                        ref={link}
                                        to={'/profile/' + user.id}
                                        hidden
                                    >
                                        account
                                    </Link>
                                </div>
                                <div className="request-actions">
                                    <button
                                        className="accept-button"
                                        onClick={() =>
                                            handleAcceptRequest(id)
                                        }
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="decline-button"
                                        onClick={() => handleDeclineRequest(id)}
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    </>
}