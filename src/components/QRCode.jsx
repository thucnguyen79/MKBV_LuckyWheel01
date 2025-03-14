import React from "react";
import { Button } from "zmp-ui";

const QRCode = () => {
    console.log("🔵 Hiển thị trang mã QR cho người dùng.");

    return (
        <div className="qr-container">
            <h2>Hãy quan tâm OA để tham gia vòng quay</h2>
            <img 
                // src="https://qr.zalo.me/1226610565554860112" 
                src="https://matkinhbenhvien.com/wp-content/uploads/2025/03/mkbvOA.jpg" 
                alt="Quét mã QR để quan tâm OA"
                className="qr-code centered-img"
            />
            <p>Quét mã QR bằng Zalo để tiếp tục</p>
            <Button onClick={() => {
                console.log("🔄 Người dùng đã bấm nút 'Tôi đã quan tâm'");
                window.location.reload();
            }}>
                Tôi đã quan tâm
            </Button>
        </div>
    );
};

export default QRCode;
