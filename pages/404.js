import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { TeacherContext } from "../components/contexts/teachercontext";

function Error() {
  const router = useRouter();
  const { teacherid } = useContext(TeacherContext);
  useEffect(() => {
    router.push(`/${teacherid}/bookshelf`);
  }, [router, teacherid]);
  return <div className=" bg-accent_bkg_color h-full "></div>;
}

export default Error;
