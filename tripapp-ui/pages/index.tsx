import SectionsGrid from "../components/sectionsGrid";
import TripGroupView from "../components/tripGroupView";
import {useTripGroupContext} from "../context/tripGroup";

export default function Home() {
    const [group, setGroup] = useTripGroupContext();
    return (
        <>
            {group === null ? <TripGroupView/> : <SectionsGrid/>}
        </>
    );
}