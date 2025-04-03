import Pagination from "@/app/components/Pagination";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue; page: string }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const searchParameters = await searchParams;

  const validateStatus = Object.values(Status);
  const checkStatus = validateStatus.includes(searchParameters.status)
    ? searchParameters.status
    : undefined;

  const where = checkStatus ? { status: checkStatus } : {};

  const orderBy = columnNames.includes(searchParameters.orderBy)
    ? { [searchParameters.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParameters.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParameters} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic"; // Ensure the page is dynamic

export const metadata: Metadata = {
  title: "Task Pulse - Task Lists",
  description: "View all Tasks.",
};

export default IssuesPage;
