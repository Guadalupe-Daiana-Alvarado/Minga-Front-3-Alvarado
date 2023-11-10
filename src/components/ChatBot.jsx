import { useState, useEffect } from 'react';
import socket from './Socket';
import BubleChats from '../components/BubleChat';
import { useDispatch, useSelector } from 'react-redux';
import { botMessage } from '../../redux/actions/botMessage';
import { botMsg } from '../../redux/actions/botMsg';

export default function Chatbot() {
    let { user } = useSelector((store) => store.user_reduce);
    const { messages, msg } = useSelector((store) => store.botReducer);
    const dispatch = useDispatch();
    const [chatOpen, setChatOpen] = useState(false);

    function toggleChat() {
        setChatOpen(!chatOpen);
    }

    function closeChat() {
        setChatOpen(false);
    }

    useEffect(() => {
        const responseHandler = async (response) => {
            dispatch(botMessage({ value: response, id: 'bot' }));
        };

        socket.on('response', responseHandler);

        // Limpia la suscripción cuando el componente se desmonta.
        return () => {
            socket.off('response', responseHandler);
        };
    }, []);

    function sendMsg(e) {
        if (e.key === 'Enter' || e.type === 'submit') {
            e.preventDefault();
            if (msg !== '' && msg !== ' ') {
                dispatch(botMessage({ value: msg, id: 'user' }));
                socket.emit('chat', msg);
                dispatch(botMsg(''));
            }
        }
    }

    function Message({ message }) {
        return (
            <li className={message.id === 'bot' ? 'bg-pink-300 text-sm m-1 text-end rounded-md p-2' : 'bg-gray-300 text-sm m-1 rounded-md p-2'}>
                {message.value}
            </li>
        );
    }

    return (
         <>
         {user.role === 1 || user.role === 2 ? (
        <div className={`fixed bottom-2 hidden lg:block right-2 ${chatOpen ? 'w-96' : 'w-12'}`}>
            <BubleChats onClick={toggleChat} isVisible={chatOpen} />

            {chatOpen && (
                <div>
                    <button className="close-button" onClick={closeChat}>
                        <img className='h-7 w-7' src="../public/image/x.png" alt="x" />
                    </button>
                    <form onSubmit={sendMsg} className='bg-pink-400 w-full min-h-[320px] max-h-[480px] border-4 flex flex-col items-center rounded-lg'>
                        <div className='w-full min-h-[320px] max-h-[480px] overflow-y-auto mb-1 bg-white'>
                            <ul>
                                {messages.map((message, index) => (
                                    <Message key={index} message={message} />
                                ))}
                            </ul>
                        </div>
                        <div className='flex w-full h-7 justify-around'>
                            <input
                                value={msg}
                                onChange={(e) => dispatch(botMsg(e.target.value))}
                                className='w-8/12 h-5 rounded-l-lg border-black border'
                                type="text"
                                placeholder='Enter your question here...'
                            />
                            <button className='w-[20%] bg-white rounded-r-lg border border-black' type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            )}
         </div> ) : ('')}
        </> 
    );
}
