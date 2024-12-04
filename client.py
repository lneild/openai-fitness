import os
from openai import OpenAI

client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "Say this is a test",
        }
    ],
    model="gpt-3.5-turbo",
)

def comp(PROMPT, MaxToken=50, outputs=3):
    # using OpenAI's Completion module that helps execute 
    # any tasks involving text 
    response = OpenAI.Completion.create(
        # model name used here is text-davinci-003
        # there are many other models available under the 
        # umbrella of GPT-3
        model="gpt-3.5-turbo",
        # passing the user input 
        prompt=PROMPT,
        # generated output can have "max_tokens" number of tokens 
        max_tokens=MaxToken,
        # number of outputs generated in one call
        n=outputs
    )
    # creating a list to store all the outputs
    output = list()
    for k in response['choices']:
        output.append(k['text'].strip())
    return output


PROMPT = """Write a short conversation between client and businessman about a wine bottle purchase. 
Client is not happy with the purchase and the businessman is not accepting his mistake.
Make the conversation sarcastic. 
Each Response should have atmost 2 lines.
The client should talk like Kevin Hart and businessman should  talk like Shakespeare.
"""
comp(PROMPT, MaxToken=3000, outputs=1)