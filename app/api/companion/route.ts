import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


export  async function POST(req:Request){
    try{
        console.log('in companion create')
        const  user=await currentUser()
        const {src,name,description,instructions,seed,categoryId}=await req.json()
        // console.log(src,name,description,instructions,seed,categoryId)
        if(!user  ||!user?.id ||!user?.firstName){
            return new NextResponse('unAuthorized',{status:401})
        }
        if(!src || !name || !description || !instructions || !seed || !categoryId){
            return new NextResponse('unAuthorized',{status:400})
        }

        const companion=await prismadb.companion.create({
            data:{
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed,
              }
        })
        return NextResponse.json(companion);

    }
    catch(error )
    {
            return new NextResponse('internal server error',{status:500})
    }
}