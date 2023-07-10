export default function ChatBox(props) {
    return (
        <div className="flex items-start py-2 gap-1 px-2 float-right">
            <div className="w-full h-full rounded-l-lg px-2 py-2 rounded-br-lg bg-blue-400">
                {props.data.msg}
            </div>
            <div className="relative w-12 h-12 bg-blue-400 rounded-full flex justify-center items-center text-center p-5 shadow-xl">
                {props.data.name.toUpperCase()[0]}
            </div>
        </div>
    );
}
