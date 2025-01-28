interface Props {
    icon?: React.FunctionComponent,
    placeholder?: string,
    value?: string,
    className?: string,
    onKeyDown?: (e: any) => void
    onChange?: (e: any) => void
    onSendPress?: (e: any) => void
}

export default function MessageInput({ icon: Icon, placeholder, onKeyDown, onChange, value, className }: Props) {
    return (
        <div className={`flex justify-between items-center border-2 border-gray-700 rounded-2xl text-base h-[3.2rem] bg-white text-dark dark:bg-gray-800 dark:text-darkinputtext px-[1rem] ${className}`}>
            <input onKeyDown={onKeyDown} value={value} onChange={onChange} placeholder={placeholder || "Type here..."} className="flex-1 focus:outline-none dark:text-disabled text-dark dark:bg-gray-800 text-sm placeholder-disabled" />
            {Icon &&
                <div className="text-xl">
                    <Icon />
                </div>
            }
        </div>
    )
}