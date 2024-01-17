// "use client";
// import { ArrowRight, File, Menu, NotebookText, Table2 } from "lucide-react";
// import SidebarLink, { SideBarLinkText } from "./sidebarLink";
// import User from "./user";
// import { useState } from "react";

// export default function Sidebar({ user }: { user: any }) {
//   const [sideBarMin, setSideBarMin] = useState(false);
//   const handleSideBarMin = () => setSideBarMin(!sideBarMin);

//   const sidebarWidth = sideBarMin
//     ? "w-[3%] min-w-[50px]"
//     : "w-[16%] min-w-[170px] lg:min-w-[200px] xl:min-w-[260px]";
//   const sidebarPadding = sideBarMin
//     ? "w-[3%] min-w-[50px] px-2 py-4"
//     : "w-[14%] min-w-[170px] lg:min-w-[200px] xl:min-w-[260px] p-4";

//   return (
//     <aside className={`ease-in-out duration-300 ${sidebarWidth}`}>
//       <div
//         className={`ease-in-out duration-300 ${sidebarPadding} fixed left-0 bottom-0 h-[var(--container-height)] bg-secondary border-r border-input flex flex-col justify-between gap-4 overflow-y-auto`}
//       >
//         <section className="flex flex-col items-center gap-2">
//           {sideBarMin && (
//             <button onClick={handleSideBarMin}>
//               <ArrowRight size={25} />
//             </button>
//           )}
//           <SidebarLink sideBarMin={sideBarMin} href="/">
//             <Table2 size={20} />{" "}
//             <SideBarLinkText sideBarMin={sideBarMin}>Dashboard</SideBarLinkText>
//           </SidebarLink>
//           <SidebarLink sideBarMin={sideBarMin} href="/orders">
//             <NotebookText size={20} />{" "}
//             <SideBarLinkText sideBarMin={sideBarMin}>
//               Import/Export
//             </SideBarLinkText>
//           </SidebarLink>
//           <SidebarLink sideBarMin={sideBarMin} href="/uploaded-files">
//             <File size={20} />{" "}
//             <SideBarLinkText sideBarMin={sideBarMin}>Files</SideBarLinkText>
//           </SidebarLink>
//         </section>
//         <section className="flex flex-col justify-center items-center gap-4">
//           <User
//             user={user}
//             sideBarMin={sideBarMin}
//             handleSideBarMin={handleSideBarMin}
//           />
//         </section>
//       </div>
//     </aside>
//   );
// }
