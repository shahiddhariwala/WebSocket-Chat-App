import React, { useState, useEffect } from 'react';
import queryString from "query-string";
import io from "socket.io-client";
import './Chat.css';
import _ from "lodash";
import InfoBar from "../InfoBar/InfoBar";
let socket;

const Chat = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');


    const ENDPOINT = "localhost:5000";
    useEffect(() => {
        const { name, room } = queryString.parse(props.location.search);
        setName(name);
        setRoom(room);

        socket = io(ENDPOINT);
        socket.emit('join', { name, room }, () => {

        });


        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, props.location.search]);


    //useEffect for handling messages
    useEffect(() => {
        socket.on('message', (message) => {
            let tempMessages = _.cloneDeep(messages);
            tempMessages.push(message);
            setMessages(tempMessages)
        });
    }, [messages]);

    // function for sending message
    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage('');
            })
        }
    }
    console.log("message", message, "messages", messages);
    return (
        <>
            <div className="outerContainer">
                <div className="container">
                    <InfoBar room={room} />
                    <input
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        onKeyPress={(event) => event.key === "Enter" ? sendMessage(event) : null}
                    />
                </div>
            </div>
        </>
    );
}

export default Chat;