import { useOutletContext } from "react-router-dom"
import { IContext } from "../../lib/types"
import { BASE_URL, DEF_PIC } from "../../lib/constant"
import { MDBCardText, MDBSwitch } from "mdb-react-ui-kit"
import { FiLock, FiUnlock } from "react-icons/fi"
import { handlePrivacySwitch } from "../../lib/api"

export const ProfileSettings = () => {

    const {account,setAccount} = useOutletContext<IContext>()

    const handleTogglePrivate = () => {
        handlePrivacySwitch()
        .then(res => {
            setAccount({
                ...account,
                isPrivate: res.payload as boolean
            })
            console.log(res)
        })
    }
    
    return account && <>
        <section className="settings-section">
                <h2>Profile Info</h2>
                <div className="profile-info">
                    <div className="profile-header">
                        <img
                            src={account.picture ? `${BASE_URL}${account.picture}` : DEF_PIC }
                            alt="Profile"
                            className="profile-img"
                        />
                        <div className="profile-details">
                            <p>
                                <strong>Name:</strong> {account.name}
                            </p>
                            <p>
                                <strong>Surname:</strong> {account.surname}
                            </p>
                            <p>
                                <strong>Bio:</strong> Web Developer | Tech
                                Enthusiast
                            </p>
                        </div>
                    </div>
                    <hr />
                    <MDBCardText>PrivacySwitch</MDBCardText>
                    <div className="privacySwitch">
                        <MDBSwitch
                            className="privacySwitch"
                            id="privacySwitch"
                            checked={account.isPrivate} 
                            onChange={handleTogglePrivate}
                            style={{ marginRight: '10px' }}
                            />
                        <span>{account.isPrivate ? <FiLock /> : <FiUnlock />}</span>
                    </div>
                </div>
            </section>
    </>
}