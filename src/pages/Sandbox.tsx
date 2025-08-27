import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Play, MessageSquare, Database, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockSyntheticData = [
  { field: 'Name', original: 'John Doe', synthetic: 'Alex Johnson' },
  { field: 'Email', original: 'john.doe@email.com', synthetic: 'alex.johnson@email.com' },
  { field: 'Phone', original: '(555) 123-4567', synthetic: '(555) 987-6543' },
  { field: 'SSN', original: '***-**-****', synthetic: '***-**-****' },
];

const mockInsightData = [
  { category: 'Demographics', value: 45, trend: 12 },
  { category: 'Geographic', value: 32, trend: -5 },
  { category: 'Behavioral', value: 67, trend: 23 },
  { category: 'Transactional', value: 89, trend: 8 },
];

export default function Sandbox() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { type: 'assistant', message: 'Hello! I can help you query your cleaned dataset. What would you like to know?' }
  ]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [
      ...prev,
      { type: 'user', message: chatInput },
      { type: 'assistant', message: 'Based on your cleaned dataset, here are the insights...' }
    ]);
    setChatInput('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-display text-foreground mb-2">
          Sandbox
        </h1>
        <p className="text-muted-foreground">
          Explore insights, generate synthetic data, and query your cleaned datasets
        </p>
      </motion.div>

      {/* Sandbox Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="neumorphic-card grid grid-cols-4 w-full">
            <TabsTrigger value="insights" className="neumorphic-button">
              <BarChart3 size={16} className="mr-2" />
              Insight Extractor
            </TabsTrigger>
            <TabsTrigger value="replicator" className="neumorphic-button">
              <Download size={16} className="mr-2" />
              Data Replicator
            </TabsTrigger>
            <TabsTrigger value="synthetic" className="neumorphic-button">
              <Database size={16} className="mr-2" />
              Synthetic Generator
            </TabsTrigger>
            <TabsTrigger value="prompt" className="neumorphic-button">
              <MessageSquare size={16} className="mr-2" />
              Prompt Engineer
            </TabsTrigger>
          </TabsList>

          {/* Insight Extractor */}
          <TabsContent value="insights" className="space-y-6">
            <div className="neumorphic-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Data Insights & Analytics
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="chart-container">
                  <h4 className="font-medium text-foreground mb-4">Insight Categories</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={mockInsightData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="category" 
                        fontSize={12}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis 
                        fontSize={12}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover))',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: 'var(--shadow-light), var(--shadow-dark)'
                        }}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Key Insights</h4>
                  {mockInsightData.map((item, index) => (
                    <motion.div
                      key={item.category}
                      className="neumorphic-flat p-4 rounded-xl"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{item.category}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-foreground">{item.value}%</span>
                          <span className={`text-sm ${item.trend > 0 ? 'text-success' : 'text-danger'}`}>
                            {item.trend > 0 ? '+' : ''}{item.trend}%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Data Replicator */}
          <TabsContent value="replicator" className="space-y-6">
            <div className="neumorphic-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Clean Dataset Downloads
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Customer Data (Masked)', size: '2.3 MB', records: '1,247', format: 'CSV' },
                  { name: 'Transaction Logs (Clean)', size: '5.7 MB', records: '8,934', format: 'JSON' },
                  { name: 'User Profiles (Anonymized)', size: '1.1 MB', records: '892', format: 'Excel' },
                  { name: 'Financial Records (Redacted)', size: '3.4 MB', records: '2,156', format: 'CSV' },
                  { name: 'Medical Data (De-identified)', size: '4.2 MB', records: '1,567', format: 'JSON' },
                  { name: 'Survey Responses (Cleaned)', size: '890 KB', records: '634', format: 'CSV' }
                ].map((dataset, index) => (
                  <motion.div
                    key={dataset.name}
                    className="neumorphic-card p-4 hover:neumorphic-raised transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <h4 className="font-medium text-foreground mb-2">{dataset.name}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground mb-4">
                      <div>Size: {dataset.size}</div>
                      <div>Records: {dataset.records}</div>
                      <div>Format: {dataset.format}</div>
                    </div>
                    <Button size="sm" className="neumorphic-button w-full">
                      <Download size={14} className="mr-2" />
                      Download
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Synthetic Data Generator */}
          <TabsContent value="synthetic" className="space-y-6">
            <div className="neumorphic-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Synthetic Data Preview
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Field</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Original Pattern</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Synthetic Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {mockSyntheticData.map((row, index) => (
                      <motion.tr
                        key={row.field}
                        className="hover:bg-muted/30 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                      >
                        <td className="px-4 py-3 font-medium text-foreground">{row.field}</td>
                        <td className="px-4 py-3">
                          <code className="neumorphic-pressed px-2 py-1 rounded text-sm bg-muted">
                            {row.original}
                          </code>
                        </td>
                        <td className="px-4 py-3">
                          <code className="neumorphic-pressed px-2 py-1 rounded text-sm bg-muted">
                            {row.synthetic}
                          </code>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-muted-foreground">
                  Generate realistic synthetic data while preserving statistical properties
                </div>
                <Button className="neumorphic-button">
                  <Play size={16} className="mr-2" />
                  Generate Full Dataset
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Prompt Engineer */}
          <TabsContent value="prompt" className="space-y-6">
            <div className="neumorphic-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Natural Language Query Interface
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chat Interface */}
                <div className="space-y-4">
                  <div className="neumorphic-pressed h-80 p-4 rounded-xl overflow-y-auto space-y-3">
                    {chatMessages.map((msg, index) => (
                      <motion.div
                        key={index}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`max-w-[80%] p-3 rounded-xl ${
                          msg.type === 'user' 
                            ? 'neumorphic-raised bg-primary text-primary-foreground' 
                            : 'neumorphic-flat bg-surface'
                        }`}>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask questions about your data..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="neumorphic-input flex-1"
                    />
                    <Button onClick={handleSendMessage} className="neumorphic-button">
                      <MessageSquare size={16} />
                    </Button>
                  </div>
                </div>

                {/* Query Examples */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Example Queries</h4>
                  {[
                    "How many customers are in the high-risk category?",
                    "Show me the distribution of age groups in our dataset",
                    "What's the most common PII type detected?",
                    "Generate a summary of compliance risks by region",
                    "Compare masking effectiveness across different data types"
                  ].map((query, index) => (
                    <motion.button
                      key={index}
                      className="neumorphic-button w-full p-3 rounded-xl text-left text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => setChatInput(query)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {query}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}