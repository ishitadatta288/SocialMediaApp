import type { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";



type SearchReultsProps = {
    isSearchFetching: boolean;
    searchedPosts:{documents: Models.Document[]} ;
}

const SearchReults = ({ isSearchFetching, searchedPosts }: SearchReultsProps) => {
    if (isSearchFetching) return <Loader />

    if (searchedPosts && searchedPosts.documents.length > 0) {
        return (
            <GridPostList posts={searchedPosts.documents} />
        )
    }

    return(
        <p className=" text-gray-600 mt-4 text-center w-full">No Results Found</p>
    )
}

export default SearchReults