import React from "react";
import { Skeleton } from "antd";

interface Props {
    title: string;
}

export const ListingsSkeleton = ({ title }: Props) => {
    return (
        <div>
            <h2>{title}</h2>
            <Skeleton />
        </div>
    );
};