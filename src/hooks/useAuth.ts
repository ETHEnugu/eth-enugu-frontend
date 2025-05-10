// "use client";

// // import { getAuthCookies } from "@/config/clientCookie";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export function useAuth() {
//   const router = useRouter();
//   const { accessToken } = getAuthCookies();

//   useEffect(() => {
//     if (!accessToken) {
//       router.replace("/login");
//     }
//   }, [accessToken, router]);

//   return { isAuthenticated: !!accessToken };
// }
