import React, { useState } from "react";
import "./Wheel.css"; // Import CSS
import No from "./assets/No.png"; // Vòng quay cố định
import Pin from "./assets/Pin.png"; // Kim quay

// Các ảnh trúng giải (1.png - 6.png)
import Prize1 from "./assets/1.png";
import Prize2 from "./assets/2.png";
import Prize3 from "./assets/3.png";
import Prize4 from "./assets/4.png";
import Prize5 from "./assets/5.png";
import Prize6 from "./assets/6.png";
import Prize7 from "./assets/7.png";
import Prize8 from "./assets/8.png";

const prizes = [Prize1, Prize2, Prize3, Prize4, Prize5, Prize6, Prize7, Prize8]; // Danh sách ảnh giải thưởng
// Tên giải thưởng tương ứng với ảnh
const prizeNames = [
    "Voucher 5%",
    "Voucher 5% cho đơn hàng tiếp theo",
    "Voucher 10%",
    "Voucher 15%",
    "Voucher 20%",
    "Áo mưa thời trang",
    "Áo mưa thời trang",
    "Thêm một lượt quay",
];

export default function Wheel() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [selectedPrize, setSelectedPrize] = useState(No); // Ảnh vòng quay cố định
    const [winningMessage, setWinningMessage] = useState(""); // Nội dung thông báo


    const spinWheel = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setSelectedPrize(No); // Hiển thị ảnh No.png khi bắt đầu quay
        const randomIndex = Math.floor(Math.random() * prizes.length);

        // Tạo số vòng quay tối thiểu (5 vòng) và dừng tại ô trúng
        const extraRounds = 5;
        const newRotation = rotation + (extraRounds * 360) + (randomIndex * 45);

        setRotation(newRotation);

        setTimeout(() => {
            // setIsSpinning(false);
            setSelectedPrize(prizes[randomIndex]); // Cập nhật ảnh giải thưởng
            setWinningMessage(`🎉 Chúc mừng bạn đã trúng giải: ${prizeNames[randomIndex]}!`); // Cập nhật thông báo
            
            // Reset kim về vị trí ban đầu sau 3 giây
            setTimeout(() => {
                // setRotation(rotation % 360); // Đưa kim về vị trí chuẩn (không reset về 0, tránh nhảy ngược)
                setRotation(0); // Reset kim về vị trí ban đầu
                setIsSpinning(false);
            }, 3000);
        }, 3000);        
    };

    return (
        <div className="wheel-container">
            {/* Vòng quay cố định */}
            <img src={selectedPrize} className="wheel" alt="Vòng quay" />

            {/* Kim quay - sẽ xoay để xác định giải thưởng */}
            <img 
                src={Pin} 
                className="pin"
                style={{ transform: `rotate(${rotation}deg)` }}
                alt="Kim quay"
                onClick={spinWheel} // Thêm sự kiện onClick
            />

            {/* Thông báo trúng thưởng */}
            {winningMessage && <p className="winning-message">{winningMessage}</p>}

            {/* Nút quay số */}
            <button onClick={spinWheel} disabled={isSpinning} className="spin-button">
                {isSpinning ? "Đang quay..." : "Xoay"}
            </button>
        </div>
    );
}
