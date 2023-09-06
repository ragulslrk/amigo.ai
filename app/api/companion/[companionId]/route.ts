import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
interface companionPatchPropType{
    params:{
        companionId:string
    }
}

export  async function PATCH(req:Request,{params}:companionPatchPropType){
    try{
        const  user=await currentUser()
        const {src,name,description,instructions,seed,categoryId}=await req.json()
        const companionId=params.companionId
        
        if(!companionId)return new NextResponse('unAuthorized',{status:400})

        if(!user  ||!user?.id ||!user?.firstName){
            return new NextResponse('unAuthorized',{status:401})
        }
        if(!src || !name || !description || !instructions || !seed || !categoryId){
            return new NextResponse('unAuthorized',{status:400})
        }

        const companion=await prismadb.companion.update({
            where:{
                id:companionId,
                userId:user.id
            },
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