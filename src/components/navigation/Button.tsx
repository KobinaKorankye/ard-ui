'use client';

import { useRouter } from "next/navigation"

interface Props {
    text: string, widthClass?: string,
}

export default function Button({ text, widthClass }: Props) {
    const router = useRouter()
    return (
        <div className={`h-[2.19rem] flex items-center justify-center rounded-xl font-bold text-[0.625rem] bg-white text-dark ${widthClass}`}>
            {text}
        </div>
    )
}