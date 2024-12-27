import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronDown, MoreHorizontal, Plus, Search } from "lucide-react";
import CreateTestCaseDialog from "@/components/test-cases/CreateTestCaseDialog";

interface TestCase {
  id: string;
  title: string;
  status: "passed" | "failed" | "pending";
  folder?: string;
}

const TestCases = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);

  // Mock data - replace with actual data fetching
  const testCases: TestCase[] = [
    { id: "TC-13", title: "App-Preview Images", status: "passed", folder: "functional" },
    { id: "TC-14", title: "Scroll to Top", status: "passed", folder: "functional" },
    { id: "TC-36", title: "Release Notes", status: "passed", folder: "functional" },
    { id: "TC-12", title: "Content Text", status: "passed", folder: "functional" },
  ];

  return (
    <Layout>
      <div className="flex h-[calc(100vh-2rem)] gap-4">
        {/* Folder Panel */}
        <div className="w-64 bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" className="gap-2">
              New <ChevronDown size={16} />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={16} />
            </Button>
          </div>
          <Input placeholder="Filter folders" className="mb-4" />
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-secondary rounded-lg">
              <span className="font-medium">All test cases</span>
              <Badge variant="secondary">35</Badge>
            </div>
            <div className="pl-4">
              <div className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded-lg cursor-pointer">
                <span>functional</span>
                <Badge variant="secondary">27</Badge>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded-lg cursor-pointer">
                <span>non-functional</span>
                <Badge variant="secondary">8</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Test Cases List */}
        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">All test cases</h1>
            <div className="flex gap-2">
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create
              </Button>
              <Button variant="outline">Quick create</Button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Filter by keyword"
                className="w-full"
                prefix={<Search className="h-4 w-4 text-gray-400" />}
              />
            </div>
          </div>

          <div className="border rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">TITLE</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">LAST RESULT</th>
                  <th className="w-8"></th>
                </tr>
              </thead>
              <tbody>
                {testCases.map((testCase) => (
                  <tr
                    key={testCase.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedTestCase(testCase)}
                  >
                    <td className="px-4 py-3 text-sm">{testCase.id}</td>
                    <td className="px-4 py-3 text-sm">{testCase.title}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span className="text-sm">Passed</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Panel */}
        {selectedTestCase && (
          <div className="w-96 bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-gray-500">{selectedTestCase.id}</div>
                <h2 className="text-xl font-semibold">{selectedTestCase.title}</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedTestCase(null)}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-500">OWNER</label>
                <div className="mt-1 text-sm">John Smith</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">PRIORITY</label>
                <div className="mt-1 text-sm">Medium</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">TYPE</label>
                <div className="mt-1 text-sm">Functional</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">PRECONDITION</label>
                <div className="mt-1 text-sm">
                  Navigated to https://www.testiny.io/
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">STEPS</label>
                <div className="mt-1 text-sm">
                  Scroll through page and look at Images showing the App.
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">EXPECTED RESULTS</label>
                <div className="mt-1 text-sm space-y-2">
                  <p>• Shown sample data is representative (not too much and not too less data)</p>
                  <p>• Shown sample data does not contain offensive words</p>
                  <p>• Shown sample data makes sense (no blindtext, strange dates, inconsistent states)</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <CreateTestCaseDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </Layout>
  );
};

export default TestCases;