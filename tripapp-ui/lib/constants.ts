// routes that should always be accessible, no matter if the user is signed in or not
export const unprotectedRoutes = {
    LOGIN: "/api/auth/signin",
    ERROR: "/_error",
    HOME: "/"
};