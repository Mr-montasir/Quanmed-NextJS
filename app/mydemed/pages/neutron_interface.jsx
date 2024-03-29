'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

//------// Components //------//
import AnimatedTitle from '../components/titleAnimation';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../components/accordion.tsx';
import ReactMarkdown from 'react-markdown';
import styles from '../../styles/Home.module.css';

//------// media //------//  
import ChatIcon from '../media/svgs/chat.svg';
import FileIcon from '../media/svgs/file.svg';
import ChevronUp from '../media/svgs/chevronUp.svg';

//------// Hooks //------//
import useFetch from '../hooks/useFetch';

import { serverUrl } from '../../utils/config.js';
import { useAuth } from '../../hooks/use-auth.js';

export default function NeutronInterface() {
    const [query, setQuery] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [messageState, setMessageState] = useState({
        messages: [
        ],
        history: [],
    });

    const [typing, setTyping] = useState(false)
    const auth = useAuth()
    var { messages, history } = messageState;

    useEffect(() => {
        async function fetchHistory() {
            console.log('neutron')
            console.log(auth)
            const response = await fetch(`${serverUrl}/api/chat/history`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: auth.user ? auth.user.email : auth.wallet
                })
            });
            const res = await response.json();
            history = res.history;
            messages = []
            history.forEach(item => {
                messages.push({
                    type: "userMessage",
                    message: item[0]
                })
                messages.push({
                    type: "apiMessage",
                    message: item[1]
                })
            })
            setMessageState((state) => ({
                ...state,
                messages: [
                    ...state.messages,
                    ...messages
                ],
                history: [
                    ...state.history,
                ]
            }))
        }

        if(auth.isAuthenticated){
            fetchHistory()
        }

    }, [auth])



    const messageListRef = useRef(null);

    const { loading, error, data } = useFetch(`https://quanmed.ai/wordpress/wp-json/wp/v2/dashboard-pages?slug=neutron-interface`);
    if (loading) return;
    if (error) return;
    //handle form submission
    async function handleSubmit(e) {
        // e.preventDefault();
        console.log("query---, ", query)
        console.log("history---, ", history)
        document.getElementById("query_btn").value = ""
        setErrorMsg(null);

        if (!query) {
            alert('Please input a question');
            return;
        }

        const question = query.trim();
        console.log(messageState)
        setMessageState((state) => ({
            ...state,
            messages: [
                ...state.messages,
                {
                    type: 'userMessage',
                    message: question,
                },
            ],
        }));

        setQuery('');
        try {
            setTyping(true);
            const response = await fetch(`${serverUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question,
                    history,
                    email: auth.user ? auth.user.email : auth.wallet
                })
            });
            const res = await response.json();
            setTyping(false)
            console.log('res', res.text);

            if (res.error) {
                setErrorMsg(res.error);
            } else {
                setMessageState((state) => ({
                    ...state,
                    messages: [
                        ...state.messages,
                        {
                            type: 'apiMessage',
                            message: res.text.answer,
                            // sourceDocs: res.sourceDocuments,
                        },
                    ],
                    history: [...state.history, [question, res.text.answer]],
                }));

            }
            console.log('messageState', messageState);

            // setLoading(false);

            //scroll to bottom
            messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
        } catch (err) {
            throw new Error('error');
        }


        return;
    }

    //prevent empty submissions
    const handleEnter = (e) => {
        if (e.key === 'Enter' && query) {
            handleSubmit(e);
        } else if (e.key == 'Enter') {
            e.preventDefault();
        }
    };
    return (
        <div className="neutron_interface">
            <AnimatedTitle title={data[0].title.rendered} />
            {data[0].acf.page_paragraph && (
                <p className="page_paragraph">
                    {data[0].acf.page_paragraph}
                </p>
            )}
            <div className="chat_interface" style={{ fontSize: "large" }}>
                {
                    messages.length === 0 && <div className="chat_container" style={{ height: "65vh" }}>
                        <ChatIcon />
                        <span>How can i help you?</span>
                    </div>
                }
                {
                    messages.length > 0 && <main className={styles.main}>
                        <div className={styles.cloud} style={{ backgroundColor: "rgba(0,0,0,0)" }}>
                            <div ref={messageListRef} className={styles.messagelist}>
                                {messages.map((message, index) => {
                                    let icon;
                                    let className;
                                    if (message.type === 'apiMessage') {
                                        icon = (
                                            <img
                                                key={index}
                                                src="/bot-image.png"
                                                alt="AI"
                                                width="40"
                                                height="40"
                                                className={styles.boticon}
                                                priority
                                            />
                                        );
                                        className = styles.apimessage;
                                    } else {
                                        icon = (
                                            <img
                                                key={index}
                                                src="/usericon.png"
                                                alt="Me"
                                                width="40"
                                                height="40"
                                                className={styles.usericon}
                                                priority
                                            />
                                        );
                                        // The latest message sent by the user will be animated while waiting for a response
                                        className =
                                            loading && index === messages.length - 1
                                                ? styles.usermessagewaiting
                                                : styles.usermessage;
                                    }
                                    return (
                                        <div style={{ padding: '20px' }}>
                                            <div key={`chatMessage-${index}`} className={className} style={{ backgroundColor: "rgba(0,0,0,0)", color: "white" }}>
                                                {icon}
                                                <div className={styles.markdownanswer} style={{ marginLeft: 20 }}>
                                                    {/* <ReactMarkdown linkTarget="_blank"> */}
                                                    {message.message}
                                                    {/* </ReactMarkdown> */}
                                                </div>
                                            </div>
                                            {/* {message.sourceDocs && (
                                                <div
                                                    className="p-5"
                                                    key={`sourceDocsAccordion-${index}`}
                                                >
                                                    <Accordion
                                                        type="single"
                                                        collapsible
                                                        className="flex-col"
                                                    >
                                                        {message.sourceDocs.map((doc, index) => (
                                                            <div key={`messageSourceDocs-${index}`} className='text-white'>
                                                                <AccordionItem value={`item-${index}`}>
                                                                    <AccordionTrigger>
                                                                        <h3>Source {index + 1}</h3>
                                                                    </AccordionTrigger>
                                                                    <AccordionContent>
                                                                        <ReactMarkdown linkTarget="_blank">
                                                                            {doc.pageContent}
                                                                        </ReactMarkdown>
                                                                        <p className="mt-2">
                                                                            <b>Source:</b> {doc.metadata.source}
                                                                        </p>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                            </div>
                                                        ))}
                                                    </Accordion>
                                                </div>
                                            )} */}
                                        </div>
                                    );
                                })}
                                {
                                    typing && <div style={{ padding: 20 }}>
                                        <img src='/loading.svg' />
                                        <span style={{ color: 'white' }}> Neutron is typing...</span>
                                    </div>
                                }

                            </div>
                        </div>
                        {errorMsg && (
                            <div className="border border-red-400 rounded-md p-4">
                                <p className="text-red-500">{errorMsg}</p>
                            </div>
                        )}
                    </main>
                }
                <div className="prompt_container">
                    <FileIcon />
                    <input type="text" id="query_btn" onKeyDown={handleEnter} onChange={(e) => setQuery(e.target.value)} />
                    <ChevronUp className='send' onClick={handleSubmit} />
                </div>
            </div>
        </div>
    )
}