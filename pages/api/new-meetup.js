import { MongoClient } from "mongodb";

 const  handler = async (req, res) => {
   if(req.method === 'POST'){
       const data = req.body ;

      

       const client = await MongoClient.connect('mongodb+srv://Mniteesh:DaXs6cR4Ne9tkLk9@cluster0.3ds1l.mongodb.net/meetUp?retryWrites=true&w=majority') ;
       const db = client.db() ;

       const meetupsCollection = db.collection('meetups') ;

       const result = await meetupsCollection.insertOne(data) ;

       console.log(result) ;

       client.close() ;

       res.status(201).json({message : 'Meetup inserted'}) ;

    }
}

export default handler
