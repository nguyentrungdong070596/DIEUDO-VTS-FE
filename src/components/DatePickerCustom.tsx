// components/DatePickerCustom.tsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../static/css/DatePickerCustom.scss'; // chứa style riêng

type DatePickerCustomProps = {
    label?: string;
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
    dateFormat?: string;
};

const DatePickerCustom: React.FC<DatePickerCustomProps> = ({
    label = '📅 Chọn ngày:',
    selectedDate,
    onDateChange,
    dateFormat = 'dd/MM/yyyy',
}) => {
    return (
        <div className="search-container">
            <label className="date-label">{label}</label>
            <div className="datepicker-wrapper">
                <DatePicker
                    selected={selectedDate}
                    onChange={onDateChange}
                    dateFormat={dateFormat}
                    className="custom-datepicker"
                    popperPlacement="bottom"
                    withPortal={false}
                />
            </div>
        </div>
    );
};

export default DatePickerCustom;
