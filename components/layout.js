import React, { useContext, useEffect, useState } from "react";
import Notifications from "./nav/minicomponents/notifications";
import Sidenav from "./nav/sidenav";
import Topnav from "./nav/topnav";
import { TeacherContext } from "./contexts/teachercontext";
import Class_course from "./nav/minicomponents/class_course";
import Sidenav2 from "./nav/minicomponents/sidenav2";
import Sidenav3 from "./nav/minicomponents/sidenav3";
import Newclass from "./nav/minicomponents/newclass";
import Note_deletor from "./bookshelf/minicomponents/note_deletor";
import Newcourse from "./nav/minicomponents/newcourse";
import Deleteclass from "./nav/minicomponents/deleteclass";
import Deletecourse from "./nav/minicomponents/deletecourse";
import Shareclass from "./nav/minicomponents/shareclass";
import Note_share from "./bookshelf/minicomponents/note_share";
import { AuthContext } from "./contexts/authcontext";
import { useRouter } from "next/router";
import useAuthChecker from "./customHooks/useAuthChecker";

function Layout({ children }) {
  const router = useRouter();
  const {
    notification,
    class_course,
    shelf2,
    shelf3,
    sidebar,
    sidebartype,
    classcoursedata,
    notedata,
    ccdaction,
    toggle_menu,
    setTeacherid,
    teacherid,
  } = useContext(TeacherContext);

  let authData = useAuthChecker();
  if (authData) {
    authData = JSON.parse(authData.auth);
    setTeacherid(authData.id);
  }

  return (
    <>
      {/* {authData && authData.status === "authorized" && ( */}
      <div className="flex w-[100%] max-w-[100%] h-[100vh] ">
        <div className="contents border-2">
          <div className="md:contents md:static absolute md:w-[12rem] md:mt-0 md:h-full w-full border-2 border-accent_color mt-[10%] h-[90%]">
            {/* smaller screens */}
            <div className="md:hidden block h-full">
              {sidebar && <Sidenav />}
              {shelf2 && <Sidenav2 />}
              {shelf3 && <Sidenav3 />}
            </div>
            {/* medium screens and above */}
            <div className="md:flex hidden h-full">
              <Sidenav />
              {shelf2 && <Sidenav2 />}
              {shelf3 && <Sidenav3 />}
            </div>
          </div>
        </div>
        <div className="w-[100vw] md:w-[95%] overflow-y-hidden">
          <Topnav />
          <div className=" h-full pb-4">
            {notification && <Notifications />}
            {class_course && <Class_course />}
            {classcoursedata.action === "new_class" && <Newclass />}
            {classcoursedata.action === "new_course" && <Newcourse />}
            {ccdaction === "delete_class" && <Deleteclass />}
            {ccdaction === "delete_course" && <Deletecourse />}
            {ccdaction === "share_class" && <Shareclass />}
            {ccdaction === "share_note" && <Note_share />}
            {notedata.deleteNote && <Note_deletor />}
            <div className=" bg-accent_bkg_color relative h-full overflow-y-auto w-full md:static md:top-0">
              {children}
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default Layout;
