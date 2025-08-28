import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  FlaskConical,
  BarChart3,
  Settings
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Document Ingestion',
    href: '/ingestion',
    icon: FileText
  },
  {
    title: 'Sandbox',
    href: '/sandbox',
    icon: FlaskConical
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: BarChart3
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings
  }
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = sidebarItems.some((item) => isActive(item.href));

  return (
    <Sidebar
      className={cn(
        "neumorphic-card border-r transition-all duration-300",
        open ? "w-64" : "w-14"
      )}
      collapsible="icon"
    >
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <motion.div
            className="flex items-center space-x-2"
            initial={false}
            animate={{ 
              justifyContent: open ? 'flex-start' : 'center'
            }}
          >
            <div className="w-8 h-8 neumorphic-raised rounded-xl flex items-center justify-center bg-primary">
              <span className="text-primary-foreground font-bold text-sm">I</span>
            </div>
            {open && (
              <motion.span
                className="text-display text-lg text-foreground"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Infowise
              </motion.span>
            )}
          </motion.div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={cn(!open && "sr-only")}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const itemIsActive = isActive(item.href);
                
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild
                      className={cn(
                        "neumorphic-button text-sidebar-foreground hover:text-sidebar-primary",
                        itemIsActive && "neumorphic-pressed bg-sidebar-primary text-sidebar-primary-foreground"
                      )}
                    >
                      <NavLink to={item.href} end>
                        <item.icon className="h-4 w-4" />
                        {open && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}