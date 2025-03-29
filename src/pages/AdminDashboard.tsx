
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Eye, FileText, MessageSquare, TrendingUp, User, FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dashboard stat card
const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend,
  color = 'bg-primary/10' 
}: { 
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  trend: number;
  color?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`${color} p-2 rounded-full`}>
        <Icon className="h-4 w-4 text-primary" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center pt-1">
        {trend > 0 ? (
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <TrendingUp className="h-4 w-4 text-red-500 mr-1 transform rotate-180" />
        )}
        <p className={`text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? '+' : ''}{trend}% from last month
        </p>
      </div>
      <p className="text-xs text-muted-foreground pt-1">{description}</p>
    </CardContent>
  </Card>
);

// Recent project row
const RecentProject = ({ 
  title, 
  date, 
  views, 
  status 
}: { 
  title: string;
  date: string;
  views: number;
  status: 'published' | 'draft';
}) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center mr-3">
        <FileText className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">Updated on {date}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center text-xs text-muted-foreground">
        <Eye className="h-3.5 w-3.5 mr-1" />
        {views}
      </div>
      <div className={`text-xs px-2 py-1 rounded-full ${
        status === 'published' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-amber-100 text-amber-700'
      }`}>
        {status === 'published' ? 'Published' : 'Draft'}
      </div>
    </div>
  </div>
);

// Recent message row
const RecentMessage = ({ 
  name, 
  email, 
  date, 
  preview 
}: { 
  name: string;
  email: string;
  date: string;
  preview: string;
}) => (
  <div className="flex items-start py-3">
    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
      <User className="h-4 w-4 text-primary" />
    </div>
    <div>
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-medium">{name}</h4>
        <span className="text-xs text-muted-foreground">({email})</span>
      </div>
      <p className="text-xs text-muted-foreground mb-1">{date}</p>
      <p className="text-sm line-clamp-2">{preview}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Welcome back, Admin</h2>
        <p className="text-muted-foreground">Here's what's happening with your portfolio today.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Projects" 
          value="12" 
          icon={FileText} 
          description="Total projects in your portfolio" 
          trend={5} 
        />
        <StatCard 
          title="Total Views" 
          value="3,456" 
          icon={Eye}
          description="Total page views this month" 
          trend={12} 
          color="bg-blue-100" 
        />
        <StatCard 
          title="Messages" 
          value="27" 
          icon={MessageSquare}
          description="Unread messages in your inbox" 
          trend={-3} 
          color="bg-violet-100" 
        />
        <StatCard 
          title="Conversion Rate" 
          value="3.2%" 
          icon={BarChart2}
          description="From views to contacts" 
          trend={0.8} 
          color="bg-green-100" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your recently updated projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <RecentProject 
                  title="E-Commerce Platform" 
                  date="May 15, 2023" 
                  views={342} 
                  status="published" 
                />
                <div className="my-2 border-t border-border"></div>
                <RecentProject 
                  title="Project Management Tool" 
                  date="April 22, 2023" 
                  views={189} 
                  status="published" 
                />
                <div className="my-2 border-t border-border"></div>
                <RecentProject 
                  title="AI Content Generator" 
                  date="April 10, 2023" 
                  views={106} 
                  status="published" 
                />
                <div className="my-2 border-t border-border"></div>
                <RecentProject 
                  title="Fitness Tracking App" 
                  date="March 28, 2023" 
                  views={221} 
                  status="draft" 
                />
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" asChild>
                  <a href="/admin/projects">View all projects</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Latest messages from visitors</CardDescription>
            </div>
            <Button variant="outline" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <RecentMessage 
                name="John Smith" 
                email="john@example.com" 
                date="Today, 10:30 AM" 
                preview="Hi, I'm interested in collaborating on a new project. Would you be available for a quick chat this week?" 
              />
              <div className="border-t border-border"></div>
              <RecentMessage 
                name="Sarah Johnson" 
                email="sarah@company.com" 
                date="Yesterday, 3:45 PM" 
                preview="Your portfolio looks amazing! I'm looking for a developer for our startup. Can we discuss the details?" 
              />
              <div className="border-t border-border"></div>
              <RecentMessage 
                name="Michael Davis" 
                email="michael@agency.com" 
                date="May 16, 2023" 
                preview="We have an opening for a senior developer position. Based on your portfolio, I think you'd be a great fit." 
              />
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="w-full">
                View all messages
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button className="h-auto py-4 flex flex-col items-center justify-center space-y-2">
                <FileUp className="h-6 w-6 mb-2" />
                <span>Add New Project</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center space-y-2">
                <MessageSquare className="h-6 w-6 mb-2" />
                <span>Check Messages</span>
              </Button>
              <Button variant="secondary" className="h-auto py-4 flex flex-col items-center justify-center space-y-2">
                <User className="h-6 w-6 mb-2" />
                <span>Update Profile</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
