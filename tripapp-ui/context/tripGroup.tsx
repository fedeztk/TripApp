import {createContext, useContext, useEffect, useState} from "react";
import TripGroup from "../types/tripGroup";

const Context = createContext<[TripGroup | null, (tripGroup: TripGroup | null) => void]>([null, () => {}]);

export function TripGroupProvider({children}: { children: React.ReactNode }) {
    const [tripGroup, setTripGroup] = useState<TripGroup | null>(null);

    useEffect(() => {
        const group = localStorage.getItem('tripGroup');
        if (group) {
            setTripGroup(JSON.parse(group));
        }
    }, []);

    useEffect(() => {
        if (tripGroup) {
            localStorage.setItem('tripGroup', JSON.stringify(tripGroup));
        } else {
            localStorage.removeItem('tripGroup');
        }
    }, [tripGroup]);

    return <Context.Provider value={[tripGroup, setTripGroup]}> {children} </Context.Provider>;
}

export function useTripGroupContext() {
    return useContext(Context);
}