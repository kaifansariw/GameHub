import prisma from "../config/prisma.js";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async( req , res ) => {
    try{
        const { username , email , password , firstName , lastName } = req.body;

        //validate required fields
        if(!username || !email || !password){
            return res.status(400).json({
                message: "Username, email and password are required",
            });
        }
         
        //Check whether the user is already existed in db same with same username OR email.
         const existingUser = await prisma.user.findFirst({
            where: {
                OR:[
                    { username },
                    { email }
                ],
            },
         });
         
         if(existingUser){
            return res.status(400).json({
                message: "Username or email already exists",
            });
         }

         //Hashed Password before storing in db  //10 means salt round it should performed before stroing it into db
         const hashedPassword = await bycrpt.hash(password , 10 );
         
         //create User and profile
         const user = await prisma.user.create({
           
            data: { 
                username,
                email,
                password: hashedPassword ,
                firstName,
                lastName,
                
                profile:{
                    create: {},
                },
            },
            include: {
                profile: true,
            },
         });
          
         return res.status(201).json({
            message: "User is registered successfully",
            user:{
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
         });

    } catch(error){
        console.error("Registration error" , error);

          return res.status(500).json({
            message:"Internal server error",
        });
    }
}

export const login = async( req,res ) => {
   
 try{
    const { username , password } = req.body;

    //Validate required fields
    if(!username || !password){
        return res.status(500).json({
            message: 'Username and password required'
        });
    }

    //find User
     const user = await prisma.user.findUnique({
        
        where:{
          username,
        },
         include: {
          profile: true
         },
     });
     
     if(!user){
        return res.status(400).json({
          message: "Invalid username and password"
        });
       }
       
       //checked password
       const isPasswordValid = await bycrpt.compare(
        password,
        user.password || ""
       );

       if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid username or password",
         });
       }

       //Create a jwt token
//          jwt.sign(
//            PAYLOAD,       ← Who is the user?
//            SECRET,        ← Can I trust this token?
//            OPTIONS        ← How long is it valid?
//           )

       const token = jwt.sign(
         {
            id: user.id,
            username: user.username,
         },
         process.env.JWT_SECRET,
         {
            expiresIn: "7d",
         }
       );

       return res.status(200).json({
         message: "Login successful",
         token,
         user: {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
         },
       });
      
      }catch(error){
        console.error("Login error" , error);

        return res.status(500).json({
           message: "Internal server error",
        });
    }
}