import { motion } from 'framer-motion';
import { Check, Circle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending';
}

interface WorkflowStepsProps {
  steps: Step[];
  currentStep: string;
  onStepClick: (stepId: string) => void;
}

export function WorkflowSteps({ steps, currentStep, onStepClick }: WorkflowStepsProps) {
  return (
    <div className="neumorphic-card p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Document Processing Workflow
      </h2>
      
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <motion.button
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200',
                step.status === 'completed' && 'step-completed cursor-pointer',
                step.status === 'active' && 'step-active',
                step.status === 'pending' && 'step-pending',
                step.id === currentStep && 'ring-2 ring-primary/50'
              )}
              onClick={() => step.status !== 'pending' && onStepClick(step.id)}
              whileHover={step.status !== 'pending' ? { scale: 1.02 } : {}}
              whileTap={step.status !== 'pending' ? { scale: 0.98 } : {}}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                {step.status === 'completed' ? (
                  <Check size={14} />
                ) : step.status === 'active' ? (
                  <Circle size={14} className="animate-pulse" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              <span className="text-sm font-medium">{step.name}</span>
            </motion.button>
            
            {index < steps.length - 1 && (
              <ChevronRight size={16} className="mx-3 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}