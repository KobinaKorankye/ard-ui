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
            {
                label &&
                <label className={`block text-[0.6rem] uppercase font-medium mb-1.5 text-gray-400`} htmlFor={name}>
                    {label}
                </label>
            }
            <div
                className="flex w-full rounded-full overflow-hidden items-center dark:bg-darkbg dark:text-teal-100 border-2 border-teal-100 shadow appearance-none px-4 py-2.5 
                leading-tight"
            >
                {Icon && <Icon />}
                <select
                    name={name}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    className="w-full focus:outline-none focus:shadow-outline dark:bg-darkbg bg-transparent text-sm"
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