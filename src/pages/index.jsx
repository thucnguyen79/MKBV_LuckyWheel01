import React, { Suspense } from "react";
import { List, Page, Button, Icon, useNavigate } from "zmp-ui";
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

// const HomePage = () => {
//   return (
//     <div>
//       <h1>Trò Chơi Vòng Quay May Mắn</h1>
//       <Wheel />
//     </div>
//   );
// };

// export default HomePage;



const HomePage = () => {
  const navigate = useNavigate();

  const handleGameClick = () => {
    console.log("🟢 Người dùng nhấp vào biểu tượng trò chơi quay số");
    navigate("/wheel"); // Chuyển hướng sang route /wheel
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Chào mừng đến với Trò Chơi Vòng Quay May Mắn</h1>
      <p>Nhấp vào biểu tượng dưới đây để bắt đầu chơi!</p>
      <Button
        onClick={handleGameClick}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px auto",
          cursor: "pointer",
        }}
      >
        <Icon icon="zi-caret-right-circle" size={48} /> {/* Icon biểu tượng trò chơi */}
      </Button>
    </div>
  );
};

export default HomePage;