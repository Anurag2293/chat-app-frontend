// export { auth as middleware } from "@/auth";
import { auth } from "@/auth";
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from "./lib/routes";

export const middleware  = auth((request) => {
    const { nextUrl } = request;

    const isAuthenticated = !!request.auth;
    const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

    // if (isPublicRoute && isAuthenticated) {
    //     return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    // }

    if (!isAuthenticated && !isPublicRoute) {
        return Response.redirect(new URL(ROOT, nextUrl))
    }
})