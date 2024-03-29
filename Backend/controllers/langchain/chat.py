import os
from typing import Any, Dict, List
from dotenv import load_dotenv
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import ConversationalRetrievalChain, LLMChain
from langchain.vectorstores import Pinecone
import pinecone


# dotenv to load environment variables
load_dotenv()
# Initialize Pinecone or use your existing initialization code here
pinecone.init(api_key=os.getenv("PINECONE_API_KEY"), environment=os.getenv("PINECONE_ENV"))

def run_conversational_retrieval(query, chat_history):
    # OpenAI embeddings
    embeddings = OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_KEY"))
    # load Pinecone vector database as knowledge base
    docsearch = Pinecone.from_existing_index(
        embedding=embeddings,
        index_name=os.getenv("PINECONE_INDEX_NAME"),
    ) # change index name here

    # OpenAI chat model
    chat = ChatOpenAI(
        verbose=True,
        temperature=0,
        max_tokens=512,
        model_name="gpt-4-1106-preview",
        openai_api_key=os.getenv("OPENAI_KEY")
    )
    # create a conversational question-answering chain as retrieval qa and add i don't know if this is needed
    pre_prompt = """[INST] <<SYS>>\nYou are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.\n<</SYS>>\n\nGenerate the next agent response by answering the question. Answer it as succinctly as possible. You are provided several documents with titles. If the answer comes from different documents please mention all possibilities in your answer and use the titles to separate between topics or domains. If you cannot answer the question from the given documents, please state that you do not have an answer.\n"""
    prompt = pre_prompt + "CONTEXT:\n\n{context}\n" +"Question : {question}" + "[\INST]"
    prompt = """
QuanMed AI is a groundbreaking AI Medical project based. You are Neutron V1- QuanMed AIs interface for the atom AI model. You are constantly taking decentralised anonymous medical data and learning about human biology to give the most up to date, quantum based recommendations for medical prevention, diagnosis, prognosis, testing and cure.
Please make it clear in your answers that In V1 (version 1) you are only giving suggestions based on data you have already got and suggestions aren't personalized based on the users QuanMed AI MyDemed portal. However in future versions you will be analysing the users medical profile and giving personalized medical recommendations.
Your responses should be accurate and informative. Avoid alluding to your AI nature, and skip references to OpenAI or specific models like GPT.
With any health advice you give, make sure you add a disclaimer. In the disclaimer state that the advice is coming from the quantum health paradigm and purely based on data the QuanMed AI project has collated so far. Also state that all health advice you give should be seen as purely educational and a health professional should be consulted before the user implements any changes.
Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context or chat history, politely respond that you are tuned to only answer questions that are related to the context.
And you should response based on reference, should focus on it.

CONTEXT:
  {context}

Chat_History:
  {chat_history}

Question: {question}
"""
    openai_prompt = PromptTemplate(template=prompt, input_variables=["context", "chat_history", "question"])

    # create a conversational question-answering chain as retrieval qa
    qa = ConversationalRetrievalChain.from_llm(
        llm=chat,
        retriever=docsearch.as_retriever(),
        combine_docs_chain_kwargs={"prompt": openai_prompt}
       
    )
    return qa({"question": query, "chat_history": chat_history})