import React, { Suspense } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import UserCard from "../components/user-card";
import Wheel from '../Wheel';  // Import vòng quay

// const HomePage = () => {
//   const navigate = useNavigate();
//   return (
//     <Page className="page">
//       <Suspense>
//         <div className="section-container">
//           <UserCard />
//         </div>
//       </Suspense>
//       <div className="section-container">
//         <List>
//           <List.Item
//             onClick={() => navigate("/about")}
//             suffix={<Icon icon="zi-arrow-right" />}
//           >
//             <div>About</div>
//           </List.Item>
//           <List.Item
//             onClick={() => navigate("/user")}
//             suffix={<Icon icon="zi-arrow-right" />}
//           >
//             <div>User</div>
//           </List.Item>
//         </List>
//       </div>
//     </Page>
//   );
// };

const HomePage = () => {
  return (
    <div>
      <h1>Trò Chơi Vòng Quay May Mắn</h1>
      <Wheel />
    </div>
  );
};

export default HomePage;
