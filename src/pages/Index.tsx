import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import { FileText, Play, CheckCircle, AlertCircle } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome to MadTest</h1>
        <p className="text-gray-500 mt-2">Here's an overview of your testing progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Test Cases"
          value="156"
          icon={FileText}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Test Runs"
          value="8"
          icon={Play}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Passed Tests"
          value="142"
          icon={CheckCircle}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Failed Tests"
          value="14"
          icon={AlertCircle}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity items would go here */}
            <p className="text-gray-500">No recent activity</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Create New Test Case
            </button>
            <button className="w-full bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors">
              Start Test Run
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;