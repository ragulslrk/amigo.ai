import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatWindow from './components/chatWindow'

interface ChatIdPageProps {
    params: {
      chatId: string;
    }
  }

const ChatIdPage = async({params}:ChatIdPageProps) => {

    const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc"
        },
        where: {
          userId,
        },
      }
    }
  });


  if (!companion) {
    return redirect("/");
  }
    return ( <>
   
    <ChatWindow companion={companion} />
    </> );
}
 
export default ChatIdPage;