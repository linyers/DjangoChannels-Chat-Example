export default function ChatBoxRes(props) {
    return (
        <div className="flex items-start py-2 gap-1 px-2 float-left">
            <div className="relative w-12 h-12 bg-green-400 rounded-full flex justify-center items-center text-center p-5 shadow-xl">
                {props.data.name.toUpperCase()[0]}
            </div>
            <div className="w-full h-full rounded-r-lg px-2 py-2 rounded-bl-lg bg-green-400">
                {props.data.msg}
            </div>
        </div>
    );
}
