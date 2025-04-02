import { IssueStatusBadge, Link } from "@/app/components";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden: md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden: md:table-cell" },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const status = await searchParams;

  const validateStatus = Object.values(Status);
  const checkStatus = validateStatus.includes(status.status)
    ? status.status
    : undefined;

  const orderBy = columns.map((column) => column.value).includes(status.orderBy)
    ? { [status.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: checkStatus },
    orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{
                    query: { ...status, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === status.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </Table.Cell>
              <Table.Cell className="hidden: sm:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden: sm:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic"; // Ensure the page is dynamic

export default IssuesPage;
