import React from "react";
import { Divider, Skeleton } from "antd";
import "./styles/ListingsSkeleton.css";

interface Props {
    title: string;
}

export const ListingsSkeleton = ({ title }: Props) => {
    return (
        <div className="listing-skeleton">
            <h2>{title}</h2>
            <Skeleton active paragraph={{ rows: 1 }} />
            <Divider />
            <Skeleton active paragraph={{ rows: 1 }} />
            <Divider />
            <Skeleton active paragraph={{ rows: 1 }} />
        </div>
    );
};