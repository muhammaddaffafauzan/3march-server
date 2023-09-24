import Property from "../models/PropertyModel.js";
import path from "path";
import fs from "fs"

export const getPropertis = async(req, res)=>{
    try {
        let response;
        if(req.role === "admin", "user"){
            response = await Property.findAll();
        }else{
            res.status(403).json({msg: "Anda sebagai anonim tidak dapat melihat data tersebut"});
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
    }
}

export const getPropertisById = async(req, res)=>{
    try {
        let response;
        if(req.role === "admin", "user"){
            response = await Property.findOne({
                where:{
                    uuid : req.params.id
                }
            });
        }else{
            res.status(403).json({msg: "Anda sebagai anonim tidak dapat melihat data tersebut"});
        }
        res.json(response);
    } catch (error) {
        console.log(error)
    }
}

export const savePropertis = async(req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', 'jpeg'];

    if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "Invalid Image"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5MB"});
    
 
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
    });
    try {
        let response;
        if(req.role === "admin"){
           response = await Property.create({
            name: name, image: fileName, url: url
        });
        }else{
            res.status(403).json({msg: "Anda sebagai user tidak dapat menambah data"});
        }
       
        res.status(201).json({msg: "Property Created Successfully"});
    } catch (error) {
        console.log(error)
    }
}

// export const updatePropertis = async(req, res)=>{
//     const property = await Property.findOne({
//         where:{
//             id : req.params.id
//         }
//     });
//     if(!property) return res.status(404).json({msg: "No data Found"});
//     let fileName = "";
//     if(req.files === null){
//         fileName = property.image;
//     }else{
//         const file = req.files.file;
//         const fileSize = file.data.length;
//         const ext = path.extname(file.name);
//         const fileName = file.md5 + ext;
//         const allowedType = ['.png', '.jpg', 'jpeg'];

//         if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "Invalid Image"});
//         if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5MB"});
        
//         const filepath = `./public/images/${property.image}`;
//         fs.unlinkSync(filepath);    

//         file.mv(`./public/images/${fileName}`, (err)=>{
//             if(err) return res.status(500).json({msg: err.message});
//         });
//     }
//     const name = req.body.title;
//     const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
//     try {
//         await Property.update({name: name, image: fileName, url: url},{
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "Product Updated successfully"});
//     } catch (error) {
//         console.log(error.message)
//     }
// }

export const deletePropertis = async(req, res)=>{
        const property = await Property.findOne({
            where:{
                uuid : req.params.id
            }
        });
        if(!property) return res.status(404).json({msg: "No data Found"});
        try {
           
            await Property.destroy({
                where:{
                    id : property.id
                }
            });
            res.status(200).json({msg: "Property Deleted Successfully"})
        } catch (error) {
            console.log(error)
        }
   
}