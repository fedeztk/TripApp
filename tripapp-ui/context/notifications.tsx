import {createContext, useContext, useState} from "react";
import {notification} from "../types/notification";

const Context = createContext<[notification[], (notification: notification[]) => void]>([[], () => { }]);

export function NotificationProvider({children}: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<notification[]>([]);
    return <Context.Provider value={[notifications, setNotifications]}> {children} </Context.Provider>;
}

export function useNotificationContext() {
    return useContext(Context);
}
