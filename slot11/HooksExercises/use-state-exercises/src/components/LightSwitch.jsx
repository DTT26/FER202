import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function LightSwitch() {
    // Khởi tạo state: isLightOn là boolean, khởi tạo giá trị ban đầu là false (tắt)
    // setIsLightOn là hàm để cập nhật isLightOn
    const [isLightOn, setIsLightOn] = useState(false);

    // Hàm để chuyển đổi trạng thái đèn - đảo trạng thái hiện tại
    const toggleLight = () => setIsLightOn(!isLightOn);

    // Style chung cho các button
    const buttonStyle = {
        margin: '5px',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px'
    };

    return (
        <div style={{ 
            padding: '20px', 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            background: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h4>Công Tắc Đèn</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                Đèn hiện đang: <span style={{ color: isLightOn ? '#28a745' : '#dc3545' }}>
                    {isLightOn ? 'Bật' : 'Tắt'}
                </span>
            </p>
            <Button
                onClick={toggleLight}
                style={{
                    ...buttonStyle,
                    background: isLightOn ? '#dc3545' : '#28a745',
                    color: 'white'
                }}
            >
                {isLightOn ? 'Tắt Đèn' : 'Bật Đèn'}
            </Button>
        </div>
    );
}

export default LightSwitch;
