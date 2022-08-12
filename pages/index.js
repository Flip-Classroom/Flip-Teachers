import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/teacher");
  }, []);
  return <div className=" bg-accent_bkg_color h-full"></div>;
}

export default Home;
