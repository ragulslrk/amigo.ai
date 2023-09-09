 import SearchBar from "@/components/searchBar";
 import prismadb from "@/lib/prismadb";
 import  Category from "@/components/category";
 import { auth, currentUser, redirectToSignIn } from '@clerk/nextjs';
 import { CompanionList } from "@/components/companionList"
interface rootPagePropType{
  searchParams:{
    categoryId: string;
    name:string;

  }
 }

const RootPage = async({searchParams}:rootPagePropType) => {


  //get cuurent user 
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }
  console.log(userId,searchParams.categoryId,searchParams.name)
  const companion_data=await prismadb.companion.findMany({
    where:{

     OR:[
      {
        isDefaultAssistant:true,
        categoryId:searchParams.categoryId,
        name:{
          search:searchParams.name
        }

      },
      {
        userId,
        categoryId:searchParams.categoryId,
        name:{
          search:searchParams.name
        }
      }
      
     ]
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const  category_data=await  prismadb.category.findMany()
// console.log(category_data)
  return ( <>
    <div className="h-full p-4 space-y-2">
      <SearchBar />
      <Category data={category_data}/>
      <CompanionList companiondData={companion_data}/>

    </div>
  </> );
}
 
export default RootPage;