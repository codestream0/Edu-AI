import { FileText } from "lucide-react"

interface recentDocumentProps{
    title:string;
    type:string;
    pages:number;
    description:string;
}

export const RecentDocument = ({title,type,pages,description}:recentDocumentProps)=>{
    return (
        <div className=" rounded-xl  min-w-100  bg-slate-50 p-6 border border-gray-300 dark:bg-slate-800 dark:border-gray-800 " >
            <div className="flex gap-6 items-center" >
                <button  className=" h-5 w-3 text-slate-500"><FileText /></button>
                <div >
                    <p className=" text-lg font-semibold text-[14px] text-slate-900 dark:text-white" >{title}</p>
                    <p className="text-slate-700 text-[13px] dark:text-slate-400 ">{type}.{pages} pages</p>
                    <p className="text-slate-700 text-[13px] dark:text-slate-400  ">{description}</p>
                </div>
            </div>
            <div
              className="
                mt-3
                mb-3
                border-t
                border-slate-200
                dark:border-slate-700
              "
            />
            <div className="flex justify-around items-center text-slate-700 text-[14px] dark:text-white " >
                <p>Summary</p>
                <p>Quiz</p>
            </div>

        </div>
    )
}