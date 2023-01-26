import Member from "./member";

export default interface TripGroup {
    id: number
    name: string
    iso: string
    members: Member[]
}