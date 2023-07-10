import { useState, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import ChatBoxRes from "./components/ChatBoxRes";

const chatSocket = new WebSocket("ws://localhost:8000/ws/chat/1/");

function App() {
    const [door, setDoor] = useState(true);
    const [name, setName] = useState("");
    const [msj, setMsj] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        chatSocket.onopen = () => {
            console.log("websocket connected");
        };

        chatSocket.onclose = () => {
            console.log("websocket disconnected");
        };
    }, []);

    function enviar(e) {
        chatSocket.send(
            JSON.stringify({
                type: "message",
                message: msj,
                name: name,
            })
        );
        setMsj("");
        e.preventDefault();
    }

    chatSocket.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        if (dataFromServer) {
            setChat([
                ...chat,
                { msg: dataFromServer.message, name: dataFromServer.name },
            ]);
        }
    };

    if (door) {
        return (
            <div className="mx-auto w-96 container mt-4">
                <h1 className="font-bold text-3xl mb-4">Login</h1>
                <label className="text-xl">Nombre</label>
                <input
                    autoFocus
                    className="w-full rounded-lg p-3 block mb-3 bg-gray-300"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                />
                <button
                    className="w-full rounded-lg p-3 block bg-gray-500 hover:bg-gray-400"
                    onClick={() => {
                        setDoor(false);
                    }}
                >
                    Entrar
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto w-96 container mt-4">
            <h1 className="font-bold text-3xl mb-4 text-center">
                Bienvenido {name}
            </h1>
            <div className="bg-gray-200 w-full flex flex-col h-96 rounded-lg mb-2 overflow-auto">
                {chat.map((m, i) => (
                    <div key={i}>
                        {m.name == name ? (
                            <ChatBox data={m} />
                        ) : (
                            <ChatBoxRes data={m} />
                        )}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    autoFocus
                    className="w-full rounded-lg p-2 block bg-gray-300"
                    type="text"
                    value={msj}
                    onChange={(e) => setMsj(e.target.value)}
                />
                <button
                    className="w-32 rounded-lg block bg-gray-500 hover:bg-gray-400"
                    onClick={(e) => {
                        enviar(e);
                    }}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}

export default App;
