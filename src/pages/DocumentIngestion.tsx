import { useState } from 'react';
import { motion } from 'framer-motion';
import { WorkflowSteps } from '@/components/ingestion/WorkflowSteps';
import { DetectionStep } from '@/components/ingestion/DetectionStep';
import { PolicyAdvisorStep } from '@/components/ingestion/PolicyAdvisorStep';
import { MaskingStep } from '@/components/ingestion/MaskingStep';
import { QAStep } from '@/components/ingestion/QAStep';

const workflowSteps = [
  { id: 'detection', name: 'Detection', status: 'completed' as const },
  { id: 'policy', name: 'Policy Advisor', status: 'active' as const },
  { id: 'masking', name: 'Masking', status: 'pending' as const },
  { id: 'qa', name: 'Quality Assurance', status: 'pending' as const }
];

export default function DocumentIngestion() {
  const [currentStep, setCurrentStep] = useState('detection');

  const renderStepContent = () => {
    switch (currentStep) {
      case 'detection':
        return <DetectionStep />;
      case 'policy':
        return <PolicyAdvisorStep />;
      case 'masking':
        return <MaskingStep />;
      case 'qa':
        return <QAStep />;
      default:
        return <DetectionStep />;
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-display text-foreground mb-2">
          Document Ingestion
        </h1>
        <p className="text-muted-foreground">
          Process documents through the complete privacy and compliance workflow
        </p>
      </motion.div>

      {/* Workflow Steps Navigation */}
      <WorkflowSteps 
        steps={workflowSteps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStepContent()}
      </motion.div>
    </motion.div>
  );
}