import bpscData from "@/app/data/bpsc.json";
import ProtectedAnswerCopyViewer from "../../answer-copies/[documentId]/ProtectedAnswerCopyViewer";

export const dynamic = "force-dynamic";

const titlesByKey = new Map(
  [
    ...bpscData.notes,
    ...bpscData.copies.actual,
    ...bpscData.copies.practice,
  ].map((resource) => [resource.objectKey, resource.title]),
);

export default async function BPSCDocumentPage({ params }) {
  const { documentId } = await params;
  const key = Buffer.from(documentId, "base64url").toString("utf8");
  const title =
    titlesByKey.get(key) ||
    key.split("/").pop()?.replace(/\.pdf$/i, "").replace(/\s+unchecked$/i, "") ||
    "BPSC PDF";
  return <ProtectedAnswerCopyViewer documentId={documentId} title={title} />;
}
