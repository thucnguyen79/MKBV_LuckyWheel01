import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages";
import About from "../pages/about";
import Form from "../pages/form";
import User from "../pages/user";
import Wheel from "../Wheel";
import QRCode from "./QRCode";

const MyApp = () => {
  const [isFollowingOA, setIsFollowingOA] = useState(null);

  useEffect(() => {
    console.log("🟢 Đang kiểm tra môi trường...");
    console.log("window:", window);
    console.log("window.zmp:", window.zmp);

    // Mock window.zmp nếu không tồn tại
    if (typeof window.zmp === "undefined") {
      console.warn("⚠️ Môi trường không phải Zalo, đang mock window.zmp...");
      window.zmp = {
        requestFollowOAStatus: ({ success, fail }) => {
          const mockResult = true; // Giả lập: false chưa follow OA, true đã follow OA
          console.log("🟡 Mock: Giả lập trạng thái quan tâm OA:", mockResult);
          success({ result: mockResult }); // Gọi success với giá trị mock
        },
      };
    }

    // Gọi API getUserInfo test
    // console.log("🟢 Gọi API getUserInfo...");
    // window.zmp.getUserInfo({
    //   success: (res) => {
    //     console.log("✅ Thông tin người dùng:", res);
    //   },
    //   fail: (err) => {
    //     console.error("❌ Lỗi getUserInfo:", err);
    //   },
    // });

    // Gọi API getAppInfo test
    // console.log("🟢 Gọi API getAppInfo...");
    // window.zmp.getAppInfo({
    //   success: (res) => {
    //     console.log("✅ Thông tin ứng dụng:", res);
    //   },
    //   fail: (err) => {
    //     console.error("❌ Lỗi getAppInfo:", err);
    //   },
    // });

    // Kiểm tra trạng thái quan tâm OA
    console.log("🟢 Kiểm tra trạng thái quan tâm OA...");
    window.zmp.requestFollowOAStatus({
      success: (res) => {
        console.log("✅ Kết quả kiểm tra OA:", res.result);
        setIsFollowingOA(res.result); // Cập nhật trạng thái
      },
      fail: (err) => {
        console.error("❌ Lỗi kiểm tra OA:", err);
        setIsFollowingOA(false); // Mặc định là false nếu lỗi
      },
    });
  }, []); // Dependency array rỗng để chỉ chạy một lần khi mount

  if (isFollowingOA === null) {
    return <div>Đang tải...</div>; // Hiển thị loading khi chưa có kết quả
  }

  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/form" element={<Form />} />
              <Route path="/user" element={<User />} />
              <Route path="/wheel" element={isFollowingOA ? <Wheel /> : <QRCode />} />
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};

export default MyApp;