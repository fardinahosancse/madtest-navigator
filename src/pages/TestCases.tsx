import Layout from "@/components/layout/Layout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateTestCaseDialog from "@/components/test-cases/CreateTestCaseDialog";

interface TestCase {
  id: string;
  title: string;
  status: "draft" | "active" | "deprecated";
  priority: "low" | "medium" | "high";
  lastUpdated: string;
}

const TestCases = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Mock data - replace with actual data fetching
  const testCases: TestCase[] = [
    {
      id: "1",
      title: "Login Authentication Test",
      status: "active",
      priority: "high",
      lastUpdated: "2024-02-20",
    },
    {
      id: "2",
      title: "User Registration Flow",
      status: "draft",
      priority: "medium",
      lastUpdated: "2024-02-19",
    },
  ];

  const getStatusColor = (status: TestCase["status"]) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "draft":
        return "bg-warning text-warning-foreground";
      case "deprecated":
        return "bg-error text-error-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getPriorityColor = (priority: TestCase["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-error/10 text-error border-error";
      case "medium":
        return "bg-warning/10 text-warning border-warning";
      case "low":
        return "bg-success/10 text-success border-success";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Test Cases</h1>
          <p className="text-gray-500 mt-2">Manage and organize your test cases</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Test Case
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testCases.map((testCase) => (
              <TableRow key={testCase.id}>
                <TableCell className="font-medium">{testCase.title}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(testCase.status)}>
                    {testCase.status.charAt(0).toUpperCase() + testCase.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPriorityColor(testCase.priority)}>
                    {testCase.priority.charAt(0).toUpperCase() + testCase.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{testCase.lastUpdated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateTestCaseDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </Layout>
  );
};

export default TestCases;