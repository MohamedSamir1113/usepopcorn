// import { useEffect } from "react";
// export function useKey() {
//     useEffect(() => {
//         function handleKeyDown(e) {
//           if (e.code === "KeyD") {
//             handleCloseMovie();
//             console.log("close");
//           }
//         }
      
//         document.addEventListener("keydown", handleKeyDown);
      
//         return () => {
//           document.removeEventListener("keydown", handleKeyDown);
//         };
//       }, [handleCloseMovie]);
// }