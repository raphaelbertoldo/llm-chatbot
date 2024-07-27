import { embeddings } from "./../llm";
import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import initAgent from "./agent";
import { initGraph } from "../graph";
import { sleep } from "@/utils";

// tag::call[]
export async function call(input: string, sessionId: string): Promise<string> {
  // TODO: Replace this code with an agent
  const llm = new ChatOpenAI({
    configuration: {
      baseURL: process.env.OPENAI_API_BASE,
    },
  });
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    configuration: {
      baseURL: process.env.OPENAI_API_BASE,
    },
  });
  const graph = await initGraph();
  // end::graph[]

  // tag::call[]
  const agent = await initAgent(llm, embeddings, graph);
  const res = await agent.invoke({ input }, { configurable: { sessionId } });

  return res;
}
// end::call[]
