
import { useRouter } from "next/navigation"

interface Props {
    text: string,
    icon: React.FunctionComponent,
    invert?: boolean,
    alt?: boolean,
    onClick?: () => void,
    size?: string
}

export default function IconTextButton({ text, icon: Icon, invert, alt, onClick, size = "sm" }: Props) {
    return (
        <div onClick={onClick} className={`${invert ? 'shadow text-dark bg-white dark:bg-darkinputbg dark:text-darkinputtext' : `${(alt ? 'bg-primary' : 'bg-secondary')} text-white`} cursor-pointer flex items-center gap-[0.74rem] text-xs font-bold px-4 py-2 rounded-2xl`}>
            <div>{text}</div>
            <div className={`${invert?`text-white ${(alt ? 'bg-primary' : 'bg-secondary')}`:`${(alt ? 'text-primary' : 'text-secondary')} bg-white`} ${size === "sm" ? 'w-[1.88rem] h-[1.88rem] text-base' : 'w-[2.19rem] h-[2.19rem] text-2xl'} flex items-center justify-center rounded-xl`}>
                <Icon />
            </div>
        </div>
    )
}