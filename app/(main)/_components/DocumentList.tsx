"use client";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

type DocumentListProps = {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
};

function DocumentList({ parentDocumentId, level = 0 }: DocumentListProps) {
  const param = useParams();
  const router = useRouter();
  const [expand, setExpand] = useState<Record<string, boolean>>({});
  const onExpand = (documentId: string) => {
    setExpand((preExpanded) => ({
      ...preExpanded,
      [documentId]: !preExpanded[documentId],
    }));
  };
  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });
  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  if (document === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }
  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 12}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expand && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents?.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            label={document.title}
            level={level}
            icon={FileIcon}
            documentIcon={document.icon}
            active={document._id === param.documentId}
            expanded={expand[document._id]}
            onExpand={() => onExpand(document._id)}
            onClick={() => onRedirect(document._id)}
          />
          {expand[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
}

export default DocumentList;
