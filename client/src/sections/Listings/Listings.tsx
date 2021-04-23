import React, { useState } from "react";
import { server } from "../../lib/api";
import { 
    ListingsData, 
    DeleteListingData, 
    DeleteListingVariables 
} from "./types";

const LISTINGS = `
    query Listings {
        listings {
            id
            title
            image
            address
            price
            numOfGuests
            numOfBeds
            rating
        }
    }
`;

const DELETE_LISTING = `
    mutation DeleteListing($id: ID!) {
        deleteListing(id: $id) {
            id
        }
    }
`;

interface Props {
    title: string;
}

export const Listings = ({ title }: Props) => {
    const [listings, setListings] = useState<
        Listing[] | null
    >(null);

    const fetchListings = async () => {
        const data = await server.fetch<ListingsData>({ 
            query: LISTINGS 
        });
        setListings(data.listings);
    };

    const deleteListing = async (id: string) => {
        await server.fetch<
        DeleteListingData,
        DeleteListingVariables
        >({ 
            query: DELETE_LISTING,
            variables: {
                id
            }
        });
        fetchListings();
    };

    const listingsList = listings ? (
        <ul>
            {listings.map(listing => {
                return (
                    <li key={listing.id}>
                        {listing.title}
                        <button 
                            onClick={() => deleteListing(listing.id)}
                        >
                            Delete
                        </button>
                    </li>
                );
            })}
        </ul>
    ) : null;

    return (
    <div>
        <h2>{title}</h2>
        {listingsList}
        <button onClick={fetchListings}>
            Query Listings!
        </button>
        <button onClick={deleteListing}>
            Delete a listing!
        </button>
    </div>
    );
};
