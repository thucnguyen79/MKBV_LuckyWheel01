import React, { useState } from "react";
import "./Wheel.css"; // Import CSS để tạo hiệu ứng xoay

export default function Wheel() {
    const prizes = ["Voucher 50K", "Giảm 10%", "Chúc may mắn"];
    const [result, setResult] = useState("");
    const [spinning, setSpinning] = useState(false);

    const spinWheel = () => {
        if (spinning) return; // Tránh bấm nhiều lần khi đang quay

        setSpinning(true);
        const randomIndex = Math.floor(Math.random() * prizes.length);
        setTimeout(() => {
            setResult(`Bạn đã trúng: ${prizes[randomIndex]}`);
            setSpinning(false);
        }, 3000); // Hiệu ứng quay trong 3 giây
    };

    return (
        <div className="wheel-container">
            <h1>Vòng Quay May Mắn</h1>
            <div className={`wheel ${spinning ? "spinning" : ""}`}></div>
            <button onClick={spinWheel} disabled={spinning}>Quay Ngay</button>
            <p>{result}</p>
        </div>
    );
}
