import { Table } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import IssueActions from "./IssueActions";

const LoadingIssuePage = () => {
  const issues = [1, 2, 3, 4, 5]; // Dummy issues data

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden: md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden: md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Skeleton height={20} /> {/* Placeholder for issue title */}
              </Table.Cell>
              <Table.Cell className="hidden: md:table-cell">
                <Skeleton height={20} /> {/* Placeholder for status */}
              </Table.Cell>
              <Table.Cell className="hidden: md:table-cell">
                <Skeleton height={20} /> {/* Placeholder for created date */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuePage;
