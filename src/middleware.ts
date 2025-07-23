import { NextRequest, NextResponse } from "next/server";

// Middleware function
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the requested path is '/builder-residency-application'
  if (pathname === "/builder-residency-application") {
    // Option 1: Redirect to the homepage or another page
    return NextResponse.redirect(new URL("/", request.url));

    // Option 2: Return a 403 Forbidden response
    // return new NextResponse('Access to this route is restricted.', { status: 403 });
  }

  // Allow all other routes to proceed
  return NextResponse.next();
}

// Specify which paths the middleware should apply to
export const config = {
  matcher: ["/builder-residency-application"],
};
