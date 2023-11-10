const bubleChats = ({ onClick, isVisible }) => {
    return (
        <div className={`chat-icon ${isVisible ? 'hidden' : ''}`} onClick={onClick}>
            <img src="../public/image/buble_chat.png" alt="buble_chat" />
        </div>
    );
};

export default bubleChats;

