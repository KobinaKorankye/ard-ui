import { useRouter } from "next/navigation"

interface Props {
    icon: React.FunctionComponent,
    active?: boolean
    size?: "sm" | "md"
}

export default function IconButton({ icon: Icon, active, size="sm" }: Props) {
    const router = useRouter()
    return (
        <div className={`${active ? 'text-white dark:text-darkinputtext bg-primary' : 'text-primary bg-white dark:bg-darkinputtext shadow'} ${size==="sm"?'w-[1.88rem] h-[1.88rem] text-base':'w-[2.19rem] h-[2.19rem] text-2xl'} flex items-center justify-center rounded-xl`}>
            <Icon />
        </div>
    )
}