// import { NextResponse } from "next/server";

// export function middleware(request) {
//     console.log(request);

//     return NextResponse.redirect(new URL("/about", request.url));
// }

// export const config = {
//     matcher: ["/account", "/cabins"]
// };

// import { auth } from "@/app/_lib/auth";

// export const middleware = auth;

// export const config = {
//     matcher: ["/account"]
// };
import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

// Middleware to protect `/account` route
export async function middleware(request) {
    const session = await auth(); // Check if the user is authenticated

    // If not signed in, redirect to `/about` page
    if (!session) {
        return NextResponse.redirect(new URL("/about", request.url));
    }

    // Continue to the requested page if authenticated
    return NextResponse.next();
}

// Apply middleware only to the `/account` route
export const config = {
    matcher: ["/account"]
};
