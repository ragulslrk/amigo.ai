 import SearchBar from "@/components/searchBar";
 import prismadb from "@/lib/prismadb";
 import  Category from "@/components/category";

const RootPage = async() => {
  const  category_data=await  prismadb.category.findMany()
// console.log(category_data)
  return ( <>
    <div className="h-full p-4 space-y-2">
      <SearchBar />
      <Category data={category_data}/>
    
    </div>
  </> );
}
 
export default RootPage;