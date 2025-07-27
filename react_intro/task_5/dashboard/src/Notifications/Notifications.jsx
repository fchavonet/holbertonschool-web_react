import './Notifications.css'
import closeButton from "../assets/close-button.png";
import { getLatestNotification } from "../utils/utils";

function Notifications() {
    return (
        <div className="notifications">
            <p>Here is the list of notifications</p>

            <button
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                }}
                aria-label="Close"
                onClick={() => console.log('close button has been clicked')}
            >
                <img src={closeButton} alt="close" style={{ width: '15px', height: '15px' }} />
            </button>

            <ul>
                <li data-priority="default" >New course available</li>
                <li data-priority="urgent" >New resume available</li>
                <li dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
            </ul>
        </div>
    )
}

export default Notifications