import { auth,redirectToSignIn } from "@clerk/nextjs";
import Companionform from "./components/companionForm";
import prismadb from "@/lib/prismadb";

interface companionPropsType{
        params:{
            companionId:string;
        }
}

const CompanionIDComponent = async({params}:companionPropsType) => {

    //get cuurent user 
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }
    //getting  comapanion  data from prisma if compaionId exist 
    const companion_data=await prismadb.companion.findUnique({
        where:{
            id:params.companionId,
            userId
        }
    })
    // getting  categories data (used for select category dropdown)
    const category_data=await prismadb.category.findMany()

    return ( <>
    
    <Companionform initialData={companion_data} 
    category_data={category_data}
    />
    </> );
}
 
export default CompanionIDComponent;