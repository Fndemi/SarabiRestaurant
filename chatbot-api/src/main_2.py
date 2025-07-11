from custom_wrapper import init_llm
from typing import Sequence
from typing_extensions import Annotated, TypedDict

from langchain_core.messages import HumanMessage, BaseMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, MessagesState, StateGraph
from langgraph.graph.message import add_messages
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder


#Initialize the model
llm = init_llm("salesforce/Llama-xLAM-2-8b-fc-r")

# New prompt template
prompt_template = ChatPromptTemplate.from_messages(
  [
    (
      "system",
      "You talk like a pirate. Answer all questions to the best of your ability in {language}"
    ),
    MessagesPlaceholder(variable_name="messages")
  ]
)


class State(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    language: str


workflow = StateGraph(state_schema=State)


def call_model(state: State):
    prompt = prompt_template.invoke(state)
    response = llm.invoke(prompt)
    return {"messages": [response]}


workflow.add_edge(START, "model")
workflow.add_node("model", call_model)

memory = MemorySaver()
app = workflow.compile(checkpointer=memory)

#Configuration to allow threading for multiple users
config = {"configurable": {"thread_id": "abc123"}}


config = {"configurable": {"thread_id": "abc345"}}
query = "Hi! I'm Jim."
language = "Pidgin English"

input_messages = [HumanMessage(query)]
output = app.invoke(
    {"messages": input_messages, "language": language},
    config,
)
output["messages"][-1].pretty_print()

query = "What is my name?"

input_messages = [HumanMessage(query)]
output = app.invoke(
    {"messages": input_messages},
    config,
)
output["messages"][-1].pretty_print()

# # Interactive conversation loop to test memory
# input_messages = []
# print("Type 'exit' to end the conversation.")
# while True:
#     user_input = input("You: ")
#     if user_input.lower() == "exit":
#         break
#     input_messages.append(HumanMessage(user_input))
#     output = app.invoke({"messages": input_messages}, config)
#     ai_message = output["messages"][-1]
#     print(f"Bot: {ai_message.content}")
#     input_messages.append(ai_message)