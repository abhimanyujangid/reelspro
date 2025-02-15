import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
   function middleware(){
    return NextResponse.next();
   },
   {
    callbacks:{
        authorized: async ({ token, req }) => {
            const { pathname } = req.nextUrl;

            // Allow access to the auth API routes and the login and register pages
            if(
                pathname.startsWith("/api/auth") ||
                pathname === "/login" ||
                pathname === "/register" ||
                pathname === "/login/forgot" 
            ){
                return true;
            }

            // Allow access to the home page and the video API routes
            if(pathname === "/" || pathname.startsWith("/api/videos")){
                return true;
            }

            // Allow access to the video page if the user is authenticated
            return !!token;
        }
    }
   }
);


export const config =  {
    matcher: [
      "/((?!_next/static|_next/image|favicon.ico|public/).*)",
      "/api/((?!_next/static|_next/image|favicon.ico|public/).*)",
    ],
}