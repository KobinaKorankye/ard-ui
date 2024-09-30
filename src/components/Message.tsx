
import { useRouter } from "next/navigation"
import { BsRobot } from "react-icons/bs"
import { CgBot } from "react-icons/cg"
import { FaRobot } from "react-icons/fa6"
import MarkdownParser from "./MarkdownParser"

interface Props {
    text: string,
    from: "bot" | "person",
    onClick?: () => void,
}

export default function Message({ text, from, onClick }: Props) {
    return (
        <div onClick={onClick} className={`flex gap-2 items-start py-1 px-3 ${from === "bot" ? 'font-medium my-2' : 'bg-white ml-auto rounded-t-xl rounded-bl-xl'}`}>
            <div>
                {from == "bot" ?
                    <div className={`w-6 h-6 flex items-center justify-center ${from === "bot" ? 'bg-white text-black' : 'bg-black text-white'} rounded-full text-sm`}>
                        <BsRobot />
                    </div> : null}

            </div>
            <div className={`break-words whitespace-normal w-full ${from === "bot" ? 'text-white font-light' : 'text-dark'} text-sm mt-[0.1rem]`}>

                {from === "bot" ?
                    <div className="w-full flex flex-col">
                        {/* <div className="text-xs ml-auto text-primary font-semibold bg-white px-2 py-1 rounded-full">Assistant</div> */}
                        <MarkdownParser text={text} />
                    </div>
                    :
                    <div className="w-full flex flex-col">
                        {/* <div className="font-bold">You</div>    */}
                        <div>{text}</div>
                    </div>
                }
            </div>
        </div>
    )
}