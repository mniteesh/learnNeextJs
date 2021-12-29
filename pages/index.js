import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
        <Head>
            <title>React Meetups</title>
            <meta name="description" content="Welcome to lucknow beautiful sites" />
        </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return{
//         props:{
//             meetups : DUMMY_MEETUPS,
//         }
//     }
// }

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://Mniteesh:DaXs6cR4Ne9tkLk9@cluster0.3ds1l.mongodb.net/meetUp?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
