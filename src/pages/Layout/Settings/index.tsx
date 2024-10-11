import { useState } from 'react'
import { ITab } from '../../../lib/types'
import { ProfileSettings } from '../../../components/ProfileSettings'
import { ChangePassword } from '../../../components/ChangePassword'
import { ChangeLogin } from '../../../components/ChangeLogin'

export const Settings = () => {

    const [activeTab, setActiveTab] = useState<ITab>(ITab.Profile)

    const handleTabChange = (tab: ITab) => {
        setActiveTab(tab)
    }

    return (
        <>
            <div className="settings-container">
                <div className="settings-nav">
                    <button
                        className={activeTab === ITab.Profile ? 'active' : ''}
                        onClick={() => handleTabChange(ITab.Profile)}
                    >
                        Profile Info
                    </button>
                    <button
                        className={
                            activeTab === ITab.ChangeLogin ? 'active' : ''
                        }
                        onClick={() => handleTabChange(ITab.ChangeLogin)}
                    >
                        Change Login
                    </button>
                    <button
                        className={
                            activeTab === ITab.ChangePassword ? 'active' : ''
                        }
                        onClick={() => handleTabChange(ITab.ChangePassword)}
                    >
                        Change Password
                    </button>
                </div>
                {activeTab === ITab.Profile && <ProfileSettings />}
                {activeTab === ITab.ChangePassword && <ChangePassword />}
                {activeTab === ITab.ChangeLogin && <ChangeLogin />}
            </div>
        </>
    )
}
