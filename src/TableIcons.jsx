import React from 'react'
import { Space } from 'antd';

const TableIcons = ({ record, Icon, name, onActionClick }) => {
    const handleClick = () => {
        onActionClick({ record, name })
    }
    return (
        <Space size="middle">
            <div style={{ padding: 5, cursor: "pointer" }} onClick={handleClick}>
                {Icon}
            </div>
        </Space>
    )
}

export default TableIcons