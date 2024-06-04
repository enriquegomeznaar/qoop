// import React, { useEffect } from "react";

// const TidalPlayer = () => {
//   useEffect(() => {
//     const loadTidalModules = async () => {
//       const auth = await import("https://unpkg.com/@tidal-music/auth/dist");
//       const { setCredentialsProvider } = await import(
//         "https://unpkg.com/@tidal-music/player-web-components/dist"
//       );

//       const clientId = "YOUR_CLIENT_ID";
//       const clientSecret = "YOUR_CLIENT_SECRET";

//       await auth.init({
//         clientId,
//         clientSecret,
//         credentialsStorageKey: "key",
//         scopes: [],
//       });

//       setCredentialsProvider(auth.credentialsProvider);
//     };

//     loadTidalModules();
//   }, []);

//   return (
//     <div>
//       <tidal-play-trigger product-id="251380837" product-type="track">
//         <button>Play</button>
//       </tidal-play-trigger>
//     </div>
//   );
// };

// export default TidalPlayer;
