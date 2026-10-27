import { NextResponse, type NextRequest } from "next/server";

// El español vive en la raíz: "/" se sirve internamente desde "/es"
// y "/es" redirige a "/" para no duplicar la misma página en dos URLs.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (url.pathname === "/es") {
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }

  url.pathname = "/es";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/", "/es"],
};
