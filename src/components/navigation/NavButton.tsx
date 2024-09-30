
import { useRouter } from "next/navigation"
import IconButton from "./IconButton"

interface Props {
    text: string,
    icon: React.FunctionComponent,
    path: string,
    active?: boolean
}

export default function NavButton({ text, icon, path, active }: Props) {
    const router = useRouter()
    return (
        <div onClick={() => { router.push(path) }} className={`${active ? 'shadow text-dark bg-white dark:bg-darkinputbg dark:text-darkinputtext' : 'text-disabled'} cursor-pointer flex items-center gap-[0.74rem] text-xs font-bold px-4 w-[13.72rem] h-[3.38rem] rounded-2xl`}>
            <IconButton icon={icon} active={active} />
            <div>{text}</div>
        </div>
    )
}