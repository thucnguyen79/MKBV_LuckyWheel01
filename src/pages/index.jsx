import React, { useEffect, useState } from "react";
import { Button, Icon, useNavigate, Modal, useSnackbar } from "zmp-ui";
import "./button-styles.css"; // Tạo file CSS riêng cho các animation

const HomePage = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const OA_URL = "https://zalo.me/1226610565554860112"; // URL OA của bạn
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  
  // Hàm xử lý khi nhấn nút quan tâm OA
  const handleOAClick = () => {
    window.location.href = OA_URL; // Mở Zalo OA 
  };

  // Đơn giản hóa - loại bỏ code liên quan đến ZMPContext tạm thời
  const handleGameClick = () => {
    navigate("/wheel");
  };
  
  // Hàm kiểm tra trạng thái quan tâm OA
  const checkOAStatus = async () => {
    setIsLoading(true);
    
    try {
      // Lấy userId - sử dụng giá trị mẫu nếu đang trong môi trường phát triển
      // Trong môi trường thực tế, bạn cần thay thế phần này bằng cách lấy userId thực từ người dùng
      const userId = "123456789"; // Mock userId cho môi trường dev
      
      // Gọi API kiểm tra trạng thái quan tâm OA
      const response = await fetch(
        `https://mkbv-zalo-be-api.onrender.com/api/check-oa-status?userId=${userId}`
      );
      
      if (!response.ok) {
        throw new Error(`Lỗi API: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Xử lý kết quả
      console.log("✅ Kết quả kiểm tra OA:", data);
      
      if (data.isFollowing) {
        // Đã quan tâm OA, chuyển đến màn hình chơi
        openSnackbar({ text: "Bạn đã quan tâm OA. Chuyển đến màn hình chơi!" });
        handleGameClick();
      } else {
        // Chưa quan tâm OA, chuyển đến trang OA
        openSnackbar({ text: "Bạn chưa quan tâm OA. Vui lòng quan tâm để chơi!" });
        handleOAClick();
      }
    } catch (error) {
      console.error("❌ Lỗi khi kiểm tra OA:", error);
      setError(`Đã xảy ra lỗi khi kiểm tra trạng thái quan tâm OA: ${error.message}`);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Chào mừng đến với Trò Chơi Vòng Quay May Mắn</h1>
      <p>Nhấp vào biểu tượng dưới đây để bắt đầu chơi!</p>
      
      {/* Nút Kiểm tra trạng thái OA */}
      <div className="button-container check-button-container">
        <button 
          onClick={checkOAStatus}
          className="check-button"
          disabled={isLoading}
        >
          <span className="button-background"></span>
          <span className="button-glow"></span>
          <span className="button-text">
            <Icon icon="zi-check-circle" size={24} />
            <span className="play-text">
              {isLoading ? "Đang kiểm tra..." : "Kiểm tra và chơi ngay"}
            </span>
          </span>
        </button>
      </div>
      
      {/* Nút Quan tâm OA */}
      <div className="button-container oa-button-container">
        <button 
          onClick={handleOAClick}
          className="oa-button"
        >
          <span className="button-background"></span>
          <span className="button-glow"></span>
          <span className="button-text">
            <Icon icon="zi-star" size={32} />
            <span className="play-text">Bạn chưa quan tâm OA?</span>
          </span>
        </button>
      </div>

      <div className="button-container">
        <button 
          onClick={handleGameClick}
          className="fancy-button"
        >
          <span className="button-background"></span>
          <span className="button-glow"></span>
          <span className="button-text">
            {/* <Icon icon="zi-caret-right-circle" size={48} /> */}
            <span className="play-text">Chơi ngay!</span>
          </span>
        </button>
      </div>
      
      {/* Modal hiển thị lỗi */}
      <Modal
        visible={showErrorModal}
        title="Thông báo lỗi"
        onClose={() => setShowErrorModal(false)}
        actions={[
          {
            text: "Đóng",
            onClick: () => setShowErrorModal(false),
          },
        ]}
      >
        <div className="error-content">
          <Icon icon="zi-alert-circle" size={32} style={{ color: "#ff4d4f", marginBottom: "10px" }} />
          <p>{error}</p>
          <p>Vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;