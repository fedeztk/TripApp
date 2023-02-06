import {useNotificationContext} from "../context/notifications";
import CloseIcon from '@mui/icons-material/Close';
import {Alert, Collapse, IconButton} from "@mui/material";

export default function Notifications() {
    const [notifications, setNotifications] = useNotificationContext();
    return (
        <>
            {notifications?.map((notification, index) => {
                return (
                    <Collapse in={true} key={index}>
                        <Alert
                            severity={notification.type}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setNotifications(notifications.filter((_, i) => i !== index));
                                    }}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            }
                            sx={{mb: 2}}
                        >
                            {notification.message}
                        </Alert>
                    </Collapse>
                );
            })}
        </>
    );
}