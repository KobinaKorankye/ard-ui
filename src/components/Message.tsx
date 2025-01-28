
import { useRouter } from "next/navigation"
import { BsRobot } from "react-icons/bs"
import { CgBot } from "react-icons/cg"
import { FaRobot } from "react-icons/fa6"
import MarkdownParser from "./MarkdownParser"
import BotChart from "./BotChart"
import Table from "./Table"

interface Props {
    text: string,
    chart_data?: any,
    table_data?: any,
    from: "bot" | "person",
    onClick?: () => void,
}

export default function Message({ text, chart_data, table_data, from, onClick }: Props) {
    return (
        <div onClick={onClick} className={`flex gap-2 items-start py-[0.5rem] px-[1rem] ${from === "bot" ? 'font-medium my-2' : 'bg-gray-200 ml-auto rounded-t-xl rounded-bl-xl'}`}>
            {from == "bot" ?
                <div>
                    <div className={`w-6 h-6 flex items-center justify-center ${from === "bot" ? 'bg-white text-gray-700' : 'bg-darkinputbg text-darkinputtext'} rounded-full text-sm`}>
                        <BsRobot />
                    </div>

                </div>
                : null
            }
            <div className={`flex flex-col gap-8 break-words whitespace-normal tracking-wide w-full ${from === "bot" ? 'text-darkinputtext font-light' : 'text-dark'} text-[0.9rem] mt-[0.1rem]`}>

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

                {chart_data && <BotChart chartData={chart_data} />}
                {table_data && table_data?.total_rows > 0 && <Table numPerPage={5} columnNames={table_data?.headers} rows={table_data?.rows} />}

            </div>
        </div>
    )
}