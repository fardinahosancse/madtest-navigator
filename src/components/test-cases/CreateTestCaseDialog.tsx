import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface CreateTestCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateTestCaseDialog = ({ open, onOpenChange }: CreateTestCaseDialogProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [type, setType] = useState("functional");
  const [precondition, setPrecondition] = useState("");
  const [steps, setSteps] = useState("");
  const [expectedResults, setExpectedResults] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle test case creation here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Test Case</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter test case title"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="functional">Functional</SelectItem>
                  <SelectItem value="non-functional">Non-functional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="precondition">Precondition</Label>
            <Textarea
              id="precondition"
              value={precondition}
              onChange={(e) => setPrecondition(e.target.value)}
              placeholder="Enter test case preconditions"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="steps">Steps</Label>
            <Textarea
              id="steps"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              placeholder="Enter test steps"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedResults">Expected Results</Label>
            <Textarea
              id="expectedResults"
              value={expectedResults}
              onChange={(e) => setExpectedResults(e.target.value)}
              placeholder="Enter expected results"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Test Case</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTestCaseDialog;