import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth";

const pathIstIgnored = (ignoredPaths: string[], path: string): Boolean => {
  const isIgnored = ignoredPaths.some((ignoredPath) =>
    path.startsWith(ignoredPath)
  );

  return isIgnored;
};

const sessionTokenExistsAndPathIsNotIgnored = async (
  request: NextRequest
): Promise<Boolean> => {
  const ignoredPaths = ["/login", "/signup"];
  const { pathname } = request.nextUrl;
  const isIgnored = await pathIstIgnored(ignoredPaths, pathname);
  if (isIgnored) return true;
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    return false;
  }
  return true;
};

export async function middleware(request: NextRequest) {
  const shouldNotRedirect = await sessionTokenExistsAndPathIsNotIgnored(
    request
  );
  if (!shouldNotRedirect) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
