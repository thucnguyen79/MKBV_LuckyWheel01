import React, { useEffect, useState } from "react";
import { useNavigate, useSnackbar} from "zmp-ui";
import { getUserInfo, followOA } from "zmp-sdk/apis";
import { AppConstants } from "../constants/AppConstants";

const HomePage = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const checkOAStatus = async () => {
    setIsLoading(true);

    try {
      // if (!window.zmp) {
      //   console.warn("⚠️ Không chạy trong Zalo Mini App, mock trạng thái quan tâm OA");
      //   openSnackbar({ text: "⚠️ Đang dùng dữ liệu giả lập" });
      //   navigate("/wheel");
      //   return;
      // }

      getUserInfo({
        success: async (res) => {
          const isFollowing = res.userInfo?.followedOA === true;

          console.log("🟢 Trạng thái quan tâm OA:", isFollowing);
          console.log("res.userInfo", res.userInfo);

          if (isFollowing) {
            openSnackbar({ text: "✅ Bạn đã quan tâm OA. Bắt đầu chơi!" });
            navigate("/wheel");
          } else {
            openSnackbar({ text: "❗ Bạn chưa quan tâm OA. Đang mở yêu cầu..." });

           followOA({
              id: AppConstants.APP_ID,
              success: () => {
                openSnackbar({ text: "✅ Đã quan tâm OA! Đang chuyển sang trò chơi..." });
                setTimeout(() => navigate("/wheel"), 1500);
              },
              fail: (err) => {
                console.error("❌ Không thể mở popup followOA:", err);
                openSnackbar({ text: "Vui lòng quan tâm OA để tiếp tục chơi." });
              },
            });
          }
        },
        fail: (err) => {
          console.error("❌ Không lấy được user info từ Zalo:", err);
          setError("Không thể lấy thông tin người dùng từ Zalo.");
          setShowErrorModal(true);
        },
      });
    } catch (err) {
      console.error("❌ Lỗi khi kiểm tra OA:", err);
      setError("Lỗi kiểm tra trạng thái quan tâm OA.");
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   checkOAStatus();
  // }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎉 Chào mừng bạn đến với Vòng Quay May Mắn</h1>
      <p>Hãy nhấn nút bên dưới để bắt đầu chơi trò chơi!</p>

      <button
        onClick={checkOAStatus}
        disabled={isLoading}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "8px",
          backgroundColor: "#1843EF",
          color: "white",
          border: "none",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        🎯 Bắt đầu quay số
      </button>

      {/* {isLoading && <p style={{ marginTop: "16px" }}>🔄 Đang kiểm tra trạng thái OA, vui lòng chờ...</p>}
      {showErrorModal && <p style={{ color: "red", marginTop: "12px" }}>❌ {error}</p>} */}
    </div>
  );

};

export default HomePage;
