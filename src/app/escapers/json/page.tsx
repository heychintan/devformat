import ToolPage from "@/components/tools/ToolPage";
import { getToolMetadata } from "@/lib/tools/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { getToolById } from "@/lib/tools/registry";

const TOOL_ID = "json-escaper";

export const metadata = getToolMetadata(TOOL_ID);

export default function Page() {
  const tool = getToolById(TOOL_ID)!;
  return (
    <>
      <JsonLd tool={tool} />
      <ToolPage toolId={TOOL_ID} />
    </>
  );
}
