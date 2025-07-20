import Loader from "@/components/shared/Loader";
import { useToast } from "@/hooks/use-toast";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { UserCard } from 'react-ui-cards';



const AllUsers = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });

    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard
                  href={`/profile/${creator.$id}`}
                  header={creator.bio || 'No bio available'}
                  avatar={creator.imageUrl || '/default-avatar.png'}
                  name={creator.name || 'Unknown User'}
                  positionName={creator.role || 'Member'}
                  stats={[
                    { name: 'Posts', value: creator.stats?.posts ?? 0 },
                    { name: 'Followers', value: creator.stats?.followers ?? 0 },
                  ]}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;