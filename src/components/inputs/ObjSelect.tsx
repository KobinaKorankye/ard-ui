import React, { useState } from 'react';

interface Props {
    boxClassName?: string,
    label?: string,
    icon?: React.FunctionComponent,
    name?: string,
    options: Object,
    value: string,
    onChange: (e: any) => void,
    disabled?: boolean
}

export default function ObjSelect({
    boxClassName = '',
    label,
    icon: Icon,
    name,
    options,
    value,
    onChange,
    disabled,
}: Props) {

    return (
        <div className={`${boxClassName}`}>
            <label className={`block text-[0.8rem] font-medium mb-1.5 text-gray-600`} htmlFor={name}>
                {label}
            </label>
            <div
                className="flex w-full items-center shadow appearance-none rounded border border-slate-300 px-4 py-2 text-gray-900 
                leading-tight"
            >
                {Icon && <Icon />}
                <select
                    name={name}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    className="w-full focus:outline-none focus:shadow-outline bg-transparent dark:bg-darkbg dark:text-white text-sm"
                    id={name}
                >
                    {Object.entries(options).map(([key, value], index) => (
                        <option key={index} value={key}>{value}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};