import React from "react";
import { Divider, Skeleton } from "antd";

interface Props {
    title: string;
}

export const ListingsSkeleton = ({ title }: Props) => {
    return (
        <div>
            <h2>{title}</h2>
            <Skeleton active paragraph={{ rows: 1 }} />
            <Divider />
            <Skeleton active paragraph={{ rows: 1 }} />
            <Divider />
            <Skeleton active paragraph={{ rows: 1 }} />
        </div>
    );
};